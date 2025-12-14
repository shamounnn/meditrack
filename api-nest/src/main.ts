import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());
  app.enableCors({
    origin: config.get<string>('FRONTEND_URL') || '*',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('MediTrack API')
    .setDescription('Professional Medication Management System API Documentation')
    .setVersion('2.0.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('medications', 'Medication management')
    .addTag('schedules', 'Medication schedules')
    .addTag('alerts', 'Drug interaction alerts')
    .addTag('health', 'Health check endpoints')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = config.get<number>('PORT') || 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`MediTrack Nest API running on http://localhost:${port}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger Documentation available at http://localhost:${port}/api/docs`);
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap Nest application', error);
  process.exit(1);
});
