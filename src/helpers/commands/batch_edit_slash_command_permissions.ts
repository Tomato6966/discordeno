import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { ApplicationCommandPermissions } from "../../types/interactions/application_command_permissions.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Batch edits permissions for all commands in a guild. Takes an array of partial GuildApplicationCommandPermissions objects including `id` and `permissions`. */
export async function batchEditSlashCommandPermissions(
  guildId: string,
  options: { id: string; permissions: ApplicationCommandPermissions[] }[],
) {
  return await rest.runMethod(
    "put",
    endpoints.COMMANDS_PERMISSIONS(applicationId, guildId),
    snakeKeysToCamelCase(options),
  );
}
