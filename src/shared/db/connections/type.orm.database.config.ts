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
            type:  this.config.get<string>('DATABASE_TYPE') as DatabaseTypeDef,
            database: this.config.get<string>('DATABASE'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: this.config.get<boolean>('DATABASE_SYNCHRONIZE') ?? false,
            logging: (isLoggingDefined ? this.config.get<string>('DATABASE_LOGGING').split(",") : []) as LoggerOptions
        }
        
    }

}