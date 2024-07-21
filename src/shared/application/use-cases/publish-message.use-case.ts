import { inject, injectable } from "tsyringe";
import SagaMessageModel from "../../domain/types/saga-message";
import IMessageBrokerRepository from "../ports/respositories/message-broker.repository.interface";

@injectable()
class PublishMessageUseCase {
  constructor(
    @inject("MessageBrokerRepository")
    private readonly messageBrokerRepository: IMessageBrokerRepository
  ) {}

  async execute(message: SagaMessageModel, routingKey: string) {
    return this.messageBrokerRepository.publish(message, routingKey);
  }
}

export default PublishMessageUseCase;
