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
  

    // interaction.showModal(usernameModal);

    // const username = await interaction.awaitModalSubmit({ time: 60_000, filter: collectFilter })

    // console.log(username)

    //     console.log("test2");
    //     await interaction.editReply({
    //       embeds: [
    //         {
    //           color: parseInt(userPreferences.embedSettings.errorColor),
    //           title: "Timed out.",
    //           author: {
    //             name: "Overwatch 2",
    //             icon_url: "",
    //           },
    //           description: `
    // Please try again.
    // `,
    //           timestamp: new Date().toISOString(),
    //           footer: {
    //             text: userPreferences.embedSettings.footer,
    //             icon_url: interaction.guild?.iconURL() || undefined,
    //           },
    //         },
    //       ],
    //     });
  }

