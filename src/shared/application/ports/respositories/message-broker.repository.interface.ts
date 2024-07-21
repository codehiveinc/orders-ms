import SagaMessageModel from "../../../domain/types/saga-message";

interface IMessageBrokerRepository {
  publish(message: SagaMessageModel, routingKey: string): Promise<void>;
  consume(
    callback: (message: SagaMessageModel) => void, routingKey: string
  ): void;
}

export default IMessageBrokerRepository;
