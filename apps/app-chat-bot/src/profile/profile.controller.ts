import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common';
import { CreateProfileDto, DataProfile } from './dto/create-profile.dto';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Profile } from 'apps/auth-app/src/profiles/entities/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(@Inject('profile-service') private profileMsService: ClientProxy) { }

  
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ResponseMessage("Perfil modificado con exito")
  update(@Param('id') id: string, @Body() updateProfileDto: CreateProfileDto): Observable<Profile> {
    const dataProfile = {
      id:+id,
      ...this._dataProfile(updateProfileDto)
    }
    return this.profileMsService.send('updateProfile', dataProfile);
  }
   
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ResponseMessage("Perfil eliminado con exito")
  remove(@Param('id') id: string) {
    return this.profileMsService.send('removeProfile', +id);
  }

  private _dataProfile(data: CreateProfileDto){    
    let dataProfile = new DataProfile()    
    dataProfile.profile = data
    return dataProfile
  }
}
