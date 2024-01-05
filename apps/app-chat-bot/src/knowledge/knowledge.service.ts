import { Injectable, UseFilters } from '@nestjs/common';
import { Knowledge, KnowledgeBase, KnowledgeFile } from '@prisma/mysql/client';
import {
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import * as http from 'http';
import * as https from 'https';
import * as textract from 'textract';
import * as parse from 'url-parse';
import { AllExceptionFilter } from '../allexceptionsfilter';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';

interface BaseProps {
  originalname: string;
  mimetype: string;
  textContent: string;
  knowledge_id: number;
}

interface FileProps {
  asset_id: string;
  public_id: string;
  secure_url: string;
  knowledgeBase_id: number;
}

@Injectable()
export class KnowledgeService {
  constructor(private readonly prismaService: MysqlPrismaService) { cloudinary.config() }

  @UseFilters(AllExceptionFilter)
  async create(createKnowledgeDto: CreateKnowledgeDto): Promise<Knowledge | null> {

    const knowledge = await this.prismaService.knowledge.create({
      data: { ...createKnowledgeDto.knowledge }
    });

    const objetoMemberOnKnowledge = {
      member_id: createKnowledgeDto.member_id,
      knowledge_id: knowledge.id
    }
    await this.prismaService.memberOnKnowledge.create({
      data: { ...objetoMemberOnKnowledge }
    })

    return knowledge
  }

  @UseFilters(AllExceptionFilter)
  async findAll(): Promise<Knowledge[]> {
    return await this.prismaService.knowledge.findMany();
  }

  @UseFilters(AllExceptionFilter)
  async findOne(id: number): Promise<Knowledge> {
    return await this.prismaService.knowledge.findUnique({ where: { id } });
  }

  @UseFilters(AllExceptionFilter)
  async update(id: number, updateKnowledgeDto:
    UpdateKnowledgeDto): Promise<Knowledge> {
    return await this.prismaService.knowledge.update({
      where: { id },
      data: {
        ...updateKnowledgeDto.knowledge,
      },
    });
  }

  @UseFilters(AllExceptionFilter)
  async remove(id: number): Promise<Knowledge> {
    return await this.prismaService.knowledge.delete({ where: { id } });
  }

  @UseFilters(AllExceptionFilter)
  async upload(
    member_id: number,
    knowledge_id: number,
    files: Express.Multer.File[]):
    Promise<(KnowledgeBase & { knowledgeFile: KnowledgeFile })[]> {

    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }
    const allObjetoData = await Promise.all(files.map(file => this.processFile(knowledge_id, file)));
    return Promise.all(allObjetoData.map(objetoData => this.createKnowledgeBaseAndFile(member_id, objetoData)));
  }

  private async processFile(knowledge_id: number, file: Express.Multer.File): Promise<{ base: BaseProps, file: FileProps }> {
    const { originalname, mimetype, buffer } = file;
    const objetoBase: BaseProps = {
      originalname,
      mimetype,
      textContent: '',
      knowledge_id
    };

    const responseFile = await this.uploadToCloudinary(originalname, buffer);
    const { asset_id, public_id, secure_url } = responseFile;
    const objetoFile: FileProps = {
      asset_id,
      public_id,
      secure_url,
      knowledgeBase_id: 0
    };

    const textContext = await this.getTextContext(secure_url, mimetype);
    objetoBase.textContent = textContext;
    return {
      base: objetoBase,
      file: objetoFile
    };
  }

  private uploadToCloudinary(originalname: string, buffer: Buffer): Promise<UploadApiResponse> {
    const optionsCloudinary: UploadApiOptions = {
      resource_type: 'raw',
      folder: 'ia-chatbot',
      public_id: originalname,
    };

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(optionsCloudinary, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });
  }

  private getTextContext(secure_url: string, mimetype: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.downloadFormData(secure_url, function (data) {
        if (data) {
          textract.fromBufferWithMime(mimetype, data,
            function (error, text) {
              if (error) {
                reject(error);
              } else {
                resolve(text);
              }
            })
        }
      });
    });
  }

  private downloadFormData(urlStr: string, callback: (data: Buffer) => void) {
    const parsedUrl = parse(urlStr);
    const lib = parsedUrl.protocol === 'https:' ? https : http;
    lib.get(urlStr, function (res) {
      const data = [];
      res
        .on('data', function (chunk) {
          data.push(chunk);
        })
        .on('end', function () {
          callback(Buffer.concat(data));
        });
    });
  }

  private async createKnowledgeBaseAndFile(member_id: number, objetoData: { base: BaseProps, file: FileProps }) {
    const knowledgeBase = await this.prismaService.knowledgeBase.create({
      data: { ...objetoData.base }
    });

    const knowledgeFile = await this.prismaService.knowledgeFile.create({
      data: {
        ...objetoData.file,
        knowledgeBase_id: knowledgeBase.id
      }
    });

    console.log(member_id);

    // Log item: "Document"
    const objetoMemberLog = {
      item: "Document",
      counter: 1,
      member_id
    };

    await this.prismaService.memberLog.create({
      data: { ...objetoMemberLog }
    })

    return {
      ...knowledgeBase,
      knowledgeFile
    };
  }
}