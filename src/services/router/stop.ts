import TelegramBot from "node-telegram-bot-api";

import store from "../storage";
import { stopBotMsg } from "../constants";

export const onStop = (bot: TelegramBot, chatId: number) => {
  bot.sendMessage(chatId, stopBotMsg);

  store.clearChatIntervals(chatId);
};
