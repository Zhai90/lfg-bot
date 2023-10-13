import {
  ActionRowBuilder,
  ComponentType,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputStyle,
} from "discord.js";

import type { APIActionRowComponent, ButtonInteraction, Client, APIMessageActionRowComponent } from "discord.js";
import type { CommandKit } from "commandkit";

export default async function (
  interaction: ButtonInteraction,
  client: Client<true>,
  handler: CommandKit
) {
  if (!interaction.isButton()) return false;
  if (interaction.customId == "lfg--comp") {
    const firstRow = new ActionRowBuilder({
      components: [
        {
          custom_id: "lfg--region",
          placeholder: "What's your region?",
          type: ComponentType.StringSelect,
          options: [
            {
              label: "America",
              value: "region-a",
            },
            {
              label: "Europe",
              value: "region-eu",
            },
            {
              label: "Asia",
              value: "region-as",
            },
          ],
        },
      ],
    })as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

    const secondRow = new ActionRowBuilder({
      components: [
        {
          custom_id: "lfg--platform",
          placeholder: "What's your platform?",
          type: ComponentType.StringSelect,
          options: [
            {
              label: "PC",
              value: "platform-pc",
            },
            {
              label: "Console",
              value: "platform-console",
            },
          ],
        },
      ],
    });

    const thirdRow = new ActionRowBuilder({
      components: [
        {
          custom_id: "lfg--rank",
          placeholder: "What's your competitive rank?",
          type: ComponentType.StringSelect,
          options: [
            {
              label: "Bronze",
              value: "rank-bronze",
            },
            {
              label: "Silver",
              value: "rank-silver",
            },
            {
              label: "Gold",
              value: "rank-gold",
            },
            {
              label: "Platinum",
              value: "rank-platinum",
            },
            {
              label: "Diamond",
              value: "rank-diamond",
            },
            {
              label: "Master",
              value: "rank-master",
            },
            {
              label: "Grandmaster",
              value: "rank-gm",
            },
            {
              label: "Top 500",
              value: "rank-lb",
            },
          ],
        },
      ],
    });

    const usernameModal = new ModalBuilder()
      .setTitle("")
      .setCustomId("usernameModal");

    const modalRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
      components: [
        {
          custom_id: "username",
          label: "What's your username?",
          type: ComponentType.TextInput,
          style: TextInputStyle.Short,
        },
      ],
    });

    usernameModal.addComponents(modalRow);

    const collectFilter = (i: { user: { id: string } }) =>
      i.user.id === interaction.user.id;

    const res1 = await interaction.reply({
      embeds: [{}],
      ephemeral: true,
      components: [firstRow],
    });

    try {
      const confirmation = await res1.awaitMessageComponent({
        filter: collectFilter,
        time: 300000,
      });
    } catch (error) {
      interaction.editReply({ embeds: [] });
    }
  }
}
