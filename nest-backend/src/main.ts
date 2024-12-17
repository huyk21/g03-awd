import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
    origin: '*', // Allow requests from this origin
    allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning', 'User-Agent'], // Specify allowed headers
    credentials: true, // Allow credentials (if needed)
  });

  await app.listen(process.env.PORT || 3000); // Use Vercel PORT or fallback to 3000
 
}
bootstrap();
