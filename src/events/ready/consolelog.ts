import chalk from "chalk";

import type { Client } from "discord.js";
import type { CommandKit } from "commandkit";

export default async function (
  c: Client<true>,
  client: Client<true>,
  handler: CommandKit
) {
  console.log(
    chalk.green.bold(`🎉 | Logged in as ${c.user.username} (${c.user.id})`)
  );
}
