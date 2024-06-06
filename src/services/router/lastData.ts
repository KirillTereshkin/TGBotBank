import TelegramBot from "node-telegram-bot-api";

import store from "../storage";
import { lastDataAbsentMsg } from "../constants";

export const onLastData = (bot: TelegramBot, chatId: number) => {
  const chatInfo = store.getAllChatInfo(chatId);

  if (chatInfo) {
    Object.values(chatInfo).forEach((itm) => {
      bot.sendMessage(chatId, itm, { parse_mode: "HTML" });
    });
    return;
  }

  bot.sendMessage(chatId, lastDataAbsentMsg);
};
