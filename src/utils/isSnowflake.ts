import { SnowflakeUtil } from "discord.js";

export default function isSnowflake(snowflake: string) {
  try {
    SnowflakeUtil.deconstruct(snowflake);
    return true;
  } catch (error) {
    return false;
  }
}
