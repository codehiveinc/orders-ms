import { z } from "zod";
import StatusEnum from "../../domain/enums/status.enum";

export const CreateOrderSchema = z.object({
  body: z.object({
    userUuid: z
      .string({ required_error: "UserUuid is required" })
      .uuid("Invalid uuid"),
  }),
});

export type CreateOrderBodyType = z.infer<typeof CreateOrderSchema>["body"];

export const UpdateOrderStatusSchema = z.object({
  params: z.object({
    uuid: z.string({ required_error: "Uuid is required" }).uuid("Invalid uuid"),
  }),
  body: z.object({
    status: z.nativeEnum(StatusEnum, {
      required_error: "Status is required",
    }),
  }),
});

export type UpdateOrderStatusBodyType = z.infer<
  typeof UpdateOrderStatusSchema
>["body"];

export type UpdateOrderStatusParamsType = z.infer<
  typeof UpdateOrderStatusSchema
>["params"];

export const GetMyCurrentOrderSchema = z.object({
  params: z.object({
    userUuid: z.string({ required_error: "Uuid is required" }).uuid("Invalid uuid"),
  }),
});

export type GetMyCurrentOrderParamsType = z.infer<typeof GetMyCurrentOrderSchema>["params"];
