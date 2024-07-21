import { z } from 'zod';


export const OrderStatusSchema = z.object({
    uuid: z.string().uuid(),
    status: z.string({required_error:"Status is requiered"}),
});


export type OrderStatus = z.infer<typeof OrderStatusSchema>;