import {
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonStyle,
  TextChannel,
  ComponentType,
  APIActionRowComponent,
  APIMessageActionRowComponent,
} from "discord.js";

import { userPreferences } from "../../../settings.json";

import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";

export const data: CommandData = {
  name: "lfg",
  description: "Commands related to LFG.",
  options: [
    {
      name: "set",
      description: "Set the channel where people will sign up for LFG.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "channel",
          description: "The channel to send the message to.",
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
      ],
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

  const command = interaction.options.getSubcommand(true);
  const args = interaction.options.getChannel("channel") as TextChannel;

  const lfgRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--register",
        label: "Register",
        style: ButtonStyle.Primary,
        type: ComponentType.Button,
        emoji: {
          id: "1155486112916181042"
        }
      },
    ],
  }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  switch (command) {
    case "set":
      await interaction.editReply({
        embeds: [
          {
            color: parseInt(userPreferences.embedSettings.color),
            title: "Channel Set",
            author: {
              name: interaction.user.username,
              icon_url: interaction.user.displayAvatarURL(),
            },
            description: `
        The LFG channel is now <#${args.id}>
        `,
            timestamp: new Date().toISOString(),
            footer: {
              text: userPreferences.embedSettings.footer,
              icon_url: interaction.guild?.iconURL() || undefined,
            },
          },
        ],
      });
      await args.send({
        embeds: [
          {
            color: parseInt(userPreferences.embedSettings.color),
            title: "Title",
            author: {
              name: "Overwatch 2",
              icon_url: "",
            },
            description: `
    Description
    `,
            timestamp: new Date().toISOString(),
            footer: {
              text: userPreferences.embedSettings.footer,
              icon_url: interaction.guild?.iconURL() || undefined,
            },
          },
        ],
        components: [lfgRow],
      });
      break;
  }
}
