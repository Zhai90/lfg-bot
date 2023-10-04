import chalk from "chalk";

import { debug } from "../../../settings.json";

import type { Client } from "discord.js";
import type { CommandKit } from "commandkit";

export default function (
  c: Client<true>,
  client: Client<true>,
  handler: CommandKit
) {
  
  console.log(
    chalk.yellow.dim.bold(`💡 | Set status to tbd`)
  );
}
