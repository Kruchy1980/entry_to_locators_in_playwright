export function getEnvURL(): string {
  switch (process.env.ENV_NAME) {
    case 'localhost':
      return 'http://localhost:3000/';
    case 'glitch':
      return 'https://fog-tiny-goldenrod.glitch.me/';
    default:
      return 'http://localhost:3000/';
  }
}
