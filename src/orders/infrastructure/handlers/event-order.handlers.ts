import { injectable } from "tsyringe";
import PublishMessageUseCase from "../../../shared/application/use-cases/publish-message.use-case";
import OrderRoutingKey from "../types/order.routing-key";
import SagaMessageModel from "../../../shared/domain/types/saga-message";
import GetMyCurrentOrderByUserUuidUseCase from "../../application/use-cases/get-my-current-order-by-user-uuid.use-case";
import UpdateAndGetOrderUseCase from "../../application/use-cases/update-and-get-order.use-case";

type GetMyCurrentOrderRequestDto = {
  order_uuid: string;
  billing_uuid: string;
};

@injectable()
class EventOrderHandlers {
  constructor(
    private readonly publishMessageUseCase: PublishMessageUseCase,
    private readonly updateOrderBillingUuidUseCase: UpdateAndGetOrderUseCase
  ) {
    this.getOrderByUserUuid = this.getOrderByUserUuid.bind(this);
  }

  async getOrderByUserUuid(message: SagaMessageModel): Promise<void> {
    const requestDto = message.data as GetMyCurrentOrderRequestDto;
    if (!requestDto.order_uuid) {
      const response: SagaMessageModel = {
        uuid: message.uuid,
        success: false,
        data: null,
        datetime: new Date().getTime(),
      };

      await this.publishMessageUseCase.execute(
        response,
        OrderRoutingKey.ORDERS_RESPONSE_ORDER_UPDATE_UUID
      );
      return;
    }

    try {
      const order = await this.updateOrderBillingUuidUseCase.execute(
        requestDto.order_uuid,
        requestDto.billing_uuid
      );

      const response: SagaMessageModel = {
        uuid: message.uuid,
        success: true,
        data: order,
        datetime: new Date().getTime(),
      };

      await this.publishMessageUseCase.execute(
        response,
        OrderRoutingKey.ORDERS_RESPONSE_ORDER_UPDATE_UUID
      );
    } catch (error) {
      const response: SagaMessageModel = {
        uuid: message.uuid,
        success: false,
        data: null,
        datetime: new Date().getTime(),
      };

      await this.publishMessageUseCase.execute(
        response,
        OrderRoutingKey.ORDERS_RESPONSE_ORDER_UPDATE_UUID
      );
    }
  }
}

export default EventOrderHandlers;
