import { toast } from "react-toastify";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Link } from "react-router-dom";

export class PresenceService {
  hubConnection = undefined;
  onlineUsers = undefined;

  createHubConnection = (user) => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/hubs/presence", {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on("UserIsOnline", (username) => {
      toast.info(username + " has connected");
    });

    this.hubConnection.on("UserIsOffline", (username) => {
      toast.warning(username + " has disconnected");
    });

    this.hubConnection.on("GetOnlineUsers", (usernames) => {
      this.onlineUsers = usernames;
    });

    this.hubConnection.on("NewMessageReceived", ({ username, knownAs }) => {
      toast.info(
        <div>
          <Link
            style={{ textDecoration: "none" }}
            to={`/members/${username}?tab=4`}
            state={username}
          >
            {knownAs + " has sent you a new message"}
          </Link>
        </div>
      );
    });
  };

  stopHubConnection = () => {
    this.hubConnection.stop();
  };
}
