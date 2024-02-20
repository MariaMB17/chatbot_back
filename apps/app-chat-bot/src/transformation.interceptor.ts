import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable, catchError, map, of } from 'rxjs';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) { }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data) && data.length === 0) {
          return {
            message: 'data is an empty array',
            statusCode: context.switchToHttp().getResponse().statusCode,
            data: [],
          };
        } else if (data === null) {
          return {
            message: 'data is null',
            statusCode: context.switchToHttp().getResponse().statusCode,
            data: null,
          };
        } else if (data === undefined) {
          return {
            message: 'data is undefined',
            statusCode: context.switchToHttp().getResponse().statusCode,
            data: undefined,
          };
        } else {
          return {
            message:
              this.reflector.get<string>(
                'response_message',
                context.getHandler(),
              ) ||
              data.message ||
              '',
            statusCode: context.switchToHttp().getResponse().statusCode,
            data: data.result || data,
          };
        }
      }),
      catchError((error) => {
        try {
          if (error instanceof PrismaClientKnownRequestError) {
            if(error?.code === 'P2025') {
              return of({ isSucces: false, error: error?.meta})
            }
            return of({ isSucces: false, error: error})            
          }
          return of(context.switchToHttp().getResponse().statusCode, error)           
        } catch (err) {
          return of({ isSucces: false, error: error})          
        }   
      })
    );
  }
}