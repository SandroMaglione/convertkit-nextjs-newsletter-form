import { Config } from "effect";
import * as ConvertKit from "./Services/ConvertKit";

export const ConvertKitLive = ConvertKit.layer({
  apiKey: Config.secret("CONVERTKIT_API_KEY"),
  baseUrl: Config.string("CONVERTKIT_API_URL").pipe(
    Config.withDefault("https://api.convertkit.com/v3")
  ),
  formId: Config.string("CONVERTKIT_FORM_ID"),
});

export const MainLive = ConvertKitLive;
