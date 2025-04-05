const express = require("express");
const data = require("./data.ts");
const pino = require("pino");
const logger = require("pino-http")();
const app = express();

const log = pino();

app.use(logger);

app.get("/api/info", async (_req, res) => {
  try {
    const info = await data.info[0];
    if (info.length > 0) {
      log.info("Fetched all info successfully");
      return res.status(200).json(info);
    } else {
      log.warn("No info found");
      return res.status(204).end();
    }
  } catch (err) {
    log.error({ err }, "Error fetching all info");
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/info/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const info = await data.info[0].find((item) => item.id === id);
    if (info) {
      log.info({ id }, "Fetched info by ID successfully");
      return res.status(200).json(info);
    } else {
      log.warn({ id }, "Info not found by ID");
      return res.status(204).end();
    }
  } catch (err) {
    log.error({ err, id: req.params.id }, "Error fetching info by ID");
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5000, () => {
  log.info("Server is running on port 5000");
});
