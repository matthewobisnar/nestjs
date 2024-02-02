import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './shared/swagger/swagger.config';
import { swaggerThemeOptions } from './shared/swagger/swagger.theme.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  SwaggerModule.setup(
    'docs', app, 
    SwaggerModule.createDocument(app, swaggerConfig),
    swaggerThemeOptions
  );

  await app.listen(process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000);
}
bootstrap();
