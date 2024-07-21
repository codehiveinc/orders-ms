import { inject, injectable } from "tsyringe";
import IOrderRepository from "../ports/repositories/order.repository.interface";
import OrderModel from "../../domain/models/order.model";
import CreateOrderUseCase from "./create-order.use-case";

@injectable()
class GetMyCurrentOrderUseCase {
  constructor(
    @inject("OrderRepository")
    private readonly orderRepository: IOrderRepository,
    private readonly createOrderUseCase: CreateOrderUseCase
  ) {}

  async execute(userUuid: string): Promise<OrderModel> {
    const myCurrentOrder = await this.orderRepository.getMyCurrentOrder(
      userUuid
    );

    if (myCurrentOrder) {
      return myCurrentOrder;
    }

    return this.createOrderUseCase.execute(userUuid);
  }
}

export default GetMyCurrentOrderUseCase;
