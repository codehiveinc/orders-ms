import { inject, injectable } from "tsyringe";
import IOrderRepository from "../ports/repositories/order.repository.interface";
import OrderModel from "../../domain/models/order.model";
import { v4 as uuidV4 } from "uuid";
import StatusEnum from "../../domain/enums/status.enum";

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject("OrderRepository") private orderRepository: IOrderRepository
  ) {}

  async execute(userUuid: string): Promise<OrderModel> {
    const statusDefault = StatusEnum.pending;

    const order = new OrderModel(
      0,
      uuidV4(),
      [],
      statusDefault,
      userUuid,
      null,
      new Date(),
      new Date()
    );

    return this.orderRepository.save(order);
  }
}

export default CreateOrderUseCase;
