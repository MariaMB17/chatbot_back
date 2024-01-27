import { Controller, Get } from "@nestjs/common"; 

@Controller('/')
export class ChatController {
    @Get()
    findAll(): string {
        return 
    }
}