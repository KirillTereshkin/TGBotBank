export enum CommandsNames {
  start = "start",
  help = "help",
  botStatus = "bot_status",
  lastData = "last_data",
  stop = "stop",
}

export enum Banks {
  tbank = "tbank",
  rossbank = "rossbank",
  sovcombank = "sovcombank",
  bsp = "bsp",
}

export type BankData = {
  bankName: Banks;
  reportTitle: string;
  activeElementsArr: number[];
  passiveElementsArr: number[];
  resultActiveAndPassiveCalculaation: number;
};
