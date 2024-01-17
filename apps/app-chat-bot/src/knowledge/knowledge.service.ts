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

    const result = await this.prismaService.knowledge.create({
      data: { ...createKnowledgeDto.knowledge }
    });

    const objetoMemberOnKnowledge = {
      member_id: createKnowledgeDto.member_id,
      knowledge_id: result.id
    }
    await this.prismaService.memberOnKnowledge.create({
      data: { ...objetoMemberOnKnowledge }
    })

    return result
  }

  @UseFilters(AllExceptionFilter)
  async textContent(id: number): Promise<String> {
    const result = await this.prismaService.knowledge.findFirst({
      where: { id },
      select: {
        knowledgeBase: {
          select: { textContent: true }
        }
      }
    });

    const texto = result.knowledgeBase[0].textContent;
    return texto
  }

  @UseFilters(AllExceptionFilter)
  async findAll(): Promise<Knowledge[]> {
    const result = await this.prismaService.knowledge.findMany();
    return result
  }

  @UseFilters(AllExceptionFilter)
  async findOne(id: number): Promise<Knowledge> {
    const result = await this.prismaService.knowledge.findFirst({
      where: { id }
    });
    return result
  }

  @UseFilters(AllExceptionFilter)
  async update(id: number, updateKnowledgeDto:
    UpdateKnowledgeDto): Promise<Knowledge> {
    const result =
      await this.prismaService.knowledge.update({
        where: { id },
        data: {
          ...updateKnowledgeDto.knowledge,
        },
      });
    return result
  }

  @UseFilters(AllExceptionFilter)
  async remove(id: number): Promise<Knowledge> {
    const result = await this.prismaService.knowledge.delete({
      where: { id }
    });
    return result
  }

  // Subida de Archivos
  @UseFilters(AllExceptionFilter)
  async upload(
    member_id: number,
    knowledge_id: number,
    files: Express.Multer.File[]
  ): Promise<(KnowledgeBase & { knowledgeFile: KnowledgeFile })[]> {

    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }
    const allObjectData = await Promise.all(files.map(file => this.processFile(knowledge_id, file)));
    return Promise.all(allObjectData.map(objectData => this.createKnowledgeBaseAndFile(member_id, objectData)));
  }

  private async processFile(
    knowledge_id: number,
    file: Express.Multer.File):
    Promise<{
      base: BaseProps,
      file: FileProps
    }> {

    const { originalname, mimetype, buffer } = file;
    const objectBase: BaseProps = {
      originalname,
      mimetype,
      textContent: '',
      knowledge_id
    };

    const responseFile = await this.uploadToCloudinary(originalname, buffer);
    const { asset_id, public_id, secure_url } = responseFile;
    const objectFile: FileProps = {
      asset_id,
      public_id,
      secure_url,
      knowledgeBase_id: 0
    };

    const textContext = await this.getTextContext(secure_url, mimetype);
    objectBase.textContent = textContext;
    return {
      base: objectBase,
      file: objectFile
    };
  }

  private uploadToCloudinary(
    originalname: string,
    buffer: Buffer): Promise<UploadApiResponse> {
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

  private getTextContext(
    secure_url: string,
    mimetype: string): Promise<string> {
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

  private downloadFormData(
    urlStr: string,
    callback: (data: Buffer) => void) {
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

  private async createKnowledgeBaseAndFile(
    member_id: number,
    objectData: {
      base: BaseProps,
      file: FileProps
    }) {

    const knowledgeBase = await this.prismaService.knowledgeBase.create({
      data: { ...objectData.base }
    });

    const knowledgeFile = await this.prismaService.knowledgeFile.create({
      data: {
        ...objectData.file,
        knowledgeBase_id: knowledgeBase.id
      }
    });

    // Log item: "Document"
    const objectMemberLog = {
      item: "Document",
      counter: 1,
      member_id
    };

    await this.prismaService.memberLog.create({
      data: { ...objectMemberLog }
    })

    return {
      ...knowledgeBase,
      knowledgeFile
    };
  }
}