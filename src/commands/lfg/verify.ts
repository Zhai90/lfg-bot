import { ActionRowBuilder, ComponentType, ButtonStyle } from "discord.js";

import { nanoid } from "nanoid";

import isValidURL from "../../utils/isValidURL";

import { userPreferences } from "../../../settings.json";

import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";

import type {
  APIActionRowComponent,
  APIMessageActionRowComponent,
  TextChannel,
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
    requestID: "",
    userID: interaction.user.id,
    timestamp: interaction.createdTimestamp,
    region: "",
    platform: "",
    rank: "",
    username: "",
    proof: "",
    status: "0"
  };

  const regionRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--region",
        placeholder: "What's your region?",
        type: ComponentType.StringSelect,
        options: [
          {
            label: "America",
            value: "America",
          },
          {
            label: "Europe",
            value: "Europe",
          },
          {
            label: "Asia",
            value: "Asia",
          },
        ],
      },
    ],
  }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  const platformRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--platform",
        placeholder: "What's your platform?",
        type: ComponentType.StringSelect,
        options: [
          {
            label: "PC",
            value: "PC",
          },
          {
            label: "Console",
            value: "Console",
          },
        ],
      },
    ],
  }) as unknown as APIActionRowComponent<APIMessageActionRowComponent>;

  const rankRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "lfg--rank",
        placeholder: "What's your competitive rank?",
        type: ComponentType.StringSelect,
        options: [
          {
            label: "Bronze",
            value: "Bronze",
          },
          {
            label: "Silver",
            value: "Silver",
          },
          {
            label: "Gold",
            value: "Gold",
          },
          {
            label: "Platinum",
            value: "Platinum",
          },
          {
            label: "Diamond",
            value: "Diamond",
          },
          {
            label: "Master",
            value: "Master",
          },
          {
            label: "Grandmaster",
            value: "Grandmaster",
          },
          {
            label: "Top 500",
            value: "Top 500",
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

  const appRow = new ActionRowBuilder({
    components: [
      {
        custom_id: "app-accept",
        type: ComponentType.Button,
        emoji: { name: "✅" },
        style: ButtonStyle.Success,
      },
      {
        custom_id: "app-deny",
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

  try {
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

    Username: (type your username)
    Rank:
    Platform:
    Region:

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
      components: [],
    });

    const username = await interaction.channel.awaitMessages({
      filter: msgFilter,
      max: 1,
      time: 300000,
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
      Please answer the following questions.
  
      Username: ${data.username}
      Rank: (answer below)
      Platform:
      Region:

      `,
          timestamp: new Date().toISOString(),
          footer: {
            text: userPreferences.embedSettings.footer,
            icon_url: interaction.guild?.iconURL() || undefined,
          },
        },
      ],
      components: [rankRow],
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
  
      Username: ${data.username}
      Rank: ${data.rank}
      Platform: (answer below)
      Region:

      `,
          timestamp: new Date().toISOString(),
          footer: {
            text: userPreferences.embedSettings.footer,
            icon_url: interaction.guild?.iconURL() || undefined,
          },
        },
      ],
      components: [platformRow],
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
  
        Username: ${data.username}
        Rank: ${data.rank}
        Platform: ${data.platform}
        Region: (answer below)

        `,
          timestamp: new Date().toISOString(),
          footer: {
            text: userPreferences.embedSettings.footer,
            icon_url: interaction.guild?.iconURL() || undefined,
          },
        },
      ],
      components: [regionRow],
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
        Please attach an image to prove your rank.
        Make sure it's a fullscreen screenshot of your overview.
  
        Username: ${data.username}
        Rank: ${data.rank}
        Platform: ${data.platform}
        Region: ${data.region}

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

    const proof = await interaction.channel.awaitMessages({
      filter: msgFilter,
      max: 1,
      time: 300000,
      errors: ["time"],
    });

    proof.first()?.delete();

    let proofURL =
      proof.first()?.attachments.first()?.url || proof.first()?.content;

    if (
      !proof.first()?.attachments.first()?.url &&
      !isValidURL(proof.first()?.content)
    ) {
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
          Invalid attachment. Request has been cancelled, please re-run the command.
          `,
            timestamp: new Date().toISOString(),
            image: {
              url: data.proof,
            },
            footer: {
              text: userPreferences.embedSettings.footer,
              icon_url: interaction.guild?.iconURL() || undefined,
            },
          },
        ],
        components: [],
      });

      return;
    }

    data = {
      ...data,
      proof: proofURL || "",
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
        Are you sure you want to submit your data for review?
  
        Username: ${data.username}
        Rank: ${data.rank}
        Platform: ${data.platform}
        Region: ${data.region}
  
        Proof:
        `,
          timestamp: new Date().toISOString(),
          image: {
            url: data.proof,
          },
          footer: {
            text: userPreferences.embedSettings.footer,
            icon_url: interaction.guild?.iconURL() || undefined,
          },
        },
      ],
      components: [confirmRow],
    });

    const submit = await res.awaitMessageComponent({
      filter: collectFilter,
      componentType: ComponentType.Button,
      time: 300000,
    });

    if (submit.customId == "lfg--confirm") {
      data = {
        ...data,
        requestID: nanoid(),
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
          Succesfully sent! You will get a DM mentioning whether your data gets approved by our staff team.

          Request ID: \`${data.requestID}\`
          (Save this ID if issues arise)
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
      await (
        client.channels.cache.get(
          userPreferences.channels.lfgApps
        ) as TextChannel
      ).send({
        embeds: [
          {
            color: parseInt(userPreferences.embedSettings.color),
            title: data.userID,
            author: {
              name: interaction.user.username,
              icon_url: interaction.user.displayAvatarURL(),
            },
            description: `
        OW Username: ${data.username}
        OW Region: ${data.region}
        OW Rank: ${data.rank}
        OW Platform: ${data.platform}
        Discord User: <@${data.userID}>

        Request ID: \`${data.requestID}\`
        `,
            timestamp: new Date().toISOString(),
            image: {
              url: data.proof,
            },
            footer: {
              text: userPreferences.embedSettings.footer,
              icon_url: interaction.guild?.iconURL() || undefined,
            },
          },
        ],
        components: [appRow],
      });
    } else if (submit.customId == "lfg--cancel") {
      await interaction.editReply({
        embeds: [
          {
            color: parseInt(userPreferences.embedSettings.errorColor),
            title: "Register LFG",
            author: {
              name: interaction.user.username,
              icon_url: interaction.user.displayAvatarURL(),
            },
            description: `
          Request cancelled. None of your data has been recorded. Please re-run the command if this was a mistake.
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

      return;
    }
  } catch (error) {
    await interaction.editReply({
      embeds: [
        {
          color: parseInt(userPreferences.embedSettings.errorColor),
          title: "Register LFG",
          author: {
            name: interaction.user.username,
            icon_url: interaction.user.displayAvatarURL(),
          },
          description: `
        Timed out. Please try again.
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
  }
}

//  Code for when Discord supports select menus in modals (discord pls i swear)

//  const lfgModal = new ModalBuilder()
//     .setTitle("Register LFG")
//     .setCustomId("lfg--modal");

//   const regionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
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

//   const platformRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
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

//   const rankRow = new ActionRowBuilder<ModalActionRowComponentBuilder>({
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

//   lfgModal.addComponents(regionRow, platformRow, rankRow, fourthRow);

//   interaction.showModal(lfgModal);
