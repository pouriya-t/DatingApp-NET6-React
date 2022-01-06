export default function checkUserOnline(onlineUsers, username) {
  for (const onlineUser of onlineUsers) {
    if (onlineUser === username) return true;
  }
}
