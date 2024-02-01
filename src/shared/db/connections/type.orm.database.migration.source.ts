import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions, runSeeders } from "typeorm-extension";

const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development';
const result = dotenv.config({ path: `.env.${env}` });

if (result.error) {
  throw result.error;
}

const dbMigrationOption: DataSourceOptions & SeederOptions = {
  name: process.env.MIGRATION_DATABASE_CONNECTION_NAME,
  database: process.env.MIGRATION_DATABASE,
  migrationsTableName: process.env.MIGRATION_TABLE_NAME,
  synchronize: false,
  type: 'sqlite',
  migrationsTransactionMode: 'all',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '/../../', '**/db/migrations/schema/*{.ts,.js}')],
  migrationsRun: false,
  // additional config options brought by typeorm-extension
  // factories: [join(__dirname, '/../../', 'db/migrations/seeders/*.factory{.ts,.js}')],
  // seeds: [join(__dirname, '/../../', 'db/migrations/seeders/*.seeder{.ts,.js}')],
}

export const connectionMigrationSource = new DataSource(dbMigrationOption);