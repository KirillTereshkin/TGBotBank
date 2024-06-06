import TelegramBot from "node-telegram-bot-api";

import store from "../storage";
import { botStatusOnMsg, botStatusOffMsg } from "../constants";

export const onBotStatus = (bot: TelegramBot, chatId: number) => {
  if (store.getInterval(chatId)) {
    bot.sendMessage(chatId, botStatusOnMsg);
    return;
  }

  bot.sendMessage(chatId, botStatusOffMsg);
};
