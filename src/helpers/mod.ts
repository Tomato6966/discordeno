import { Bot } from "../bot.ts";
import { RemoveFirstFromTuple } from "../types/utils.ts";
import { sendInteractionResponse } from "./interactions/mod.ts";
export { sendInteractionResponse };

const helpers = {
  sendInteractionResponse,
};

export function createHelpers(
  bot: Bot,
  customHelpers?: Partial<Helpers>,
): OpenHelpers {
  const converted = {} as OpenHelpers;
  for (const [name, fun] of Object.entries({ ...helpers, ...customHelpers })) {
    // @ts-ignore - TODO: make the types better
    converted[name as keyof OpenHelpers] = (
      ...args: RemoveFirstFromTuple<Parameters<typeof fun>>
    ) =>
      // @ts-ignore - TODO: make the types better
      fun(bot, ...args);
  }

  return converted;
}

export type Helpers = typeof helpers;

export type OpenHelpers = {
  [K in keyof Helpers]: (
    ...args: RemoveFirstFromTuple<Parameters<Helpers[K]>>
  ) => ReturnType<Helpers[K]>;
};
