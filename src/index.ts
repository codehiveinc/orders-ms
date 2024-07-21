import "reflect-metadata";
import "./env";
import express, { Request, Response } from "express";
import morganMiddleware from "./shared/infrastructure/middlewares/morgan.middleware";
import camelCaseMiddleware from "./shared/infrastructure/middlewares/camel-case.middleware";
import snakeCaseMiddleware from "./shared/infrastructure/middlewares/snake-case.middleware";
import { container } from "tsyringe";
import MessageBrokerRepository from "./shared/infrastructure/adapters/repositories/message-broker.repository";
import OrderRepository from "./orders/infrastructure/adapters/repositories/order.repository";
import OrderRouter from "./orders/infrastructure/routers/order.router";
import OrderItemRepository from "./orders/infrastructure/adapters/repositories/order-item.repository";
import OrderItemRouter from "./orders/infrastructure/routers/order-item.router";
import OrderEvents from "./orders/infrastructure/events/order.events";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.use(camelCaseMiddleware);
app.use(snakeCaseMiddleware);

container.register("OrderRepository", OrderRepository);
container.register("OrderItemRepository", OrderItemRepository);
container.register("MessageBrokerRepository", MessageBrokerRepository);

const orderRouter = container.resolve(OrderRouter);
const orderItemRouter = container.resolve(OrderItemRouter);
const orderEvents = container.resolve(OrderEvents);

app.use("/api/v1/orders", orderRouter.getRouter());
app.use("/api/v1/order-items", orderItemRouter.getRouter());

orderEvents.initializeEvents();

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Everything is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
