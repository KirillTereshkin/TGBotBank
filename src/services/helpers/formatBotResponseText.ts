import { BankData } from "./parseBankData";
import { parseNumberLocale } from "./parseNumberLocale";

export const formatBotResponseText = (data: BankData | null) => {
  if (!data) {
    return "Данные отсутствуют...";
  }

  return [
    `<b>${data.reportTitle}</b>`,

    "\n\n",

    "<b>706 Актив:</b>",

    "\n",

    `Начало - <u>${parseNumberLocale(
      data.activeElementsArr[0]
    )} ₽</u>, Конец - <u>${parseNumberLocale(data.activeElementsArr[1])} ₽</u>`,

    "\n\n",

    "<b>706 Пассив:</b>",

    "\n",

    `Начало - <u>${parseNumberLocale(
      data.passiveElementsArr[0]
    )} ₽</u>, Конец - <u>${parseNumberLocale(
      data.passiveElementsArr[1]
    )} ₽</u>`,

    "\n\n",

    "<b>Результат:</b> ",
    `<u>${parseNumberLocale(data.resultActiveAndPassiveCalculaation)} ₽</u>`,
  ].join("");
};
