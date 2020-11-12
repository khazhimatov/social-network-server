import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: console,
  });

  const options = new DocumentBuilder()
    .setTitle('Social network')
    .setDescription('The social network API')
    .setVersion('1.0')
    .addBasicAuth().addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
    })
  )

  await app.listen(3000)
  return app
}
