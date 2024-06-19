import TelegramBot from "node-telegram-bot-api";

import store from "../storage";
import { onLastData } from "./lastData";
import { PING_TIME, botAlreadyStartedMsg } from "../constants";
import { parseCbrBanksData } from "../helpers/parsers/parseCbrBanks";
import { formatBotResponseText } from "../helpers/formatBotResponseText";

const pingBanks = async (bot: TelegramBot, chatId: number) => {
  const data = await parseCbrBanksData();

  data?.forEach((itm) => {
    const msg = formatBotResponseText(itm);

    if (store.getChatInfo(chatId, itm.bankName) === msg) {
      return;
    }

    store.setChatInfo(chatId, itm.bankName, msg);
    bot.sendMessage(chatId, msg, { parse_mode: "HTML" });
  });
};

export const onStart = async (bot: TelegramBot, chatId: number) => {
  const existingIntervalId = store.getInterval(chatId);

  if (existingIntervalId) {
    bot.sendMessage(chatId, botAlreadyStartedMsg);
    onLastData(bot, chatId);
    return;
  }

  pingBanks(bot, chatId);
  const intervalId = setInterval(() => {
    pingBanks(bot, chatId);
  }, PING_TIME);

  store.setChatIntervals(chatId, intervalId);
};
