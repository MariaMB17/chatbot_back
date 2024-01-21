import { AllExceptionFilter } from '@Appchatbot/allexceptionsfilter';
import { Injectable, UseFilters } from '@nestjs/common';
import { Bot } from '@prisma/mysql/client';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotsService {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  async create(createBotDto: CreateBotDto): Promise<Bot> {
    const member_id = createBotDto.member_id;

    const result = await this.prismaService.bot.create({
      data: { ...createBotDto.bot }
    })

    const knowledgeOnBot = createBotDto.knowledgeIds.map((knowledge_id) => {
      return { bot_id: result.id, knowledge_id };
    });

    await this.prismaService.knowledgeOnBot.createMany({
      data: knowledgeOnBot,
    });

    await this.prismaService.memberOnBot.create({
      data: {
        bot_id: result.id,
        member_id
      }
    })

    // Log item: "bot"
    const objetMemberLog = {
      item: "Bot",
      counter: 1,
      member_id
    };

    await this.prismaService.memberLog.create({
      data: { ...objetMemberLog }
    })
    return result
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

  update(id: number, updateBotDto: UpdateBotDto) {
    return `This action updates a #${id} bot`;
  }

  async remove(id: number): Promise<Bot> {
    const result = await this.prismaService.bot.findFirst({
      where: { id },
      select: {
        memberOnBot: {
          select: { member_id: true }
        }
      }
    });

    if (result) {
      const { member_id } = result.memberOnBot[0]
      //  // Log item: "bot"
      const objetMemberLog = {
        item: "Bot",
        counter: -1,
        member_id
      };
      await this.prismaService.memberLog.create({
        data: { ...objetMemberLog }
      })
    }

    return this.prismaService.bot.delete({
      where: { id }
    })
  }
}
