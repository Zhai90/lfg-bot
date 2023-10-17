import { ver, userPreferences } from "../../../settings.json";

import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";

export const data: CommandData = {
  name: "about",
  description: "A bunch of info that may or may not be useful to you.",
};

export const options: CommandOptions = {
  devOnly: false,
  guildOnly: true,
  userPermissions: [],
  botPermissions: [],
  deleted: false,
};

export async function run({ interaction, client }: SlashCommandProps) {
  await interaction.deferReply();
  await interaction.editReply({
    embeds: [
      {
        color: parseInt(userPreferences.embedSettings.color),
        title: "About botname (idk)",
        author: {
          name: ver,
          icon_url: client.user.displayAvatarURL(),
        },
        description: `
        A Discord bot built in TypeScript with Discord.JS using CommandKit, love, and lots of coffee (and tea) by <@360235359746916352> for <@309414891419074561>!

        Check out the bot's [source code](https://github.com/Zhai90/lfg-bot)!

        **Stats:**
        CPU Usage: \`SYS: ${process.cpuUsage().system}μs / USR: ${
          process.cpuUsage().user
        }μs\`
        Uptime: \`${Math.floor(process.uptime())}s\`
        API Latency: \`${client.ws.ping}ms\`
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
