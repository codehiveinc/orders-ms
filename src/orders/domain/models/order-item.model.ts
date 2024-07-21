class OrderItemModel {
  id: number;
  uuid: string;
  mealUuid: string;
  quantity: number;

  constructor(id: number, uuid: string, mealUuid: string, quantity: number) {
    this.id = id;
    this.uuid = uuid;
    this.mealUuid = mealUuid;
    this.quantity = quantity;
  }
}

export default OrderItemModel;
