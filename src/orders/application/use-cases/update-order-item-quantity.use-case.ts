import { inject, injectable } from "tsyringe";
import IOrderItemRepository from "../ports/repositories/order-item.repository.interface";
import OrderItemModel from "../../domain/models/order-item.model";
import ResourceNotFoundError from "../../../shared/application/errors/resource-not-found.error";

@injectable()
class UpdateOrderItemQuantityUseCase {
  constructor(
    @inject("OrderItemRepository")
    private orderItemRepository: IOrderItemRepository
  ) {}

  async execute(
    orderItemUuid: string,
    quantity: number
  ): Promise<OrderItemModel> {
    const orderItem = await this.orderItemRepository.updateQuantity(
      orderItemUuid,
      quantity
    );

    if (!orderItem) {
      throw new ResourceNotFoundError("Order item not found");
    }

    return orderItem;
  }
}

export default UpdateOrderItemQuantityUseCase;
