import { v4 as uuidv4 } from "uuid";

class OrderItemModel{
    
    uuid: string = uuidv4();
    id: number;
    quantity: number;

    constructor(
        uuid: typeof uuidv4,
        id: number,
        quantity: number,
    ){
        this.uuid = uuidv4();
        this.id = id;
        this.quantity = quantity;
    }

}

export default OrderItemModel;