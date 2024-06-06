export enum CommandsNames {
  start = "start",
  help = "help",
  botStatus = "bot_status",
  lastData = "last_data",
  stop = "stop",
}

export enum Banks {
  tinkoff = "tinkoff",
  rossbank = "rossbank",
  sovcombank = "sovcombank",
  bsp = "bsp",
}

export type BankData = {
  reportTitle: string;
  activeElementsArr: number[];
  passiveElementsArr: number[];
  resultActiveAndPassiveCalculaation: number;
};
