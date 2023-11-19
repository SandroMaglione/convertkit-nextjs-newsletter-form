import { Config } from "effect";

export class ConvertKitConfig {
  constructor(
    readonly apiKey: string,
    readonly url: string,
    readonly formId: string
  ) {}

  public get fetchUrl(): string {
    return `${this.url}forms/${this.formId}/subscribe`;
  }

  public get headers() {
    return {
      "Content-Type": "application/json",
      charset: "utf-8",
    };
  }
}

export const config = Config.all([
  Config.string("CONVERTKIT_API_KEY"),
  Config.string("CONVERTKIT_API_URL"),
  Config.string("CONVERTKIT_FORM_ID"),
]).pipe(
  Config.map(
    ([apiKey, url, formId]) => new ConvertKitConfig(apiKey, url, formId)
  )
);
