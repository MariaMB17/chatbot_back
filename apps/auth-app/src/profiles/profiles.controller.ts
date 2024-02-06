import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { Profile } from './entities/profile.entity';
import { Errors } from 'core/interface/interface-error';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @MessagePattern('createProfile')
  create(@Payload() createProfileDto: CreateProfileDto): Observable<Profile | Errors>  {
    return this.profilesService.create(createProfileDto).pipe(
      map((company) => company),
      catchError((error) => of({ msg: 'El perfil no pudo ser creado', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updateProfile')
  update(@Payload() updateProfileDto: UpdateProfileDto): Observable<Profile | Errors> {
    return this.profilesService.update(updateProfileDto.id, updateProfileDto).pipe(
      map((company) => company),
      catchError((error) => of({ msg: 'El perfil no pudo ser modificado', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('removeProfile')
  remove(@Payload() id: number) {
    return this.profilesService.remove(id).pipe(
      map((company) => company),
      catchError((error) => of({ msg: 'El perfil no pudo ser eliminado', error, status: HttpStatus.CONFLICT }))
    );
  }
}
