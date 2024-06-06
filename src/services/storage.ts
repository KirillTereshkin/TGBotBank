class Store {
  private chatIntervals: Record<number, NodeJS.Timeout | null> = {};

  private chatInfos: Record<number, string> = {};

  constructor() {}

  public setChatInfo = (chatId: number, info: string) => {
    this.chatInfos[chatId] = info;
  };

  public getChatInfo = (chatId: number) => this.chatInfos[chatId];

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
