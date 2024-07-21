import { inject, injectable } from "tsyringe";
import IOrderItemRepository from "../ports/repositories/order-item.repository.interface";
import OrderItemModel from "../../domain/models/order-item.model";
import { v4 as uuidV4 } from "uuid";

@injectable()
class CreateOrderItemUseCase {
  constructor(
    @inject("OrderItemRepository")
    private orderItemRepository: IOrderItemRepository
  ) {}

  async execute(
    orderId: number,
    mealUuid: string,
    mealPrice: number,
    quantity: number
  ): Promise<OrderItemModel> {
    const orderItem = new OrderItemModel(
      0,
      uuidV4(),
      mealUuid,
      mealPrice,
      orderId,
      quantity
    );

    const orderItemCreated = await this.orderItemRepository.save(orderItem);

    return orderItemCreated;
  }
}

export default CreateOrderItemUseCase;
