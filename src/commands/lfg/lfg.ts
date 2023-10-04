import { ApplicationCommandOptionType } from "discord.js";

import { userPreferences, ver } from "../../../settings.json";

import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";

export const data: CommandData = {
  name: "lfg",
  description:
    "Commands related to LFG.",
  options: [
    {
      name: "code",
      description: "The code to evaluate.",
      type: ApplicationCommandOptionType.Subcommand,
      required: true,
    },
  ],
};

export const options: CommandOptions = {
  devOnly: true,
  guildOnly: true,
  userPermissions: [],
  botPermissions: [],
  deleted: true,
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
