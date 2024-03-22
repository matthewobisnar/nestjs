import schemaValidation from './shared/signatures/schema.validation';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessConfig } from './shared/configs/jwts/jwt.access.config';
import { TypeOrmDatabaseConfig } from './shared/configs/typeorm/type.orm.database.config';
import { AuthenticationModule } from './core/modules/authentication/authentication.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useClass: JwtAccessConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
      validationSchema: schemaValidation
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmDatabaseConfig
    }),
    AuthenticationModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ]
})
export class AppModule {}
