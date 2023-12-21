import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ResponseMessage("Perfil modificado con exito")
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }
   
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ResponseMessage("Perfil eliminado con exito")
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
