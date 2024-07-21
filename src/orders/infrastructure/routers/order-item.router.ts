import { Router } from "express";
import { autoInjectable } from "tsyringe";
import RestOrderItemHandlers from "../handlers/rest-order-item.handlers";
import validateResource from "../../../shared/infrastructure/middlewares/validate-resource.middleware";
import {
  CreateOrderItemSchema,
  DeleteOrderItemSchema,
  UpdateOrderItemQuantitySchema,
} from "../schemas/order-item.schemas";

@autoInjectable()
class OrderItemRouter {
  private router: Router;

  constructor(private readonly orderItemHandlers: RestOrderItemHandlers) {
    this.router = Router();
    this.initiateRoutes();
  }

  private initiateRoutes() {
    this.router.post(
      "/",
      validateResource(CreateOrderItemSchema),
      this.orderItemHandlers.createOrderItem
    );
    this.router.put(
      "/:uuid",
      validateResource(UpdateOrderItemQuantitySchema),
      this.orderItemHandlers.updateOrderItemQuantity
    );
    this.router.delete(
      "/:uuid",
      validateResource(DeleteOrderItemSchema),
      this.orderItemHandlers.deleteOrderItem
    );
  }

  getRouter() {
    return this.router;
  }
}

export default OrderItemRouter;
