import { ApplicationCommandOptionType } from "discord.js";
import fs from "fs";

import { userPreferences } from "../../../settings.json";

import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";

export const data: CommandData = {
  name: "eval",
  description:
    "Evaluate a string of code. This could be destructive. (Dev Only)",
  options: [
    {
      name: "code",
      description: "The code to evaluate.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};

export const options: CommandOptions = {
  devOnly: true,
  guildOnly: true,
  userPermissions: [],
  botPermissions: [],
  deleted: false,
};

export async function run({ interaction, client, handler }: SlashCommandProps) {
  await interaction.deferReply();

  await interaction.editReply({
    embeds: [
      {
        color: parseInt(userPreferences.embedSettings.color),
        title: "Code Evaluated",
        author: {
          name: interaction.user.username,
          icon_url: interaction.user.displayAvatarURL(),
        },
        description: `
    Output: 
    \`\`\`${eval(
      interaction.options.getString("code") || '"Nothing to evaluate." '
    )}\`\`\`
    `,
        timestamp: new Date().toISOString(),
        footer: {
          text: userPreferences.embedSettings.footer,
          icon_url: interaction.guild?.iconURL() || undefined,
        },
      },
    ],
  });
}
