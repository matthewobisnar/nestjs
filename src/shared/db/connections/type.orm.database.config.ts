import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { LoggerOptions } from "typeorm";

@Injectable()
export class TypeOrmDatabaseConfig implements TypeOrmOptionsFactory {

    constructor(private readonly config: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {   

        const isLoggingDefined = (typeof this.config.get<string>('DATABASE_LOGGING') != undefined 
                                      || this.config.get<string>('DATABASE_LOGGING') != null);
        return {
            name: this.config.get<string>('DATABASE_CONNECTION_NAME'),
            type:  this.config.get<string>('DATABASE_TYPE') as any,
            database: this.config.get<string>('DATABASE'),
            port: this.config.get<string>('DATABASE_PORT') as any,
            host: this.config.get<String>('DATABASE_HOST') as any,
            username: this.config.get<String>('DATABASE_USERNAME') as any,
            password: this.config.get<String>('DATABASE_PASSWORD') as any,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: (isLoggingDefined ? this.config.get<string>('DATABASE_LOGGING').split(",") : []) as LoggerOptions
        }
        
    }

}