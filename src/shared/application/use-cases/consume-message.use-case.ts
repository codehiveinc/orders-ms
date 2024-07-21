import { inject, injectable } from "tsyringe";
import SagaMessageModel from "../../domain/types/saga-message";
import IMessageBrokerRepository from "../ports/respositories/message-broker.repository.interface";

@injectable()
class ConsumeMessageUseCase {
  constructor(
    @inject("MessageBrokerRepository")
    private readonly messageBrokerRepository: IMessageBrokerRepository
  ) {}

  execute(callback: (message: SagaMessageModel) => void, queue: string): void {
    return this.messageBrokerRepository.consume(callback, queue);
  }
}

export default ConsumeMessageUseCase;
