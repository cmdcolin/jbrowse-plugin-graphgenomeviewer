import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { execa } from "execa";

const app = new Hono();

let i = 0;

app.use("/*", cors());
app.get("/", async (c) => {
  const { graph, chr, start, end } = c.req.query();
  if (graph) {
    // investigate piping direct to stream
    const label = "vg-" + i++;
    console.time(label);
    console.log(
      `./vg chunk --xg-name ${graph} -O gfa -c 1 --threads 8 --path ${chr}:${start}-${end}`,
    );
    const { stdout } =
      await execa`./vg chunk --xg-name ${graph} -O gfa -c 1 --threads 8 --path ${chr}:${start}-${end}`;

    console.timeEnd(label);
    return c.text(stdout);
  } else {
    throw new Error("No params");
  }
});
app.get("/search", (c) => {
  return c.text("hello");
});
const port = process.env.PORT ? +process.env.PORT : 3003;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
