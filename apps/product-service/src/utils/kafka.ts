import { createConsumer, createKafkaClient, createProducer, createAdmin } from "@repo/kafka";

const kafkaClient = createKafkaClient("product-service");

export const producer = createProducer(kafkaClient);
export const consumer = createConsumer(kafkaClient, "product-group");

export const createTopics = async () => {
  const admin = createAdmin(kafkaClient);
  try {
    await admin.connect();
    const existing = await admin.listTopics();
    console.log("✓ Kafka topics available:", existing);
    await admin.disconnect();
  } catch (err: any) {
    console.error("Kafka admin check failed:", err?.message);
    await admin.disconnect().catch(() => {});
  }
};