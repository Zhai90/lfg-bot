import {
  ActionRowBuilder,
  ComponentType,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputStyle,
} from "discord.js";

import { userPreferences } from "./../../../settings.json";

import type {
  APIActionRowComponent,
  ButtonInteraction,
  Client,
  APIMessageActionRowComponent,
} from "discord.js";
import type { CommandKit } from "commandkit";

export default async function (
  interaction: ButtonInteraction,
  client: Client<true>,
  handler: CommandKit
) {
  if (interaction.customId != "lfg--comp") return;
  await interaction.reply({
    embeds: [
      {
        color: parseInt(userPreferences.embedSettings.errorColor),
        title: "Cannot Register",
        author: {
          name: interaction.user.username,
          icon_url: interaction.user.displayAvatarURL(),
        },
        description: `
  Please run the /verify command in order to register for competitive LFG.
  `,
        timestamp: new Date().toISOString(),
        footer: {
          text: userPreferences.embedSettings.footer,
          icon_url: interaction.guild?.iconURL() || undefined,
        },
      },
    ],
    ephemeral: true,
  });

  return;
}
