import { STORAGE_STATE } from '@_pw-config';
// Import for file settings "fs" should be imported manually
import * as fs from 'fs';

async function globalSetup(): Promise<void> {
  // Remove old session json
  if (fs.existsSync(STORAGE_STATE)) {
    fs.unlinkSync(STORAGE_STATE);
  }
  //   console.log('❗URL:', process.env.USER_EMAIL);
}

export default globalSetup;
