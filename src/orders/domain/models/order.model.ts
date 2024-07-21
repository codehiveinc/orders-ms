import StatusEnum from "../enums/status.enum";
import OrderItemModel from "./order-item.model";

class OrderModel {
  id: number;
  uuid: string;
  orderItems: OrderItemModel[];
  status: StatusEnum;
  userUuid: string;
  billingUuid: string | null;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    uuid: string,
    orderItems: OrderItemModel[],
    status: StatusEnum,
    userUuid: string,
    billingUuid: string | null,
    totalAmount: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.uuid = uuid;
    this.orderItems = orderItems;
    this.status = status;
    this.userUuid = userUuid;
    this.billingUuid = billingUuid;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default OrderModel;
