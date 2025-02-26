// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getEnvURL() {
  switch (process.env.ENV_NAME) {
    case 'localhost':
      return 'http://localhost:3000/';
    case 'glitch':
      return 'https://fog-tiny-goldenrod.glitch.me/';
    default:
      return 'http://localhost:3000/';
  }
}
