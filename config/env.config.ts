// File used for environment variables preparation based on dotenv plugin installed for project
import 'dotenv/config.js';

import * as dotenv from 'dotenv';
// Dotenv must be declared before the synchronous function is executed
dotenv.config({ override: true });

export function requireEnvVariable(envVariable: string): string {
  // Prepare proper variable for environment
  const envVariableValue = process.env[envVariable];
  // Handle the error
  if (envVariableValue === undefined) {
    throw new Error(`1Environment variable ${envVariable} is not set`);
  }
  return envVariableValue;
}

// After such prepared env variable function we need to export proper env values prepared by that function
export const USER_EMAIL = requireEnvVariable('USER_EMAIL');
export const USER_PASSWORD = requireEnvVariable('USER_PASSWORD');
