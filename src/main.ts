import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  Logger,
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log(`Environment: ${process.env.NODE_ENV?.toUpperCase()}`);

  const app = await NestFactory.create(AppModule);

  // Enable CORS and API versioning via URI (e.g. /v1/route)
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Global validation configuration
  const validationOptions: ValidationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    disableErrorMessages: process.env.NODE_ENV === 'production',
    enableDebugMessages: process.env.NODE_ENV !== 'production',
  };
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  // Swagger documentation setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lost in Europe')
    .setDescription('Kevin McCallister is Lost in Europe')
    .setVersion('1.0')
    .setContact('Ismaias Moreira', 'https://github.com/Ismaias', '')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on http://localhost:${port}`);
}

bootstrap().catch((err: unknown) => {
  const logger = new Logger('Bootstrap');

  if (err instanceof Error) {
    logger.error('Failed to start application', err.stack);
  } else {
    logger.error('Unknown error during bootstrap', JSON.stringify(err));
  }

  process.exit(1);
});
