import { Container } from 'inversify';
import { UserService } from './dto/user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';
import { types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { Component } from '../../types/component.enum.js';
import { UserModel } from './user.entity.js';

export const createUserContainer = () => {
  const userContainer = new Container();

  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
};
