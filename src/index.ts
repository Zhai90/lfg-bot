import { Client, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";

import "dotenv/config";

import path from "path";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  validationsPath: path.join(__dirname, "validations"),
  devGuildIds: ["1158819065914208268"], // main && test
  devUserIds: ["360235359746916352", "309414891419074561"], // zhai_ && s1adeo
  skipBuiltInValidations: false,
});

client.login(process.env.token);
