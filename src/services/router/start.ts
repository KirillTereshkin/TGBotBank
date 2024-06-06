import TelegramBot from "node-telegram-bot-api";

import store from "../storage";
import { parseBankData } from "../helpers/parseBankData";
import { formatBotResponseText } from "../helpers/formatBotResponseText";

export const onStart = (bot: TelegramBot, chatId: number) => {
  const intervalId = setInterval(() => {
    parseBankData().then((res) => {
      const msg = formatBotResponseText(res);

      if (store.getChatInfo(chatId) === msg) {
        return;
      }

      store.setChatInfo(chatId, msg);

      bot.sendMessage(chatId, msg, { parse_mode: "HTML" });
    });
  }, 3000);

  store.setChatIntervals(chatId, intervalId);
};
