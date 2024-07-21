import { singleton } from "tsyringe";
import IOrderItemRepository from "../../../application/ports/repositories/order-item.repository.interface";
import OrderItemModel from "../../../domain/models/order-item.model";
import { prisma } from "../../../../shared/infrastructure/prisma";

@singleton()
class OrderItemRepository implements IOrderItemRepository {
  async save(orderItemModel: OrderItemModel): Promise<OrderItemModel> {
    const orderItemCreated = await prisma.orderItem.create({
      data: {
        uuid: orderItemModel.uuid,
        quantity: orderItemModel.quantity,
        mealUuid: orderItemModel.mealUuid,
        mealPrice: orderItemModel.mealPrice,
        order: {
          connect: {
            id: orderItemModel.orderId,
          },
        },
      },
    });

    return new OrderItemModel(
      orderItemCreated.id,
      orderItemCreated.uuid,
      orderItemCreated.mealUuid,
      orderItemCreated.mealPrice,
      orderItemCreated.orderId,
      orderItemCreated.quantity
    );
  }

  async updateQuantity(
    uuid: string,
    quantity: number
  ): Promise<OrderItemModel | null> {
    try {
      const orderItemUpdated = await prisma.orderItem.update({
        where: {
          uuid,
        },
        data: {
          quantity,
        },
      });

      return new OrderItemModel(
        orderItemUpdated.id,
        orderItemUpdated.uuid,
        orderItemUpdated.mealUuid,
        orderItemUpdated.mealPrice,
        orderItemUpdated.orderId,
        orderItemUpdated.quantity
      );
    } catch (error) {
      return null;
    }
  }

  async delete(uuid: string): Promise<boolean> {
    try {
      await prisma.orderItem.delete({
        where: {
          uuid,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default OrderItemRepository;
