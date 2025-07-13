import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import {
  createRoomQuestionsRoute,
} from "./routes/createRoomQuestions.ts";
import { createRoomsRoute } from "./routes/createRooms.ts";
import { getRoomQuestionsRoute } from "./routes/getRoomQuestions.ts";
import { getRoomsRoute } from "./routes/getRooms.ts";
import { uploadAudioRoute } from "./routes/uploadAudio.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/health", () => {
  return "OK";
});

app.register(fastifyMultipart);
app.register(getRoomsRoute);
app.register(createRoomsRoute);
app.register(getRoomQuestionsRoute);
app.register(createRoomQuestionsRoute);
app.register(uploadAudioRoute);

app.listen({ port: env.PORT });
