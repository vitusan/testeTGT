import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CidadaoModule } from './cidadao/cidadao.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: { rejectUnauthorized: false },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.MODE === 'DEV' ? true : false,
    }),
    CidadaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
