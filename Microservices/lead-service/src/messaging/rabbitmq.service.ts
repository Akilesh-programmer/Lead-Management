import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { Lead } from '../lead/schema/lead.schema';

const DEFAULT_URL = 'amqp://leadsample:lad1234@44.11.23.41:5672';
const EXCHANGE = process.env.RABBITMQ_LEAD_EXCHANGE || 'lead.direct';
const ROUTING_KEY = process.env.RABBITMQ_LEAD_ROUTING_KEY || 'lead.created';
const QUEUE = process.env.RABBITMQ_NOTIFICATION_QUEUE || 'lead.notification.queue';

@Injectable()
export class RabbitMqService implements OnModuleInit {
  private readonly logger = new Logger(RabbitMqService.name);
  private channel?: amqp.Channel;

  async onModuleInit(): Promise<void> {
    await this.ensureChannel();
  }

  private async ensureChannel(): Promise<amqp.Channel | undefined> {
    if (this.channel) {
      return this.channel;
    }

    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL || DEFAULT_URL);
      const channel = await connection.createChannel();
      await channel.assertExchange(EXCHANGE, 'direct', { durable: true });
      await channel.assertQueue(QUEUE, { durable: true });
      await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);
      this.channel = channel;
      this.logger.log(`Connected to RabbitMQ at ${process.env.RABBITMQ_URL || DEFAULT_URL}`);
      return channel;
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error as Error);
      return undefined;
    }
  }

  async publishLeadCreated(lead: Lead): Promise<void> {
    const channel = await this.ensureChannel();
    if (!channel) {
      this.logger.warn('Skip publish lead.created: channel not available');
      return;
    }

    const payload = {
      event: 'lead.created',
      leadId: lead._id?.toString(),
      organizationId: (lead as any).organizationId,
      name: lead.name,
      phone: (lead as any).phone,
      status: lead.status,
      createdAt: lead.createdAt ?? new Date(),
      timestamp: new Date().toISOString(),
    };

    try {
      channel.publish(EXCHANGE, ROUTING_KEY, Buffer.from(JSON.stringify(payload)), {
        contentType: 'application/json',
        persistent: true,
      });
      this.logger.log(`Published lead.created for leadId=${payload.leadId}`);
    } catch (error) {
      this.logger.error('Failed to publish lead.created message', error as Error);
    }
  }
}
