import { autoInjectable } from "tsyringe";
import OrderHandlers from "../handlers/order.handlers";
import { Router } from "express";
import validateResource from "../../../shared/infrastructure/middlewares/validate-resource.middleware";
import { CreateOrderSchema, GetMyCurrentOrderSchema, UpdateOrderStatusSchema } from "../schemas/order.schemas";

@autoInjectable()
class OrderRouter {
  private router: Router;
  constructor(private readonly orderHandlers: OrderHandlers) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", validateResource(CreateOrderSchema), this.orderHandlers.createOrder);
    this.router.put("/:uuid/status", validateResource(UpdateOrderStatusSchema), this.orderHandlers.updateOrderStatus);
    this.router.get("/my/current", validateResource(GetMyCurrentOrderSchema), this.orderHandlers.getMyCurrentOrder);
  }

  public getRouter() {
    return this.router;
  }
}

export default OrderRouter;
