import { NestFactory } from '@nestjs/core';
import { AppModule} from './app.module'
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true,
  }))
  app.useStaticAssets(join('Users/abelf/Desktop/ecomerce internship/e-commerce/src', '..', 'uploads'), {
    prefix: '/uploads/', // Access files with "/uploads/" in the URL
  });
  app.enableCors({
  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies
  });
  const port:number= Number(process.env.PORT) || 3000;

 const config = new DocumentBuilder()
 .setTitle('online market of electronics')
 .setDescription('this e-commerce website allow every ond sell any electronics good')
 .addServer('http://localhost:3000')
 .addBearerAuth()
 .setVersion('1.0')
 .build()

 const document =SwaggerModule.createDocument(app,config)
 SwaggerModule.setup('api',app,document, {
  swaggerUrl:'swagger/json'
 })
 await app.listen(port, () => {
  console.log('[WEB]', process.env.BASE_URL + '/api');
});
  // await app.listen(3000);
}
bootstrap();
