import { IsEmail, IsString, Length } from 'class-validator';
import { CreateLoginUserMessage } from './login-user.messages.js';
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '../../../constants.js';

export class LoginUserDto {
@IsEmail({}, { message: CreateLoginUserMessage.email.invalidFormat })
  public email: string;

@IsString({ message: CreateLoginUserMessage.password.invalidFormat })
@Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, { message: CreateLoginUserMessage.password.lengthField })
public password: string;
}
