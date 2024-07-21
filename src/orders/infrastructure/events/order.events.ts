import { autoInjectable } from "tsyringe";
import ConsumeMessageUseCase from "../../../shared/application/use-cases/consume-message.use-case";
import EventOrderHandlers from "../handlers/event-order.handlers";
import OrderQueue from "../types/order-queue";

@autoInjectable()
class OrderEvents {
  constructor(
    private readonly consumeMessageUseCase: ConsumeMessageUseCase,
    private readonly eventOrderHandler: EventOrderHandlers
  ) {}

  initializeEvents() {
    this.consumeMessageUseCase.execute(
      this.eventOrderHandler.getOrderByUserUuid,
      OrderQueue.UPDATE_ORDER_BY_UUID
    );
  }
}

export default OrderEvents;
