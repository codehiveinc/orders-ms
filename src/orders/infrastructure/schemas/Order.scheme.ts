import {z} from 'zod';
import { CreateOrderItemSchema } from './OrderItem.scheme';
import { OrderStatusSchema } from './OrderStatus.scheme';

export const CreateOrderSchema = z.object({
    body: z.object({
        uuid: z.string().uuid(),
        items: z.array(CreateOrderItemSchema), 
        name: OrderStatusSchema
    }),
});


export type CreateOrderBodyType = z.infer<typeof CreateOrderSchema>["body"];