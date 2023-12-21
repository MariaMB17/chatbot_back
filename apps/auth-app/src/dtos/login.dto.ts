import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class createAuthDto {
  @IsNotEmpty({ message: 'Debe indicar usuario' })
  @IsEmail({}, { message: 'Debe indicar correo electrónico' })
  email: string;

  @IsNotEmpty({ message: 'Debe indicar usuario' })
  @IsString({ message: 'Debe indicar una cadena de texto' })
  password: string;
}
