/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from './constant';

export const Auth = (...authTypes: string[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
