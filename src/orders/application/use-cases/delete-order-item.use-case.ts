import { inject, injectable } from "tsyringe";
import IOrderItemRepository from "../ports/repositories/order-item.repository.interface";

@injectable()
class DeleteOrderItemUseCase {
  constructor(
    @inject("OrderItemRepository")
    private orderItemRepository: IOrderItemRepository
  ) {}

  async execute(uuid: string): Promise<boolean> {
    return this.orderItemRepository.delete(uuid);
  }
}

export default DeleteOrderItemUseCase;
