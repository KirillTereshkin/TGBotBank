import { Banks, CommandsNames } from "./model";

export const TOKEN = "7087024188:AAE4Eoun41NZ5lH7lqKTODBJlqDJBWmyOJE";

export const BANK_REF = "https://www.cbr.ru/banking_sector/credit/coinfo/";

export const BANKS_REF: Record<Banks, string> = {
  [Banks.tinkoff]:
    "https://www.cbr.ru/banking_sector/credit/coinfo/?id=450000562",
  [Banks.rossbank]:
    "https://www.cbr.ru/banking_sector/credit/coinfo/?id=450000347",
  [Banks.sovcombank]:
    "https://cbr.ru/finorg/foinfo/reports/?ogrn=1144400000425",
  [Banks.bsp]: "https://www.cbr.ru/banking_sector/credit/coinfo/?id=400000031",
};

export const commands = [
  {
    command: CommandsNames.start,
    description: "Запуск бота",
  },

  {
    command: CommandsNames.help,
    description: "Информация о боте",
  },

  {
    command: CommandsNames.botStatus,
    description: "Проверка статуса работы",
  },

  {
    command: CommandsNames.lastData,
    description: "Последние данные",
  },

  {
    command: CommandsNames.stop,
    description: "Остановить бота",
  },
];

export const botInfoMsg = [
  "<b>Информация о боте:</b>",
  "Данный бот пингует каждые 30 секунд сайт банка россии, и проверяет данные по 706 строке.",
  "Бот пришлет новое сообщение как только появится свежий отчет.",
  "<a href='https://github.com/KirillTereshkin/TGBotBank'>Ссылка</a> на github.",
  "<a href='https://cloud.ru/ru'>Ссылка</a> на хостинг",
].join("\n");

export const botStatusOnMsg = "Бот запущен, проверка данных по 706 проводится";

export const botStatusOffMsg =
  "Бот выключен, проверка данных по 706 непроводится";

export const lastDataAbsentMsg =
  "Последние данные отсутсвуют, запустите бот для для получения данных для анализа";

export const stopBotMsg = "Бот выключен";
