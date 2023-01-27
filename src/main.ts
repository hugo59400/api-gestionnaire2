import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true, transform: true, whitelist: true, transformOptions: { enableImplicitConversion: true } }));
  await app.listen(3000);
}
bootstrap();

//
// const mysql = require('mysql');
// require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD
// });

// connection.connect(error => {
//   if (error) throw error;
//   console.log('Connected to MySQL server.');

//   connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, error => {
//     if (error) throw error;
//     console.log(`Database "${process.env.DB_NAME}" created or already exists.`);
//     connection.end();
//   });
// });

