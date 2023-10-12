import { ButtonInteraction, ActionRowBuilder, ButtonStyle, ComponentType } from "discord.js";

import { userPreferences } from "../../../settings.json"

export default function (
    interaction: ButtonInteraction,
    client: Client<true>,
    handler: CommandKit
  ) {

const confirmRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--confirm",
        label: "Confirm",
        style: ButtonStyle.Success,
        type: ComponentType.Button,
        emoji: { name: "📩" },
      },
      {
        custom_id: "lfg--cancel",
        label: "Cancel",
        style: ButtonStyle.Danger,
        type: ComponentType.Button,
        emoji: { name: "🗑️" },
      },
    ],
  }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  interaction.reply({
    embeds: [
      {
        color: parseInt(userPreferences.embedSettings.color),
        title: "Confirm",
        author: {
          name: "Overwatch 2",
          icon_url: "",
        },
        description: `
Confirm your request.
`,
        timestamp: new Date().toISOString(),
        footer: {
          text: userPreferences.embedSettings.footer,
          icon_url: interaction.guild?.iconURL() || undefined,
        },
      },
    ],
    components: [confirmRow],
    ephemeral: true,
  });}