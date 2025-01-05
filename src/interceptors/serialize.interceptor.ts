import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../users/dto/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // RUN SOMETHING BEFORE A REQUEST IS HANDLED
    // BY THE REQUEST HANDLER
    // console.log('Im running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // RUN SOMETHING BEFORE THE RESPONSE IS SENT OUT
        // console.log('Im running before response is sent out', data);
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
