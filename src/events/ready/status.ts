import chalk from "chalk";

import { debug } from "../../../settings.json";

import { ActivityType, type Client } from "discord.js";
import type { CommandKit } from "commandkit";

export default function (
  c: Client<true>,
  client: Client<true>,
  handler: CommandKit
) {
  if (!debug) return true;
  c.user.setActivity("Overwatch 2.", {
    type: ActivityType.Streaming,
    url: "https://www.twitch.tv/directory/category/overwatch-2",
  });
  console.log(chalk.yellow.dim.bold(`💡 | Set status to ${c.user.presence.activities}`));
}
