import { EnvType, load } from 'ts-dotenv';

export type Env = EnvType<typeof schema>;

export const schema = {
  PORT: Number,
  NODE_ENV: ['production' as const, 'development' as const, 'test' as const],
};

export let env: Env;

export function loadEnv(): void {
  env = load(schema);
}
