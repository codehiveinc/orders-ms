import OrderItemModel from "../../../domain/models/order-item.model";

interface IOrderItemRepository {
  save(orderItemModel: OrderItemModel): Promise<OrderItemModel>;
  updateQuantity(
    uuid: string,
    quantity: number
  ): Promise<OrderItemModel | null>;
  delete(uuid: string): Promise<boolean>;
}

export default IOrderItemRepository;
