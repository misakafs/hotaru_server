import { Hono } from "hono";
import { cors } from "hono/cors";
import Webhook from "./service/webhook.ts";
import config from "./service/config.ts";


const app = new Hono();

app.use("/*", cors());

app.post("/api/webhook", async (c) => {
  const ok = await Webhook();
  return c.text(`${ok}`);
});

app.post("/api/config", async (c) => {
  const cfg = await config();
  if (cfg) {
    return c.json(cfg);
  }
  const ok = await Webhook();
  if (ok) {
    const cfg = await config();
    if (cfg) {
      return c.json(cfg);
    }
  }
  return c.json({});
});

app.all("/", (c) => {
  return c.text("一切安好~");
});

Deno.serve(app.fetch);
