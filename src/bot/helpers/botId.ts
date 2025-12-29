import { config } from '#root/config.js'

let botId: string
export function getBotId() {
  if (!botId) {
    botId = config.botToken.split(':')[0]
  }
  return botId
}
