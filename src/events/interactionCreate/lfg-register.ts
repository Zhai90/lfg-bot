import {
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
  APIActionRowComponent,
  APIMessageActionRowComponent,
} from "discord.js";

import { userPreferences } from "../../../settings.json";

import type {
  ButtonInteraction,
  ChatInputCommandInteraction,
  Client,
} from "discord.js";
import type { CommandKit } from "commandkit";

export default function (
  interaction: ButtonInteraction,
  client: Client<true>,
  handler: CommandKit
) {
  if (!interaction.isButton()) return true;
  if (interaction.customId != "lfg--register") return true;
  if (!interaction.channel) return true;

  
}
