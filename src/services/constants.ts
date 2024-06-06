import { Banks, CommandsNames } from "./model";

export const PING_TIME = 30 * 1000;

export const TOKEN = "7087024188:AAE4Eoun41NZ5lH7lqKTODBJlqDJBWmyOJE";

export const CBR_COIN_INFO = "https://www.cbr.ru/banking_sector/credit/coinfo/";

export const CBR_BANKS_REF = {
  [Banks.tbank]: {
    url: CBR_COIN_INFO,
    postfix: "?id=450000562",
  },

  [Banks.rossbank]: {
    url: CBR_COIN_INFO,
    postfix: "?id=450000347",
  },

  [Banks.sovcombank]: {
    url: "https://cbr.ru/finorg/foinfo/reports/",
    postfix: "?ogrn=1144400000425",
  },

  [Banks.bsp]: {
    url: CBR_COIN_INFO,
    postfix: "?id=400000031",
  },
};

export const CBR_BANKS_NAMES = {
  [Banks.tbank]: "Т-Банк",

  [Banks.rossbank]: "РоссБанк",

  [Banks.sovcombank]: "СовКомБанк",

  [Banks.bsp]: "БСП",
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

export const botAlreadyStartedMsg = "Бот уже запущен, высылаю последние данные";

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
