export const TOKEN = "7087024188:AAE4Eoun41NZ5lH7lqKTODBJlqDJBWmyOJE";

export const BANK_REF = "https://www.cbr.ru/banking_sector/credit/coinfo/";

export enum CommandsNames {
  start = "start",
  help = "help",
  botStatus = "bot_status",
  lastData = "last_data",
  stop = "stop",
}

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

export const botInfo = [
  "<b>Информация о боте:</b>",
  "\n\n",
  "Данный бот пингует каждые 30 секунд сайт банка россии, и проверяет данные по 706 строке.",
  "Бот пришлет новое сообщение как только появится свежий отчет.",
].join("");

export const botStatusOn = "Бот запущен, проверка данных по 706 проводится";

export const botStatusOff = "Бот выключен, проверка данных по 706 непроводится";

export const lastDataAbsent =
  "Последние данные отсутсвуют, запустите бот для для получения данных для анализа";

export const stopBot = "Бот выключен";
