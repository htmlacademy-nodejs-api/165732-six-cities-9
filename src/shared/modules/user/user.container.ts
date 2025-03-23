import { Container } from 'inversify';
import { UserService } from './dto/user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';
import { types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { Component } from '../../types/component.enum.js';
import { UserModel } from './user.entity.js';
import { UserController } from './user.controller.js';
import { Controller } from '../../../rest/controller/controller.interface.js';

export const createUserContainer = () => {
  const userContainer = new Container();

  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
};
