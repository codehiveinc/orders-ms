import { Status } from "@prisma/client";
import { prisma } from "../../../../shared/infrastructure/prisma";
import IOrderRepository from "../../../application/ports/repositories/order.repository.interface";
import StatusEnum from "../../../domain/enums/status.enum";
import OrderModel from "../../../domain/models/order.model";
import { singleton } from "tsyringe";

@singleton()
class OrderRepository implements IOrderRepository {
  async save(order: OrderModel): Promise<OrderModel> {
    const orderCreated = await prisma.order.create({
      data: {
        uuid: order.uuid,
        status: this.convertStatus(order.status),
        userUuid: order.userUuid,
        totalAmount: order.totalAmount,
      },
    });

    return new OrderModel(
      orderCreated.id,
      orderCreated.uuid,
      [],
      this.convertStatusToEnum(orderCreated.status),
      orderCreated.userUuid,
      orderCreated.billingUuid,
      orderCreated.totalAmount,
      orderCreated.createdAt,
      orderCreated.updatedAt
    );
  }

  async updateOrderStatus(
    uuid: string,
    status: StatusEnum
  ): Promise<OrderModel | null> {
    try {
      const orderUpdated = await prisma.order.update({
        where: {
          uuid,
        },
        data: {
          status: this.convertStatus(status),
        },
      });

      return new OrderModel(
        orderUpdated.id,
        orderUpdated.uuid,
        [],
        this.convertStatusToEnum(orderUpdated.status),
        orderUpdated.userUuid,
        orderUpdated.billingUuid,
        orderUpdated.totalAmount,
        orderUpdated.createdAt,
        orderUpdated.updatedAt
      );
    } catch (error) {
      return null;
    }
  }

  async getMyCurrentOrder(userUuid: string): Promise<OrderModel | null> {
    const order = await prisma.order.findFirst({
      where: {
        userUuid,
        status: {
          not: Status.delivered,
        },
      },
    });

    if (!order) {
      return null;
    }

    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: order.id,
      },
    });

    const totalAmount = orderItems.reduce(
      (acc, orderItem) => acc + orderItem.quantity * orderItem.mealPrice,
      0
    );

    const orderUpdated = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        totalAmount,
      },
    });

    return new OrderModel(
      orderUpdated.id,
      orderUpdated.uuid,
      [],
      this.convertStatusToEnum(orderUpdated.status),
      orderUpdated.userUuid,
      orderUpdated.billingUuid,
      orderUpdated.totalAmount,
      orderUpdated.createdAt,
      orderUpdated.updatedAt
    );
  }

  async updateBillingUuid(uuid: string, billingUuid: string): Promise<OrderModel | null> {
    try {
      const order = await prisma.order.update({
        where: {
          uuid,
        },
        data: {
          billingUuid,
        },
      });

      const orderItems = await prisma.orderItem.findMany({
        where: {
          orderId: order.id,
        },
      });

      const totalAmount = orderItems.reduce(
        (acc, orderItem) => acc + orderItem.quantity * orderItem.mealPrice,
        0
      );

      const orderUpdated = await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          totalAmount,
        },
      });

      return new OrderModel(
        orderUpdated.id,
        orderUpdated.uuid,
        [],
        this.convertStatusToEnum(orderUpdated.status),
        orderUpdated.userUuid,
        orderUpdated.billingUuid,
        orderUpdated.totalAmount,
        orderUpdated.createdAt,
        orderUpdated.updatedAt
      );
    } catch (error) {
      return null;
    }
  }

  private convertStatus(status: StatusEnum): Status {
    switch (status) {
      case StatusEnum.pending:
        return Status.pending;
      case StatusEnum.preparing:
        return Status.preparing;
      case StatusEnum.delivered:
        return Status.delivered;
      case StatusEnum.canceled:
        return Status.canceled;
      default:
        throw new Error("Invalid status");
    }
  }

  private convertStatusToEnum(status: Status): StatusEnum {
    switch (status) {
      case Status.pending:
        return StatusEnum.pending;
      case Status.preparing:
        return StatusEnum.preparing;
      case Status.delivered:
        return StatusEnum.delivered;
      case Status.canceled:
        return StatusEnum.canceled;
      default:
        throw new Error("Invalid status");
    }
  }
}

export default OrderRepository;
