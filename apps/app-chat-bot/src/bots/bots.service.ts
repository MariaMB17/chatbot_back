import { AllExceptionFilter } from '@Appchatbot/allexceptionsfilter';
import { Injectable, UseFilters } from '@nestjs/common';
import { Bot } from '@prisma/mysql/client';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotsService {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  @UseFilters(AllExceptionFilter)
  async findOneUnique(name: string): Promise<Bot> {
    return await this.prismaService.bot.findUnique({
      where: { name }
    });
  }

  @UseFilters(AllExceptionFilter)
  async findFilteredPages(
    query: string,
    currentPage: number
  ): Promise<Bot[] | null> {

    const ITEMS_PER_PAGE = 6;
    const skipItems = (currentPage - 1) * ITEMS_PER_PAGE;

    const response = await this.prismaService.bot.findMany({
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
    });

    return response;
  }

  @UseFilters(AllExceptionFilter)
  async findCountRecords(query: string): Promise<Number> {
    const response = await this.prismaService.bot.count({
      where: {
        name: {
          contains: query,
        },
      },
    });
    return response;
  }

  @UseFilters(AllExceptionFilter)
  async create(createBotDto: CreateBotDto): Promise<Bot> {
    const { knowledgeIds, member_id } = createBotDto;

    const response = await this.prismaService.bot.create({
      data: { ...createBotDto.bot }
    })

    if (response) {
      // Add bot on member  
      await this.prismaService.memberOnBot.create({
        data: {
          bot_id: response.id,
          member_id
        }
      })

      // add log item: "bot"
      const objetMemberLog = {
        item: "Bot",
        counter: 1,
        member_id
      };
      await this.prismaService.memberLog.create({
        data: { ...objetMemberLog }
      })

      // Knowledge Seleccionados
      if (knowledgeIds.length > 0) {
        const knowledgeOnBot = createBotDto.knowledgeIds.map((knowledge_id) => {
          return { bot_id: response.id, knowledge_id };
        });

        const result = await this.prismaService.knowledgeOnBot.createMany({
          data: knowledgeOnBot,
        });

        if (!result) {
          console.log('Error Agregando knowledgeOnBot...')
        }
      }
    }
    return response
  }

  @UseFilters(AllExceptionFilter)
  async findAll(): Promise<Bot[]> {
    return await this.prismaService.bot.findMany({
      include: {
        memberOnBot: {
          include: {
            member: true
          }
        },
        knowledgeOnBot: {
          include: {
            knowledge: {
              include: {
                knowledgeBase: {
                  include: {
                    knowledgeFile: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  @UseFilters(AllExceptionFilter)
  async findOne(id: number): Promise<Bot> {
    return this.prismaService.bot.findFirst({
      where: { id },
      include: {
        memberOnBot: {
          include: {
            member: true
          }
        },
        knowledgeOnBot: {
          include: {
            knowledge: {
              include: {
                knowledgeBase: {
                  include: {
                    knowledgeFile: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  @UseFilters(AllExceptionFilter)
  update(id: number, updateBotDto: UpdateBotDto) {
    return `This action updates a #${id} bot`;
  }

  @UseFilters(AllExceptionFilter)
  async remove(id: number): Promise<Bot> {

    const response = await this.prismaService.bot.findFirst({
      where: { id },
      select: {
        memberOnBot: {
          select: {
            member_id: true
          }
        }
      }
    });

    const result = await this.prismaService.bot.delete({
      where: { id }
    });

    if (result) {
      const { member_id } = response.memberOnBot[0];
      const objetMemberLog = {
        item: "Bot",
        counter: -1,
        member_id
      };

      await this.prismaService.memberLog.create({
        data: { ...objetMemberLog }
      });
    }
    return result
  }
}