import StatusEnum from "../../../domain/enums/status.enum";
import OrderModel from "../../../domain/models/order.model";

interface IOrderRepository {
  save(order: OrderModel): Promise<OrderModel>;
  updateOrderStatus(uuid: string, status: StatusEnum): Promise<OrderModel | null>;
  getMyCurrentOrder(userUuid: string): Promise<OrderModel | null>;
  updateBillingUuid(uuid: string, billingUuid: string): Promise<OrderModel | null>;
}

export default IOrderRepository;
