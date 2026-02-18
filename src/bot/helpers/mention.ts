export function getMentionString(user: { username?: string | null, id: number | string, first_name?: string | null }) {
  return user.username ? `@${user.username}` : `<a href="tg://user?id=${user.id}">${user.first_name || user.id}</a>`
}
