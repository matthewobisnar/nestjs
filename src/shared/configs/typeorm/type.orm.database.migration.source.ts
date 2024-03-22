import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions, runSeeders } from "typeorm-extension";

const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development';
const result = dotenv.config({ path: `./env/.env.${env}` });

if (result.error) {
  throw result.error;
}

console.log(__dirname + '/../**/*.entity{.ts,.js}');

const dbMigrationOption: DataSourceOptions & SeederOptions = {
  name: process.env.MIGRATION_DATABASE_CONNECTION_NAME,
  database: process.env.MIGRATION_DATABASE,
  migrationsTableName: process.env.MIGRATION_DATABASE_TABLE_NAME,
  synchronize: false,
  port: process.env.MIGRATION_DATABASE_PORT as any,
  type: process.env.MIGRATION_DATABASE_TYPE as any,
  host: process.env.MIGRATION_DATABASE_HOST,
  username: process.env.MIGRATION_DATABASE_USERNAME,
  password: process.env.MIGRATION_DATABASE_PASSWORD,
  migrationsTransactionMode: 'all',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '/../../../', '**/infrastructure/migrations/*{.ts,.js}')],
  migrationsRun: false,
  // additional config options brought by typeorm-extension
  // factories: [join(__dirname, '/../../', 'db/migrations/seeders/*.factory{.ts,.js}')],
  // seeds: [join(__dirname, '/../../', 'db/migrations/seeders/*.seeder{.ts,.js}')],
}

export const connectionMigrationSource = new DataSource(dbMigrationOption);