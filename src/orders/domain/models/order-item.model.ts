class OrderItemModel {
  id: number;
  uuid: string;
  mealUuid: string;
  orderId: number;
  quantity: number;

  constructor(
    id: number,
    uuid: string,
    mealUuid: string,
    orderId: number,
    quantity: number
  ) {
    this.id = id;
    this.uuid = uuid;
    this.mealUuid = mealUuid;
    this.orderId = orderId;
    this.quantity = quantity;
  }
}

export default OrderItemModel;
