import { MessagesModel } from "../models/messages.js";
import { normalize, denormalize, schema } from "normalizr";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const author = new schema.Entity("author", {}, { idAttribute: "id" });

const msg = new schema.Entity(
  "message",
  {
    author: author,
  },
  { idAttribute: "_id" }
);

const msgsSchema = new schema.Array(msg);

export const AllMessages = async (req, res) => {
  try {
    const Messages = await MessagesModel.find().lean();

    if (!Messages) {
      return res.status(400).json({
        mensaje: "No hay mensajes para mostrar",
      });
    } else {
      return res.status(200).json({
        data: Messages,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const NormalizedMessages = async (req, res) => {
  try {
    const normalizedMessagesPath = path.join(
      __dirname,
      "../../mensajesNormalizados.json"
    );
    const messagesOriginalData = await MessagesModel.find().lean();
    let normalizedMessagesData = normalize(messagesOriginalData, msgsSchema);
    let normalizedMessagesToJson = JSON.stringify(
      normalizedMessagesData,
      null,
      "\t"
    );
    fs.writeFileSync(normalizedMessagesPath, normalizedMessagesToJson);

    return res.status(200).json({
      data: normalizedMessagesData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const DenormalizedMessages = async (req, res) => {
  try {
    const normalizedMessagesPath = path.join(
      __dirname,
      "../../mensajesNormalizados.json"
    );

    const normalizedMessagesData = JSON.parse(
      fs.readFileSync(normalizedMessagesPath)
    );

    const denormalizedMessagesData = denormalize(
      normalizedMessagesData.result,
      msgsSchema,
      normalizedMessagesData.entities
    );

    return res.status(200).json({
      data: denormalizedMessagesData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
