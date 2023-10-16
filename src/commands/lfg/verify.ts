import {
  ActionRowBuilder,
  ComponentType,
  TextInputStyle,
  ModalBuilder,
  ButtonStyle,
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
  if (!interaction.channel) return;

  let data = {
    userID: interaction.user.id,
    timestamp: interaction.createdTimestamp,
    region: "",
    platform: "",
    rank: "",
    username: "",
  };

  const firstRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--region",
        placeholder: "What's your region?",
        type: ComponentType.StringSelect,
        options: [
          {
            label: "America",
            value: "1",
          },
          {
            label: "Europe",
            value: "2",
          },
          {
            label: "Asia",
            value: "3",
          },
        ],
      },
    ],
  }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  const secondRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--platform",
        placeholder: "What's your platform?",
        type: ComponentType.StringSelect,
        options: [
          {
            label: "PC",
            value: "1",
          },
          {
            label: "Console",
            value: "2",
          },
        ],
      },
    ],
  }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  const thirdRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--rank",
        placeholder: "What's your competitive rank?",
        type: ComponentType.StringSelect,
        options: [
          {
            label: "Bronze",
            value: "1",
          },
          {
            label: "Silver",
            value: "2",
          },
          {
            label: "Gold",
            value: "3",
          },
          {
            label: "Platinum",
            value: "4",
          },
          {
            label: "Diamond",
            value: "5",
          },
          {
            label: "Master",
            value: "6",
          },
          {
            label: "Grandmaster",
            value: "7",
          },
          {
            label: "Top 500",
            value: "8",
          },
        ],
      },
    ],
  }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  const confirmRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--confirm",
        type: ComponentType.Button,
        emoji: { name: "✅" },
        style: ButtonStyle.Success,
      },
      {
        custom_id: "lfg--cancel",
        type: ComponentType.Button,
        emoji: { name: "🗑️" },
        style: ButtonStyle.Danger,
      },
    ],
  }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  const collectFilter = (i) => {
    i.deferUpdate();
    return i.user.id === interaction.user.id;
  };

  const msgFilter = (msg) => {
    return msg.author.id === interaction.user.id;
  };

  const res = await interaction.reply({
    embeds: [
      {
        color: parseInt(userPreferences.embedSettings.color),
        title: "Register LFG",
        author: {
          name: interaction.user.username,
          icon_url: interaction.user.displayAvatarURL(),
        },
        description: `
    Please answer the following questions.

    Region: 
    Platform:
    Rank:
    Username:
    `,
        timestamp: new Date().toISOString(),
        footer: {
          text: userPreferences.embedSettings.footer,
          icon_url: interaction.guild?.iconURL() || undefined,
        },
      },
    ],
    ephemeral: true,
    fetchReply: true,
    components: [firstRow],
  });

  const region = await res.awaitMessageComponent({
    filter: collectFilter,
    componentType: ComponentType.StringSelect,
    time: 300000,
  });

  data = {
    ...data,
    region: region.values.join(""),
  };

  await interaction.editReply({
    embeds: [
      {
        color: parseInt(userPreferences.embedSettings.color),
        title: "Register LFG",
        author: {
          name: interaction.user.username,
          icon_url: interaction.user.displayAvatarURL(),
        },
        description: `
    Please answer the following questions.

    Region: ${data.region}
    Platform: 
    Rank:
    Username:
    `,
        timestamp: new Date().toISOString(),
        footer: {
          text: userPreferences.embedSettings.footer,
          icon_url: interaction.guild?.iconURL() || undefined,
        },
      },
    ],
    components: [secondRow],
  });

  const platform = await res.awaitMessageComponent({
    filter: collectFilter,
    componentType: ComponentType.StringSelect,
    time: 300000,
  });

  data = {
    ...data,
    platform: platform.values.join(""),
  };

  await interaction.editReply({
    embeds: [
      {
        color: parseInt(userPreferences.embedSettings.color),
        title: "Register LFG",
        author: {
          name: interaction.user.username,
          icon_url: interaction.user.displayAvatarURL(),
        },
        description: `
    Please answer the following questions.

    Region: ${data.region}
    Platform: ${data.platform}
    Rank: 
    Username:
    `,
        timestamp: new Date().toISOString(),
        footer: {
          text: userPreferences.embedSettings.footer,
          icon_url: interaction.guild?.iconURL() || undefined,
        },
      },
    ],
    components: [thirdRow],
  });

  const rank = await res.awaitMessageComponent({
    filter: collectFilter,
    componentType: ComponentType.StringSelect,
    time: 300000,
  });

  data = {
    ...data,
    rank: rank.values.join(""),
  };

  await interaction.editReply({
    embeds: [
      {
        color: parseInt(userPreferences.embedSettings.color),
        title: "Register LFG",
        author: {
          name: interaction.user.username,
          icon_url: interaction.user.displayAvatarURL(),
        },
        description: `
      Please answer the following questions.

      Region: ${data.region}
      Platform: ${data.platform}
      Rank: ${data.rank}
      Username: (type your username)
      `,
        timestamp: new Date().toISOString(),
        footer: {
          text: userPreferences.embedSettings.footer,
          icon_url: interaction.guild?.iconURL() || undefined,
        },
      },
    ],
    components: [],
  });

  const username = await interaction.channel.awaitMessages({
    filter: msgFilter,
    max: 1,
    time: 30000,
    errors: ["time"],
  });

  await username.first()?.delete();

  data = {
    ...data,
    username: username.first()?.content || "",
  };

  await interaction.editReply({
    embeds: [
      {
        color: parseInt(userPreferences.embedSettings.color),
        title: "Register LFG",
        author: {
          name: interaction.user.username,
          icon_url: interaction.user.displayAvatarURL(),
        },
        description: `
      Are these correct?

      Region: ${data.region}
      Platform: ${data.platform}
      Rank: ${data.rank}
      Username: ${data.username}
      `,
        timestamp: new Date().toISOString(),
        footer: {
          text: userPreferences.embedSettings.footer,
          icon_url: interaction.guild?.iconURL() || undefined,
        },
      },
    ],
    components: [confirmRow],
  });
}

