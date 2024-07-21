import dotenv from 'dotenv';
import { env } from 'process';
import {z} from 'zod';

dotenv.config();

export const envSchema = z.object({
  PORT: z.string().trim().min(1),
  ACCESS_TOKEN_SECRET: z.string().trim().min(1),
  RABBITMQ_HOST: z.string().trim().min(1),
  RABBITMQ_USERNAME: z.string().trim().min(1),
  RABBITMQ_PASSWORD: z.string().trim().min(1),
  SAGA_EXCHANGE_NAME: z.string().trim().min(1),
});

export const envServer = envSchema.safeParse({
  PORT: env.PORT,
  ACCESS_TOKEN_SECRET: env.ACCESS_TOKEN_SECRET,
  RABBITMQ_HOST: env.RABBITMQ_HOST,
  RABBITMQ_USERNAME: env.RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD: env.RABBITMQ_PASSWORD,
  SAGA_EXCHANGE_NAME: env.SAGA_EXCHANGE_NAME,
});

envSchema.parse(env);

if (!envServer.success) {
  console.error(envServer.error.issues);
  throw new Error("Invalid environment variables");
}

export const envVariables = envServer.data;