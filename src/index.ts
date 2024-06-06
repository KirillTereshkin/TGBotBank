import TelegramBot from "node-telegram-bot-api";

import { router } from "./services/router";
import { TOKEN, commands } from "./services/constants";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands(commands);

bot.on("text", async (msg) => {
  const cb = router.find(([command]) => msg.text?.startsWith(command))?.[1];

  if (!cb) {
    return;
  }

  cb(bot, msg.chat.id);
});
