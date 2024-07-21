import { autoInjectable } from "tsyringe";
import RestOrderHandlers from "../handlers/rest-order.handlers";
import { Router } from "express";
import validateResource from "../../../shared/infrastructure/middlewares/validate-resource.middleware";
import { CreateOrderSchema, GetMyCurrentOrderSchema, UpdateOrderStatusSchema } from "../schemas/order.schemas";

@autoInjectable()
class OrderRouter {
  private router: Router;
  constructor(private readonly restOrderHandlers: RestOrderHandlers) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", validateResource(CreateOrderSchema), this.restOrderHandlers.createOrder);
    this.router.put("/:uuid/status", validateResource(UpdateOrderStatusSchema), this.restOrderHandlers.updateOrderStatus);
    this.router.get("/my/current", validateResource(GetMyCurrentOrderSchema), this.restOrderHandlers.getMyCurrentOrder);
  }

  public getRouter() {
    return this.router;
  }
}

export default OrderRouter;
