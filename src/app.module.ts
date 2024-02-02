import { TypeOrmDatabaseConfig } from './shared/db/connections/type.orm.database.config';
import { AuthenticationModule } from './authentication/authentication.module';
import schemaValidation from './shared/signatures/schema.validation';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './shared/jwts/jwt.config';
import { PassportModule } from './passport/passport.module';
import { UserService } from './user/services/user/user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useClass: JwtConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: schemaValidation
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmDatabaseConfig
    }),
    AuthenticationModule,
    PassportModule
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
