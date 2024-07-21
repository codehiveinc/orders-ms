import { v4 as uuidv4 } from "uuid";
import OrderItem from "./OrderItem"


class OrderModel{
    uuid: uuidv4;
    id: number;
    

    constructor(
        uuid: uuidv4,
        id: number
    ) {
        this.uuid = uuidv4();
        this.id=id;
    }
}
export default OrderModel;