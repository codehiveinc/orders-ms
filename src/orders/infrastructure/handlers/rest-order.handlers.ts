import { injectable } from "tsyringe";
import CreateOrderUseCase from "../../application/use-cases/create-order.use-case";
import { Request, Response } from "express";
import {
  CreateOrderBodyType,
  GetMyCurrentOrderParamsType,
  UpdateOrderStatusBodyType,
  UpdateOrderStatusParamsType,
} from "../schemas/order.schemas";
import createBaseResponse from "../../../shared/infrastructure/utils/createBaseResponse";
import UpdateOrderStatusUseCase from "../../application/use-cases/update-order-status.use-case";
import ResourceNotFoundError from "../../../shared/application/errors/resource-not-found.error";
import GetMyCurrentOrderByUserUuidUseCase from "../../application/use-cases/get-my-current-order-by-user-uuid.use-case";

@injectable()
class RestOrderHandlers {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
    private readonly getMyCurrentOrderUseCase: GetMyCurrentOrderByUserUuidUseCase
  ) {
    this.createOrder = this.createOrder.bind(this);
    this.updateOrderStatus = this.updateOrderStatus.bind(this);
    this.getMyCurrentOrder = this.getMyCurrentOrder.bind(this);
  }

  async createOrder(
    req: Request<unknown, unknown, CreateOrderBodyType>,
    res: Response
  ) {
    const { userUuid } = req.body;

    try {
      const order = await this.createOrderUseCase.execute(userUuid);

      const baseResponse = createBaseResponse(
        order,
        "Order created successfully",
        true,
        201
      );

      return res.status(baseResponse.statusCode).json(baseResponse);
    } catch (error) {
      const baseResponse = createBaseResponse(null, `${error}`, false, 500);

      return res.status(baseResponse.statusCode).json(baseResponse);
    }
  }

  async updateOrderStatus(
    req: Request<
      UpdateOrderStatusParamsType,
      unknown,
      UpdateOrderStatusBodyType
    >,
    res: Response
  ) {
    const { uuid } = req.params;
    const { status } = req.body;

    try {
      const order = await this.updateOrderStatusUseCase.execute(uuid, status);

      const baseResponse = createBaseResponse(
        order,
        "Order status updated successfully",
        true,
        200
      );

      return res.status(baseResponse.statusCode).json(baseResponse);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        const baseResponse = createBaseResponse(
          null,
          error.message,
          false,
          404
        );

        return res.status(baseResponse.statusCode).json(baseResponse);
      }

      const baseResponse = createBaseResponse(null, `${error}`, false, 500);

      return res.status(baseResponse.statusCode).json(baseResponse);
    }
  }

  async getMyCurrentOrder(
    req: Request<GetMyCurrentOrderParamsType, unknown, unknown>,
    res: Response
  ) {
    const { userUuid } = req.params;

    try {
      const order = await this.getMyCurrentOrderUseCase.execute(userUuid);

      const baseResponse = createBaseResponse(
        order,
        "Order retrieved successfully",
        true,
        200
      );

      return res.status(baseResponse.statusCode).json(baseResponse);
    } catch (error) {
      const baseResponse = createBaseResponse(null, `${error}`, false, 500);

      return res.status(baseResponse.statusCode).json(baseResponse);
    }
  }
}

export default RestOrderHandlers;
