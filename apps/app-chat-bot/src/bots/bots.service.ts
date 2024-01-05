import { Injectable } from '@nestjs/common';
import { Bot } from '@prisma/mysql/client';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotsService {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  async create(createBotDto: CreateBotDto): Promise<Bot> {
    const member_id = createBotDto.member_id;

    const bot = await this.prismaService.bot.create({
      data: { ...createBotDto.bot }
    })

    const knowledgeOnBot = createBotDto.knowledgeIds.map((knowledge_id) => {
      return { bot_id: bot.id, knowledge_id };
    });

    await this.prismaService.knowledgeOnBot.createMany({
      data: knowledgeOnBot,
    });

    await this.prismaService.memberOnBot.create({
      data: {
        bot_id: bot.id,
        member_id
      }
    })

    // Log item: "bot"
    const objetoMemberLog = {
      item: "Bot",
      counter: 1,
      member_id
    };

    await this.prismaService.memberLog.create({
      data: { ...objetoMemberLog }
    })
    return bot
  }

  findAll() {
    return `This action returns all bots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bot`;
  }

  update(id: number, updateBotDto: UpdateBotDto) {
    return `This action updates a #${id} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }
}