//  Code for when Discord supports select menus in modals (discord pls i swear)

//  const lfgModal = new ModalBuilder()
//     .setTitle("Register LFG")
//     .setCustomId("lfg--modal");

//   const firstRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
//     components: [
//       {
//         custom_id: "username",
//         label: "What's your username?",
//         type: ComponentType.TextInput,
//         style: TextInputStyle.Short,
//         required: true,
//       },
//     ],
//   });

//   const secondRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
//     components: [
//       {
//         custom_id: "platform",
//         placeholder: "What platform do you use?",
//         type: ComponentType.StringSelect,
//         options: [
//           {
//             label: "PC",
//             value: "platform-pc",
//             emoji: { name: "" },
//           },
//           {
//             label: "Console",
//             value: "platform-console",
//             emoji: { name: "" },
//           },
//         ],
//         max_values: 1,
//         min_values: 1,
//       },
//     ],
//   });

//   const thirdRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
//     components: [
//       {
//         custom_id: "region",
//         placeholder: "What region are you in?",
//         type: ComponentType.StringSelect,
//         options: [
//           {
//             label: "America",
//             value: "region-ame",
//             emoji: { name: "" },
//           },
//           {
//             label: "Europe",
//             value: "region-eu",
//             emoji: { name: "" },
//           },
//           {
//             label: "Asia",
//             value: "region-as",
//             emoji: { name: "" },
//           },
//         ],
//         max_values: 1,
//         min_values: 1,
//       },
//     ],
//   });

//   const fourthRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
//     components: [
//       {
//         custom_id: "rank",
//         placeholder: "What's your competitive rank?",
//         type: ComponentType.StringSelect,
//         options: [
//           {
//             label: "Bronze",
//             value: "rank-bronze",
//             emoji: { id: "1158861338454532096" },
//           },
//           {
//             label: "Silver",
//             value: "rank-silver",
//             emoji: { id: "1158861355823153292" },
//           },
//           {
//             label: "Gold",
//             value: "rank-gold",
//             emoji: { id: "1158861369186201630" },
//           },
//           {
//             label: "Platinum",
//             value: "rank-platinum",
//             emoji: { id: "1159030325511471144" },
//           },
//           {
//             label: "Diamond",
//             value: "rank-diamond",
//             emoji: { id: "1159035719839387650" },
//           },
//           {
//             label: "Master",
//             value: "rank-master",
//             emoji: { id: "1159035734162952244" },
//           },
//           {
//             label: "Grandmaster",
//             value: "rank-gm",
//             emoji: { id: "1159077965703958589" },
//           },
//           {
//             label: "Top 500",
//             value: "rank-lb",
//             emoji: { id: "1159078133362868334" },
//           },
//         ],
//         max_values: 1,
//         min_values: 1,
//       },
//     ],
//   });

//   lfgModal.addComponents(firstRow, secondRow, thirdRow, fourthRow);

//   interaction.showModal(lfgModal);
