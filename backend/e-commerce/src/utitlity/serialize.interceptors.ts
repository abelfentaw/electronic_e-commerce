/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function SerializeIncludes(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  
    const now = Date.now();
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, { exposeUnsetFields: true });
      }),
    );
  }
}
