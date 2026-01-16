import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { RabbitMqConsumer } from './messaging/rabbitmq.consumer';

@Module({
  imports: [],
  controllers: [AppController, HealthController],
  providers: [AppService, RabbitMqConsumer],
})
export class AppModule {}
