import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class RemoveFieldsInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  public constructor(private readonly fields: (keyof T)[]) {}
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const newObject = JSON.parse(JSON.stringify(data || {}));

        for (const field of this.fields) {
          delete newObject[field];
        }

        return newObject;
      }),
    );
  }
}
