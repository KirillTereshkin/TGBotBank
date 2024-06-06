import { Banks } from "./model";

class Store {
  private chatIntervals: Record<number, NodeJS.Timeout | null> = {};

  private chatInfos: Record<number, Record<Banks, string>> = {};

  constructor() {}

  public setChatInfo = (chatId: number, bankName: Banks, info: string) => {
    this.chatInfos = {
      ...this.chatInfos,
      [chatId]: { ...this.chatInfos[chatId], [bankName]: info },
    };
  };

  public getAllChatInfo = (chatId: number) => this.chatInfos[chatId];

  public getChatInfo = (chatId: number, bankName: Banks) =>
    this.chatInfos[chatId]?.[bankName];

  public setChatIntervals = (chatId: number, intervalId: NodeJS.Timeout) => {
    this.chatIntervals[chatId] = intervalId;
  };

  public clearChatIntervals = (chatId: number) => {
    const intervalId = this.chatIntervals[chatId];

    if (!intervalId) {
      return;
    }

    clearInterval(intervalId);
    this.chatIntervals[chatId] = null;
  };

  public getInterval = (chatId: number) => this.chatIntervals[chatId];
}

const store = new Store();

export default store;
