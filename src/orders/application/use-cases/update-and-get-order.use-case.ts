import { inject, injectable } from "tsyringe";
import IOrderRepository from "../ports/repositories/order.repository.interface";
import OrderModel from "../../domain/models/order.model";

@injectable()
class UpdateAndGetOrderUseCase {
  constructor(
    @inject("OrderRepository") private orderRepository: IOrderRepository,
  ) {}

    async execute(orderUuid: string, billingUuid: string): Promise<OrderModel> {

      const order = await this.orderRepository.updateBillingUuid(orderUuid, billingUuid);

      if (!order) {
        throw new Error("Order not found");
      }

      return order;
    }
}

export default UpdateAndGetOrderUseCase;
