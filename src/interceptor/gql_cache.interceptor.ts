/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class GqlCacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const args = ctx.getArgs();

    if (info.operation.operation !== 'query') {
      return next.handle();
    }

    const cacheKey = `gql:${info.fieldName}:${JSON.stringify(args)}`;
    const cacheResponse = await this.cacheManager.get(cacheKey);

    if (cacheResponse) {
      return of(cacheResponse);
    }

    return next.handle().pipe(
      tap((data: any) => {
        if (data) {
          this.cacheManager
            .set(cacheKey, data)
            .then(() => console.log('success caching'))
            .catch((error: any) => console.error(error));
        }
      })
    );
  }
}
