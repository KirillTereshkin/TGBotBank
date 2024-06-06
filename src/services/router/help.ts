import TelegramBot from "node-telegram-bot-api";

import { botInfoMsg } from "../constants";

export const onHelp = (bot: TelegramBot, chatId: number) => {
  bot.sendMessage(chatId, botInfoMsg, { parse_mode: "HTML" });
};
