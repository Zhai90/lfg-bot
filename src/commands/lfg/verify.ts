import {
  ActionRowBuilder,
  ComponentType,
  TextInputStyle,
  ModalBuilder,
} from "discord.js";
import { userPreferences } from "../../../settings.json";

import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";

import type {
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ModalActionRowComponentBuilder,
} from "discord.js";

export const data: CommandData = {
  name: "verify",
  description: "Save your data for LFG.",
};

export const options: CommandOptions = {
  devOnly: false,
  guildOnly: true,
  userPermissions: [],
  botPermissions: [],
  deleted: false,
};

export async function run({ interaction, client }: SlashCommandProps) {
  const lfgModal = new ModalBuilder()
    .setTitle("Register LFG")
    .setCustomId("lfg--modal");

  const firstRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
    components: [
      {
        custom_id: "username",
        label: "What's your username?",
        type: ComponentType.TextInput,
        style: TextInputStyle.Short,
        required: true,
      },
    ],
  });

  const secondRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
    components: [
      {
        custom_id: "platform",
        placeholder: "What platform do you use?",
        type: ComponentType.StringSelect,
        options: [
          {
            label: "PC",
            value: "platform-pc",
            emoji: { name: "" },
          },
          {
            label: "Console",
            value: "platform-console",
            emoji: { name: "" },
          },
        ],
        max_values: 1,
        min_values: 1,
      },
    ],
  });

  const thirdRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
    components: [
      {
        custom_id: "region",
        placeholder: "What region are you in?",
        type: ComponentType.StringSelect,
        options: [
          {
            label: "America",
            value: "region-ame",
            emoji: { name: "" },
          },
          {
            label: "Europe",
            value: "region-eu",
            emoji: { name: "" },
          },
          {
            label: "Asia",
            value: "region-as",
            emoji: { name: "" },
          },
        ],
        max_values: 1,
        min_values: 1,
      },
    ],
  });

  const fourthRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
    components: [
      {
        custom_id: "rank",
        placeholder: "What's your competitive rank?",
        type: ComponentType.StringSelect,
        options: [
          {
            label: "",
            value: "",
            emoji: { id: "" },
          },
        ],
        max_values: 1,
        min_values: 1,
      },
    ],
  });

  lfgModal.addComponents(firstRow, secondRow, thirdRow, fourthRow);

  interaction.showModal(lfgModal)

  //   const firstRow = new ActionRowBuilder({
  //     components: [
  //       {
  //         custom_id: "lfg--region",
  //         placeholder: "What's your region?",
  //         type: ComponentType.StringSelect,
  //         options: [
  //           {
  //             label: "America",
  //             value: "region-a",
  //           },
  //           {
  //             label: "Europe",
  //             value: "region-eu",
  //           },
  //           {
  //             label: "Asia",
  //             value: "region-as",
  //           },
  //         ],
  //       },
  //     ],
  //   }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  //   const secondRow = new ActionRowBuilder({
  //     components: [
  //       {
  //         custom_id: "lfg--platform",
  //         placeholder: "What's your platform?",
  //         type: ComponentType.StringSelect,
  //         options: [
  //           {
  //             label: "PC",
  //             value: "platform-pc",
  //           },
  //           {
  //             label: "Console",
  //             value: "platform-console",
  //           },
  //         ],
  //       },
  //     ],
  //   }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  //   const thirdRow = new ActionRowBuilder({
  //     components: [
  //       {
  //         custom_id: "lfg--rank",
  //         placeholder: "What's your competitive rank?",
  //         type: ComponentType.StringSelect,
  //         options: [
  //           {
  //             label: "Bronze",
  //             value: "rank-bronze",
  //           },
  //           {
  //             label: "Silver",
  //             value: "rank-silver",
  //           },
  //           {
  //             label: "Gold",
  //             value: "rank-gold",
  //           },
  //           {
  //             label: "Platinum",
  //             value: "rank-platinum",
  //           },
  //           {
  //             label: "Diamond",
  //             value: "rank-diamond",
  //           },
  //           {
  //             label: "Master",
  //             value: "rank-master",
  //           },
  //           {
  //             label: "Grandmaster",
  //             value: "rank-gm",
  //           },
  //           {
  //             label: "Top 500",
  //             value: "rank-lb",
  //           },
  //         ],
  //       },
  //     ],
  //   }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  //   const usernameModal = new ModalBuilder()
  //     .setTitle("Register LFG")
  //     .setCustomId("usernameModal");

  //   const modalRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
  //     components: [
  //       {
  //         custom_id: "username",
  //         label: "What's your username?",
  //         type: ComponentType.TextInput,
  //         style: TextInputStyle.Short,
  //       },
  //     ],
  //   });

  //   usernameModal.addComponents(modalRow);

  //   const collectFilter = (i) => {
  //     i.deferUpdate();
  //     return i.user.id === interaction.user.id;
  //   };

  //   interaction.showModal(usernameModal);

  //   const username = await interaction.awaitModalSubmit({
  //     time: 60_000,
  //     filter: collectFilter,
  //   });

  //   console.log(username.fields.getTextInputValue("username"));

  //   const res = await interaction.followUp({
  //     embeds: [
  //       {
  //         color: parseInt(userPreferences.embedSettings.color),
  //         title: "Register LFG",
  //         author: {
  //           name: interaction.user.username,
  //           icon_url: interaction.user.displayAvatarURL(),
  //         },
  //         description: `
  //   Please answer the following questions.
  //   `,
  //         timestamp: new Date().toISOString(),
  //         footer: {
  //           text: userPreferences.embedSettings.footer,
  //           icon_url: interaction.guild?.iconURL() || undefined,
  //         },
  //       },
  //     ],
  //     ephemeral: true,
  //     fetchReply: true,
  //     components: [firstRow],
  //   });

  //   const region = await res.awaitMessageComponent({
  //     filter: collectFilter,
  //     componentType: ComponentType.StringSelect,
  //     time: 300000,
  //   });

  //   console.log(region.values.join(", "));

  //   await interaction.editReply({
  //     embeds: [
  //       {
  //         color: parseInt(userPreferences.embedSettings.color),
  //         title: "Register LFG",
  //         author: {
  //           name: interaction.user.username,
  //           icon_url: interaction.user.displayAvatarURL(),
  //         },
  //         description: `
  //   Please answer the following questions.
  //   `,
  //         timestamp: new Date().toISOString(),
  //         footer: {
  //           text: userPreferences.embedSettings.footer,
  //           icon_url: interaction.guild?.iconURL() || undefined,
  //         },
  //       },
  //     ],
  //     components: [secondRow],
  //   });

  //   const platform = await res.awaitMessageComponent({
  //     filter: collectFilter,
  //     componentType: ComponentType.StringSelect,
  //     time: 300000,
  //   });

  //   console.log(platform.values.join(", "));

  //   await res.edit({
  //     embeds: [
  //       {
  //         color: parseInt(userPreferences.embedSettings.color),
  //         title: "Register LFG",
  //         author: {
  //           name: interaction.user.username,
  //           icon_url: interaction.user.displayAvatarURL(),
  //         },
  //         description: `
  //   Please answer the following questions.
  //   `,
  //         timestamp: new Date().toISOString(),
  //         footer: {
  //           text: userPreferences.embedSettings.footer,
  //           icon_url: interaction.guild?.iconURL() || undefined,
  //         },
  //       },
  //     ],
  //     components: [thirdRow],
  //   });

  //   const rank = await res.awaitMessageComponent({
  //     filter: collectFilter,
  //     componentType: ComponentType.StringSelect,
  //     time: 300000,
  //   });

  //   console.log(rank.values.join(", "));
}
