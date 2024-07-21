class OrderItemModel {
  id: number;
  uuid: string;
  mealUuid: string;
  mealPrice: number;
  orderId: number;
  quantity: number;

  constructor(
    id: number,
    uuid: string,
    mealUuid: string,
    mealPrice: number,
    orderId: number,
    quantity: number
  ) {
    this.id = id;
    this.uuid = uuid;
    this.mealUuid = mealUuid;
    this.mealPrice = mealPrice;
    this.orderId = orderId;
    this.quantity = quantity;
  }
}

export default OrderItemModel;
