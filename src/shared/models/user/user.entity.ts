import { User, UserType } from '../../types/user-type.js';
import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH,
  MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../../constants.js';

import { createSHA256 } from '../../utils/createSHA256.js';

// for unique id
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// merge defaultClasses.Base && defaultClasses.TimeStamps
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '', minlength: MIN_USER_NAME_LENGTH, maxlength: MAX_USER_NAME_LENGTH })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarPath: string;

  @prop({ required: true, default: '', minlength: MIN_PASSWORD_LENGTH, maxlength: MAX_PASSWORD_LENGTH })
  private password?: string;

  @prop({ required: true, enum: UserType, type: () => String })
  public userType: UserType;

  @prop({ required: false, default: [] })
  public favoriteOffersIds: string[];

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.name = userData.name;
    this.userType = userData.userType;
    this.favoriteOffersIds = userData.favoriteOffersIds ?? [];
  }

  setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  getPassword() {
    return this.password;
  }

}

export const UserModel = getModelForClass(UserEntity);
