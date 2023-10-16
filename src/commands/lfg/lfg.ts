import {
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonStyle,
  TextChannel,
  ComponentType,
  APIActionRowComponent,
  APIMessageActionRowComponent,
} from "discord.js";

import fs from "fs"

import settings, { userPreferences } from "../../../settings.json";

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
      description: "Change settings.",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "channel",
          description: "Change the LFG channel.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "value",
              description: "The channel to send the message to.",
              type: ApplicationCommandOptionType.Channel,
              required: true,
            },
          ],
        },
        {
          name: "apps",
          description: "Change the review channel.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "value",
              description: "The review channel.",
              type: ApplicationCommandOptionType.Channel,
              required: true,
            },
          ],
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
  deleted: false
};

export async function run({ interaction, client, handler }: SlashCommandProps) {
  await interaction.deferReply();

  const command = interaction.options.getSubcommand(true);
  const args = interaction.options.getChannel("value") as TextChannel;

  const lfgRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--comp",
        label: "Competitive",
        style: ButtonStyle.Secondary,
        type: ComponentType.Button,
        emoji: {
          id: "1162385762705227876",
        },
      },
      {
        custom_id: "lfg--qp",
        label: "Quick-Play",
        style: ButtonStyle.Secondary,
        type: ComponentType.Button,
        emoji: {
          id: "1162385750336229396",
        },
      },
    ],
  }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  switch (command) {
    case "channel":
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
    case "apps":
      userPreferences.channels.lfgApps = args.id;
      fs.writeFile("./settings.json", JSON.stringify(settings, null, 2), () => {
        (err: unknown) => {
          if (err) console.log(err);
        };
      });
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
        The LFG review channel is now <#${args.id}>
        `,
            timestamp: new Date().toISOString(),
            footer: {
              text: userPreferences.embedSettings.footer,
              icon_url: interaction.guild?.iconURL() || undefined,
            },
          },
        ],
      });
      break;
  }
}
