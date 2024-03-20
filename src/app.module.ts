import { TypeOrmDatabaseConfig } from './shared/db/connections/type.orm.database.config';
import schemaValidation from './shared/signatures/schema.validation';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './shared/jwts/jwt.config';
import { PassportModule } from './core/modules/passport/passport.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useClass: JwtConfig,
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
    PassportModule,
    TicketModule
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
