import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Debe indicar usuario' })
  @IsEmail({}, { message: 'Debe indicar un correo electrónico' })
  @IsString({ message: 'Debe indicar una cadena de texto' })
  email: string;

  @IsNotEmpty({ message: 'Debe indicar usuario' })
  @IsString({ message: 'Debe indicar una cadena de texto' })
  password: string;
}

