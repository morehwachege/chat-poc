import { createConsumer } from "@rails/actioncable";
import { logout, refreshToken } from "./utils";

let cable: any = null;

export function connectCable(onReceived: (data: any) => void) {
  const token = localStorage.getItem("tk");

  if (!token) return null;

  cable = createConsumer(`ws://192.168.100.242:3000/cable?token=${token}`);

  const subscription = cable.subscriptions.create(
    { channel: "ChatChannel" },
    {
      received(data: any) {
        onReceived(data);
      },

      disconnected() {
        console.warn("Cable disconnected");
      },
    },
  );

  return { cable, subscription };
}

export async function reconnectCable(onReceived: (data: any) => void) {
  const refreshed = await refreshToken();

  if (!refreshed) {
    logout();
    return null;
  }

  return connectCable(onReceived);
}
