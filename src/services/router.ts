import TelegramBot from "node-telegram-bot-api";

import {
  CommandsNames,
  botInfo,
  botStatusOn,
  botStatusOff,
  lastDataAbsent,
  stopBot,
} from "./constants";
import { parseBankData } from "./helpers/parseBankData";
import { getPathFromCommand } from "./helpers/getPathFromCommand";
import { formatBotResponseText } from "./helpers/formatBotResponseText";

const chatIntervals: Record<number, NodeJS.Timeout | null> = {};

const chatInfos: Record<number, string> = {};

const onStart = (bot: TelegramBot, chatId: number) => {
  chatIntervals[chatId] = setInterval(() => {
    parseBankData().then((res) => {
      const msg = formatBotResponseText(res);

      if (chatInfos[chatId] === msg) {
        return;
      }

      chatInfos[chatId] = msg;

      bot.sendMessage(chatId, formatBotResponseText(res), {
        parse_mode: "HTML",
      });
    });
  }, 3000);
};

const onHelp = (bot: TelegramBot, chatId: number) => {
  bot.sendMessage(chatId, botInfo, { parse_mode: "HTML" });
};

const onBotStatus = (bot: TelegramBot, chatId: number) => {
  if (chatIntervals[chatId]) {
    bot.sendMessage(chatId, botStatusOn);
    return;
  }

  bot.sendMessage(chatId, botStatusOff);
};

const onLastData = (bot: TelegramBot, chatId: number) => {
  if (chatInfos[chatId]) {
    bot.sendMessage(chatId, chatInfos[chatId], { parse_mode: "HTML" });
    return;
  }

  bot.sendMessage(chatId, lastDataAbsent);
};

const onStop = (bot: TelegramBot, chatId: number) => {
  bot.sendMessage(chatId, stopBot);

  const intervalId = chatIntervals[chatId];

  if (!intervalId) {
    return;
  }

  clearInterval(intervalId);
  chatIntervals[chatId] = null;
};

export const router = Object.entries({
  [getPathFromCommand(CommandsNames.start)]: onStart,

  [getPathFromCommand(CommandsNames.help)]: onHelp,

  [getPathFromCommand(CommandsNames.botStatus)]: onBotStatus,

  [getPathFromCommand(CommandsNames.lastData)]: onLastData,

  [getPathFromCommand(CommandsNames.stop)]: onStop,
});
