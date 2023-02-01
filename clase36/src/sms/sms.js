import twilio from "twilio";
import dotenv from "dotenv";
import { infoLogger, warnLogger, errorLogger } from "../logs/index.js";
dotenv.config();

const twilioClient = twilio(process.env.SID, process.env.TOKEN);

export const sendSms = async (phone) => {
  try {
    console.log(phone);
    const message = {
      body: "Pedido recibido!",
      from: process.env.SMS,
      to: phone,
    };
    const response = await twilioClient.messages.create(message);
    infoLogger.info(response);
    warnLogger.warn(response);
  } catch (error) {
    errorLogger.warn(error);
  }
};
