import { injectable } from "tsyringe";
import CreateOrderItemUseCase from "../../application/use-cases/create-order-item.use-case";
import UpdateOrderItemQuantityUseCase from "../../application/use-cases/update-order-item-quantity.use-case";
import {
  CreateOrderItemBodyType,
  DeleteOrderItemParamsType,
  UpdateOrderItemQuantityBodyType,
} from "../schemas/order-item.schemas";
import { Request, Response } from "express";
import createBaseResponse from "../../../shared/infrastructure/utils/createBaseResponse";
import { UpdateOrderStatusParamsType } from "../schemas/order.schemas";
import DeleteOrderItemUseCase from "../../application/use-cases/delete-order-item.use-case";

@injectable()
class RestOrderItemHandlers {
  constructor(
    private readonly createOrderItemUseCase: CreateOrderItemUseCase,
    private readonly updateOrderItemUseCase: UpdateOrderItemQuantityUseCase,
    private readonly deleteOrderItemUseCase: DeleteOrderItemUseCase
  ) {
    this.createOrderItem = this.createOrderItem.bind(this);
    this.updateOrderItemQuantity = this.updateOrderItemQuantity.bind(this);
    this.deleteOrderItem = this.deleteOrderItem.bind(this);
  }

  async createOrderItem(
    req: Request<unknown, unknown, CreateOrderItemBodyType>,
    res: Response
  ) {
    const { orderId, mealUuid, quantity } = req.body;

    try {
      const orderItem = await this.createOrderItemUseCase.execute(
        orderId,
        mealUuid,
        quantity
      );

      const baseResponse = createBaseResponse(
        orderItem,
        "Order item created",
        true,
        201
      );

      return res.status(baseResponse.statusCode).json(baseResponse);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async updateOrderItemQuantity(
    req: Request<
      UpdateOrderStatusParamsType,
      unknown,
      UpdateOrderItemQuantityBodyType
    >,
    res: Response
  ) {
    const { uuid } = req.params;
    const { quantity } = req.body;

    try {
      const orderItem = await this.updateOrderItemUseCase.execute(
        uuid,
        quantity
      );

      const baseResponse = createBaseResponse(
        orderItem,
        "Order item updated",
        true,
        200
      );

      return res.status(baseResponse.statusCode).json(baseResponse);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async deleteOrderItem(
    req: Request<DeleteOrderItemParamsType, unknown, unknown>,
    res: Response
  ) {
    const { uuid } = req.params;

    try {
      await this.deleteOrderItemUseCase.execute(uuid);

      const baseResponse = createBaseResponse(
        null,
        "Order item deleted",
        true,
        200
      );

      return res.status(baseResponse.statusCode).json(baseResponse);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default RestOrderItemHandlers;
