import { Connection, Channel, connect } from "amqplib";
import { injectable } from "tsyringe";
import IMessageBrokerRepository from "../../../application/ports/respositories/message-broker.repository.interface";
import SagaMessageModel from "../../../domain/types/saga-message";
import { envVariables } from "../../../../env";

@injectable()
class MessageBrokerRepository implements IMessageBrokerRepository {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private exchange: string | null = null;

  async init(): Promise<void> {
    const rabbitmqHost = process.env.RABBITMQ_HOST;
    const rabbitmqUsername = process.env.RABBITMQ_USERNAME;
    const rabbitmqPassword = process.env.RABBITMQ_PASSWORD;
    this.exchange = envVariables.SAGA_EXCHANGE_NAME;

    this.connection = await connect({
      protocol: "amqps",
      hostname: rabbitmqHost,
      username: rabbitmqUsername,
      password: rabbitmqPassword,
      port: 5671,
    });
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchange, "direct", { durable: true });
  }

  async publish(message: SagaMessageModel, routingKey: string): Promise<void> {
    if (!this.channel) {
      await this.init();
    }
    if (this.channel) {
      this.channel.publish(this.exchange!, routingKey, Buffer.from(JSON.stringify(message)));
      return;
    }
    throw new Error("Channel is not initialized");
  }

  async consume(
    callback: (message: SagaMessageModel) => void,
    queue: string
  ): Promise<void> {
    if (!this.channel) {
      await this.init();
    }

    if (this.channel) {
      this.channel.consume(queue, (message) => {
        if (!message) {
          return;
        }

        callback(JSON.parse(message.content.toString()));
      }, { noAck: true });
      return;
    }
    throw new Error("Channel is not initialized");
  }
}

export default MessageBrokerRepository;
