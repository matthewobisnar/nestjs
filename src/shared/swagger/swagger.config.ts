import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('Ticketing Swagger API')
.setDescription('The ticketing API description.')
.setVersion('1.0')
.addTag('user')
.addTag('role')
.addBearerAuth(
    { 
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    }
  )
.build();