import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/src/entities/*.entity{.ts,.js}'],
  migrations: ['dist/db/migration/*{.ts,.js}'],
  logging: true,
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
