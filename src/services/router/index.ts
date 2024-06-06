import { onHelp } from "./help";
import { onStop } from "./stop";
import { onStart } from "./start";
import { onLastData } from "./lastData";
import { CommandsNames } from "../model";
import { onBotStatus } from "./botStatus";
import { getPathFromCommand } from "../helpers/getPathFromCommand";

const routerObj = {
  [getPathFromCommand(CommandsNames.start)]: onStart,

  [getPathFromCommand(CommandsNames.help)]: onHelp,

  [getPathFromCommand(CommandsNames.botStatus)]: onBotStatus,

  [getPathFromCommand(CommandsNames.lastData)]: onLastData,

  [getPathFromCommand(CommandsNames.stop)]: onStop,
};

export const router = Object.entries(routerObj);
