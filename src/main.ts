/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error'],
    cors: true,
  });
  app.enableVersioning({ type: VersioningType.URI });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const config = new DocumentBuilder()
    .setTitle('kankan_board_v1')
    .setDescription('This is a Kankan board personal project')
    .setVersion('1.0')
    .addTag('kankan')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err: any) => console.log('main.ts:::', err));
