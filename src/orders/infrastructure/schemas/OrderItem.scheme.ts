import {z} from 'zod';


export const CreateOrderItemSchema = z.object({
    body: z.object({
        uuid: z.string().uuid(),
        quantity: z.number()
    }),
})

export type CreateOrderItemBodyType = z.infer<typeof CreateOrderItemSchema>["body"];