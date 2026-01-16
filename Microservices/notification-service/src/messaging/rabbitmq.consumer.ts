import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

const DEFAULT_URL = 'amqp://leadsample:lad1234@44.11.23.41:5672';
const EXCHANGE = process.env.RABBITMQ_LEAD_EXCHANGE || 'lead.direct';
const ROUTING_KEY = process.env.RABBITMQ_LEAD_ROUTING_KEY || 'lead.created';
const QUEUE = process.env.RABBITMQ_NOTIFICATION_QUEUE || 'lead.notification.queue';

@Injectable()
export class RabbitMqConsumer implements OnModuleInit {
  private readonly logger = new Logger(RabbitMqConsumer.name);
  private channel?: amqp.Channel;

  async onModuleInit(): Promise<void> {
    await this.start();
  }

  private async start(): Promise<void> {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL || DEFAULT_URL);
      const channel = await connection.createChannel();
      await channel.assertExchange(EXCHANGE, 'direct', { durable: true });
      await channel.assertQueue(QUEUE, { durable: true });
      await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);
      await channel.prefetch(10);
      this.channel = channel;

      channel.consume(
        QUEUE,
        (message) => this.handleMessage(message),
        { noAck: false },
      );

      this.logger.log(`Consuming ${QUEUE} from ${process.env.RABBITMQ_URL || DEFAULT_URL}`);
    } catch (error) {
      this.logger.error('Failed to start RabbitMQ consumer', error as Error);
    }
  }

  private handleMessage(message: amqp.ConsumeMessage | null): void {
    if (!message || !this.channel) {
      return;
    }

    try {
      const content = message.content.toString();
      const payload = JSON.parse(content);
      // Placeholder: integrate with real notification flow (email/SMS/push)
      this.logger.log(`Received lead.created event for leadId=${payload.leadId}`);
      this.channel.ack(message);
    } catch (error) {
      this.logger.error('Failed to process RabbitMQ message', error as Error);
      this.channel.nack(message, false, false);
    }
  }
}
