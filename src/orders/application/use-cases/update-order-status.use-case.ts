import { inject, injectable } from "tsyringe";
import IOrderRepository from "../ports/repositories/order.repository.interface";
import StatusEnum from "../../domain/enums/status.enum";
import ResourceNotFoundError from "../../../shared/application/errors/resource-not-found.error";
import OrderModel from "../../domain/models/order.model";

@injectable()
class UpdateOrderStatusUseCase {
  constructor(
    @inject("OrderRepository") private orderRepository: IOrderRepository
  ) {}

  async execute(orderUuid: string, status: string): Promise<OrderModel> {
    const statusEnum = this.convertStatusEnum(status);

    const order = await this.orderRepository.updateOrderStatus(
      orderUuid,
      statusEnum
    );

    if (!order) {
      throw new ResourceNotFoundError("Order not found");
    }

    return order;
  }

  private convertStatusEnum(status: string): StatusEnum {
    switch (status) {
      case "delivered":
        return StatusEnum.delivered;
      case "preparing":
        return StatusEnum.preparing;
      case "pending":
        return StatusEnum.pending;
      case "canceled":
        return StatusEnum.canceled;
      default:
        throw new Error("Invalid status");
    }
  }
}

export default UpdateOrderStatusUseCase;
