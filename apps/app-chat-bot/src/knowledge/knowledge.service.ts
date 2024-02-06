import { Injectable, UseFilters } from '@nestjs/common';
import {
  Knowledge,
  KnowledgeBase,
  KnowledgeFile
} from '@prisma/mysql/client';
import {
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary
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

export interface KnowledgeBaseId {
  id: number;
}

export interface KnowledgeRecordWithDocuments {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  knowledgeBase: KnowledgeBaseId[];
  documents: string;
}

@Injectable()
export class KnowledgeService {
  constructor(private readonly prismaService: MysqlPrismaService) { cloudinary.config() }

  @UseFilters(AllExceptionFilter)
  async findFilteredPages(
    query: string,
    currentPage: number
  ): Promise<KnowledgeRecordWithDocuments[] | null> {

    const ITEMS_PER_PAGE = 6;
    const skipItems = (currentPage - 1) * ITEMS_PER_PAGE;

    const response = await this.prismaService.knowledge.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: skipItems,
      include: {
        knowledgeBase: {
          select: {
            id: true,
          },
        },
      }
    });

    const knowledgeWithDocument: KnowledgeRecordWithDocuments[] = response.map(knowledge => ({
      ...knowledge,
      documents: knowledge.knowledgeBase.length.toString(),
    }));

    return knowledgeWithDocument;
  }

  @UseFilters(AllExceptionFilter)
  async findCountRecords(query: string): Promise<Number> {
    const response = await this.prismaService.knowledge.count({
      where: {
        name: {
          contains: query,
        },
      },
    });
    return response;
  }

  @UseFilters(AllExceptionFilter)
  async create(createKnowledgeDto: CreateKnowledgeDto):
    Promise<Knowledge | null> {

    const { member_id } = createKnowledgeDto;
    const result = await this.prismaService.knowledge.create({
      data: { ...createKnowledgeDto.knowledge }
    });

    const objectMemberOnKnowledge = {
      member_id,
      knowledge_id: result.id
    }
    await this.prismaService.memberOnKnowledge.create({
      data: { ...objectMemberOnKnowledge }
    })
    return result
  }

  // solo probar el chat para obtener la cadena de texto
  @UseFilters(AllExceptionFilter)
  async textContent(id: number): Promise<String> {
    const result = await this.prismaService.knowledgeBase.findFirst({
      where: { id },
      select: { textContent: true }
    });

    return result.textContent;
  }

  @UseFilters(AllExceptionFilter)
  async findAll(): Promise<Knowledge[]> {
    return await this.prismaService.knowledge.findMany({
      include: {
        knowledgeBase: {
          include: {
            knowledgeFile: true
          }
        }
      }
    });
  }

  @UseFilters(AllExceptionFilter)
  async findOne(id: number): Promise<Knowledge> {
    return await this.prismaService.knowledge.findFirst({
      where: { id },
      include: {
        knowledgeBase: {
          include: {
            knowledgeFile: true
          }
        }
      }
    });
  }

  @UseFilters(AllExceptionFilter)
  async update(id: number, updateKnowledgeDto: UpdateKnowledgeDto):
    Promise<Knowledge> {

    const response = await this.prismaService.knowledge.update({
      where: { id },
      data: {
        ...updateKnowledgeDto.knowledge,
        updatedAt: new Date(),
      },
    });
    return response
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

    const allObjectData = await Promise.all(
      files.map(file =>
        this.processFile(knowledge_id, file)));

    return Promise.all(
      allObjectData.map(objectData =>
        this.createKnowledgeBaseAndFile(member_id, objectData)));
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
    buffer: Buffer
  ): Promise<UploadApiResponse> {

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

  private getTextContext(
    secure_url: string,
    mimetype: string
  ): Promise<string> {
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

  @UseFilters(AllExceptionFilter)
  async remove(id: number): Promise<Knowledge> {
    const response = await this.prismaService.knowledge.findFirst({
      where: { id },
      select: {
        memberOnKnowledge: {
          select: { member_id: true }
        },
        _count: {
          select: { knowledgeBase: true },
        }
      }
    });

    const knowledge = await this.prismaService.knowledge.delete({
      where: { id }
    });

    if (knowledge) {
      if (response) { // Si tiene Documentos Registrados
        const { member_id } = response.memberOnKnowledge[0];
        const counter = -response._count.knowledgeBase;
        //  // Log item: "knowledge"
        const objetMemberLog = {
          item: "Document",
          counter,
          member_id
        };
        await this.prismaService.memberLog.create({
          data: { ...objetMemberLog }
        })
      }
    }
    return knowledge
  }

  @UseFilters(AllExceptionFilter)
  async removeBase(id: number): Promise<KnowledgeBase> {
    const response = await this.prismaService.knowledgeBase.delete({
      where: { id }
    })
    return response
  }
}