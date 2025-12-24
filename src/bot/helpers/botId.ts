import { config } from '#root/config.js'

export function getBotId() {
  return config.botToken.split(':')[0]
}
