// import { Kafka } from "kafkajs";

// export const createKafkaClient = (service: string) => {
//   return new Kafka({
//     clientId: service,
//     brokers: ["localhost:9094", "localhost:9095", "localhost:9096"],
//   });
// };


import { Kafka, logLevel } from "kafkajs";
import * as fs from "fs";
import * as path from "path";

export const createKafkaClient = (service: string) => {
  const brokers = process.env.KAFKA_BROKERS;
  const username = process.env.KAFKA_USERNAME;
  const password = process.env.KAFKA_PASSWORD;

  if (!brokers) throw new Error(`[${service}] KAFKA_BROKERS is not set`);
  if (!username) throw new Error(`[${service}] KAFKA_USERNAME is not set`);
  if (!password) throw new Error(`[${service}] KAFKA_PASSWORD is not set`);

return new Kafka({
  clientId: service,
  brokers: brokers.split(","),
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.KAFKA_CA_CERT
      ? [Buffer.from(process.env.KAFKA_CA_CERT, "base64").toString("utf-8")]
      : undefined,
  },
  sasl: {
    mechanism: "plain",
    username,
    password,
  },
  logLevel: logLevel.ERROR,
});
};