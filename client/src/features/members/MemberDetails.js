import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Badge, Container, Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getUserDetails } from "./userSlice";
import MemberCardDetails from "./MemberCardDetails";
import MemberDescription from "./MemberDescription";
import ImageViewer from "../../app/components/ImageViewer";
import MemberMessages from "./MemberMessages";
import LoadingSmallComponent from "../../app/components/LoadingSmallComponent";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { presence } from "../account/accountSlice";

export default function MemberDetails() {
  const { state: currentUsername } = useLocation();
  let [searchParams] = useSearchParams();
  const [connection, setConnection] = useState();
  const [isMemberMessage, setIsMemberMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [updatedGroup, setUpdatedGroup] = useState(false);

  const { userDetails } = useAppSelector((state) => state.user);
  const { userInfo } = useAppSelector((state) => state.account);

  const dispatch = useAppDispatch();
  const [value, setValue] = useState("1");
  const [isNewMessage, setIsNewMessage] = useState(false);

  const joinChat = async (user, currentUsername) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(
          "https://localhost:5001/hubs/message?user=" + currentUsername,
          {
            accessTokenFactory: () => user.token,
          }
        )
        .withAutomaticReconnect()
        .build();

      connection.start().catch((error) => console.log(error));

      connection.on("ReceiveMessageThread", (messages) => {
        setMessages(messages);
      });
      connection.on("NewMessage", (message) => {
        setMessages((messages) => [...messages, message]);
      });

      connection.on("UpdatedGroup", (group) => {
        if (group.connections.some((x) => x.username === currentUsername)) {
          setUpdatedGroup(true);
        }
      });

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
      });

      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  presence.hubConnection.on("NewMessageReceived", () => {
    setIsNewMessage(true);
  });

  useEffect(() => {
    dispatch(getUserDetails(currentUsername));
    if (searchParams.get("tab") === "4" || value === "4") {
      setTimeout(() => {
        setValue("4");
        setIsMemberMessage(true);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentUsername, searchParams, userInfo]);

  useEffect(() => {
    if (!isMemberMessage) {
      closeConnection();
    }
    return () => {
      closeConnection();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMemberMessage]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const sendMessage = async (recipientUsername, content) => {
    try {
      await connection.invoke("SendMessage", {
        recipientUsername, //: username,
        content, //: data.content,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (error) {
      console.log(error);
    }
  };

  if (updatedGroup) {
    messages.forEach((message) => {
      if (!message.dateRead) {
        message.dateRead = new Date(Date.now());
      }
    });
    setUpdatedGroup(false);
  }

  // if (!userDetails || currentUsername !== userDetails.username)
  // if (!userDetails) return <LoadingComponent message="Loading member..." />;
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {userDetails ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <MemberCardDetails userDetails={userDetails} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    variant="scrollable"
                    allowScrollButtonsMobile
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={handleChange}
                  >
                    <Tab
                      sx={styleTab}
                      label={`About ${userDetails.username}`}
                      value="1"
                    />
                    <Tab sx={styleTab} label="Interests" value="2" />
                    <Tab sx={styleTab} label="Photos" value="3" />
                    <Tab
                      icon={
                        isNewMessage ? (
                          <Badge
                            sx={{ zIndex: 1, mt: 1.5 }}
                            badgeContent="New"
                            color="error"
                          />
                        ) : null
                      }
                      sx={styleTab}
                      label="Messages"
                      value="4"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <MemberDescription userDetails={userDetails} />
                </TabPanel>
                <TabPanel value="2">Interstsss </TabPanel>
                <TabPanel value="3">
                  <ImageViewer photos={userDetails.photos} />
                </TabPanel>
                <TabPanel value="4">
                  <MemberMessages
                    messages={messages}
                    sendMessage={sendMessage}
                    username={currentUsername}
                    joinChat={joinChat}
                    userInfo={userInfo}
                    setIsMemberMessage={setIsMemberMessage}
                    setIsNewMessage={setIsNewMessage}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <LoadingSmallComponent justifyContent="center" />
      )}
    </Container>
  );
}

const styleTab = {
  fontWeight: 950,
  textTransform: "capitalize",
  "&.Mui-selected": {
    backgroundColor: "#e6f4f5",
    transition: "0.5s ease-in-out",
  },
};
