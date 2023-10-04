import chalk from "chalk";
import { debug } from "../../../settings.json"

import type { ChatInputCommandInteraction, Client } from "discord.js";
import type { CommandKit } from "commandkit";

export default function (
  interaction: ChatInputCommandInteraction,
  client: Client<true>,
  handler: CommandKit
) {
  if (!debug) return;
  console.log(
    chalk.dim(
      `🐞 | "${interaction.user.username}" (${interaction.user.id}) has executed the command "${interaction.commandName}" in ${interaction.guild?.name}.`
    )
  );
}
