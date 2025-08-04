import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env['DATABASE_HOST'] as string,
  port: process.env['DATABASE_PORT'] as unknown as number,
  username: process.env['DATABASE_USERNAME'] as string,
  password: process.env['DATABASE_PASSWORD'] as string,
  database: process.env['DATABASE_NAME'] as string,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
});
