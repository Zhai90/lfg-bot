import { ApplicationCommandOptionType } from "discord.js";
import fs from "fs";

import settings, { userPreferences, ver } from "../../../settings.json";

import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";

export const data: CommandData = {
  name: "botset",
  description: "Change the bot settings (Dev Only).",
  options: [
    {
      name: "version",
      description: "The version of the current build.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "value",
          description: "Example: v0.3.4-beta",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "embed",
      description:
        "Change the embed color and footer. (Only in certain commands)",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "color",
          description: "Change the color of the embed.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "value",
              description:
                "Only accepts hexadecimal values without pound sign (#). Example: 0fcdef",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
        {
          name: "footer",
          description: "Change the footer of the embed.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "value",
              description: "Max. 2048 chars..",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "view",
      description: "View all non-secret settings.",
      type: ApplicationCommandOptionType.Subcommand,
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
  const args = interaction.options.getString("value");

  switch (command) {
    case "version":
      settings.ver = `${args}` || "";
      fs.writeFile("./settings.json", JSON.stringify(settings, null, 2), () => {
        (err: unknown) => {
          if (err) console.log(err);
        };
      });
      await interaction.editReply({
        embeds: [
          {
            color: parseInt(userPreferences.embedSettings.color),
            title: "Current Version Updated",
            author: {
              name: interaction.user.username,
              icon_url: interaction.user.displayAvatarURL(),
            },
            description: `
    Changed current version number to:
    \`\`\`${args}\`\`\`
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
    case "color":
      settings.userPreferences.embedSettings.color = `0x${args}` || "";
      fs.writeFile("./settings.json", JSON.stringify(settings, null, 2), () => {
        (err: unknown) => {
          if (err) console.log(err);
        };
      });
      await interaction.editReply({
        embeds: [
          {
            color: parseInt(userPreferences.embedSettings.color),
            title: "Color Updated",
            author: {
              name: interaction.user.username,
              icon_url: interaction.user.displayAvatarURL(),
            },
            description: `
    Changed embed color hex to:
    \`\`\`#${args}\`\`\`
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
    case "footer":
      settings.userPreferences.embedSettings.footer = args || "";
      fs.writeFile("./settings.json", JSON.stringify(settings, null, 2), () => {
        (err: unknown) => {
          if (err) console.log(err);
        };
      });
      await interaction.editReply({
        embeds: [
          {
            color: parseInt(userPreferences.embedSettings.color),
            title: "Footer Updated",
            author: {
              name: interaction.user.username,
              icon_url: interaction.user.displayAvatarURL(),
            },
            description: `
    Changed embed footer message to:
    \`\`\`${args}\`\`\`
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
    case "view":
      await interaction.editReply({
        embeds: [
          {
            color: parseInt(userPreferences.embedSettings.color),
            title: "View Settings",
            author: {
              name: interaction.user.username,
              icon_url: interaction.user.displayAvatarURL(),
            },
            description: `
        Current Ver.: ${ver}
        Color: ${userPreferences.embedSettings.color}
        Err. Color: ${userPreferences.embedSettings.errorColor}
        Footer: ${userPreferences.embedSettings.footer}
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
}
