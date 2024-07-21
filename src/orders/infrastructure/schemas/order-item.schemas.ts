import { z } from "zod";

export const CreateOrderItemSchema = z.object({
  body: z.object({
    orderId: z
      .number({ required_error: "order_id is required" })
      .int({ message: "order_id must be an integer" })
      .positive({ message: "order_id must be a positive number" }),
    mealUuid: z
      .string({ required_error: "meal_uuid is required" })
      .uuid({ message: "meal_uuid must be a valid UUID" }),
    mealPrice: z
      .number({ required_error: "meal_price is required" })
      .int({ message: "meal_price must be an integer" })
      .positive({ message: "meal_price must be a positive number" }),
    quantity: z
      .number({ required_error: "quantity is required" })
      .int({ message: "quantity must be an integer" })
      .positive({ message: "quantity must be a positive number" }),
  }),
});

export type CreateOrderItemBodyType = z.infer<
  typeof CreateOrderItemSchema
>["body"];

export const UpdateOrderItemQuantitySchema = z.object({
  body: z.object({
    quantity: z
      .number({ required_error: "quantity is required" })
      .int({ message: "quantity must be an integer" })
      .positive({ message: "quantity must be a positive number" }),
  }),
});

export type UpdateOrderItemQuantityBodyType = z.infer<
  typeof UpdateOrderItemQuantitySchema
>["body"];

export const DeleteOrderItemSchema = z.object({
  params: z.object({
    uuid: z
      .string({ required_error: "uuid is required" })
      .uuid({ message: "uuid must be a valid UUID" }),
  }),
});

export type DeleteOrderItemParamsType = z.infer<
  typeof DeleteOrderItemSchema
>["params"];
