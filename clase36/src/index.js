import "dotenv/config";
import cluster from "cluster";
import os from "os";
import server from "./services/server.js";
import { initDb } from "./db/db.js";
import { infoLogger, warnLogger, errorLogger } from "./logs/index.js";

const numCPUs = os.cpus().length;

const init = async () => {
  if (cluster.isPrimary) {
    infoLogger.info(`cantidad de nucleos= ${numCPUs}`);
    infoLogger.info(`PID MASTER= ${process.pid}`);
    warnLogger.warn(`PID MASTER= ${process.pid}`);
    errorLogger.error(`PID MASTER= ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code) => {
      infoLogger.info(`Worker ${worker.process.pid} with code ${code}`);
      cluster.fork();
    });
  } else {
    await initDb();
    const port = process.env.PORT || 8080;

    server.listen(port, () =>
      infoLogger.info(
        `Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`
      )
    );

    server.on("error", (error) => {
      errorLogger.error("Catch de error en servidor!", error);
    });
  }
};

init();
