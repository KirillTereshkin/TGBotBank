import { BankData } from "../model";
import { CBR_BANKS_NAMES } from "../constants";

import { parseNumberLocale } from "./parseNumberLocale";

export const formatBotResponseText = (data: BankData | null) => {
  if (!data) {
    return "Данные отсутствуют...";
  }

  return [
    `<b>${CBR_BANKS_NAMES[data.bankName]}</b>`,

    "\n",

    `<b>${data.reportTitle}</b>`,

    "\n\n",

    "<b>706 Актив:</b>",

    "\n",

    `Начало - <u>${parseNumberLocale(
      data.activeElementsArr[0] * 1000
    )} ₽</u>, Конец - <u>${parseNumberLocale(
      data.activeElementsArr[1] * 1000
    )} ₽</u>`,

    "\n\n",

    "<b>706 Пассив:</b>",

    "\n",

    `Начало - <u>${parseNumberLocale(
      data.passiveElementsArr[0] * 1000
    )} ₽</u>, Конец - <u>${parseNumberLocale(
      data.passiveElementsArr[1] * 1000
    )} ₽</u>`,

    "\n\n",

    "<b>Результат:</b> ",
    `<u>${parseNumberLocale(
      data.resultActiveAndPassiveCalculaation * 1000
    )} ₽</u>`,
  ].join("");
};
