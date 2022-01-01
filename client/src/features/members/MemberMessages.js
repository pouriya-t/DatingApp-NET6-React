import {
  List,
  Paper,
  Divider,
  Typography,
  Stack,
  CardMedia,
  Grid,
  Icon,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import TimeAgoComponent from "../../app/components/TimeAgoComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { threadMessages } from "../messages/messageSlice";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LoadingSmallComponent from "../../app/components/LoadingSmallComponent";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import agent from "../../app/api/agent";

export default function MemberMessages({ username }) {
  const { userMessages, userMessagesLoad } = useAppSelector(
    (state) => state.message
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: "all" });

  useEffect(() => {
    dispatch(threadMessages(username));
  }, [dispatch, username]);

  async function onSubmit(data) {
    data.recipientUsername = username;
    await agent.Message.sendMessage(data)
      .then(() => dispatch(threadMessages(username)))
      .catch((error) => console.log(error))
      .finally(() => reset());
  }

  return (
    <>
      <Paper style={{ maxHeight: "100vh", overflow: "auto" }}>
        {userMessagesLoad ? (
          <LoadingSmallComponent justifyContent="center" />
        ) : (
          <List sx={{ m: 2 }}>
            {userMessages && userMessages.length > 0 ? (
              userMessages.map((message) => (
                <Grid key={message.id} container spacing={2}>
                  <Grid item xs={6} sm={6} md={10} lg={10}>
                    <Stack spacing={2} component="div" sx={{ mb: 2 }}>
                      <Typography
                        variant="div"
                        sx={{ fontSize: "17px", color: "gray" }}
                      >
                        <WatchLaterOutlinedIcon
                          sx={{ position: "relative", top: 7, mr: 1 }}
                        />
                        <TimeAgoComponent datetime={message.messageSent} />

                        {message.recipientUsername === username ? (
                          message.dateRead ? (
                            <>
                              <Icon
                                sx={{ position: "relative", top: 6, left: 3 }}
                              >
                                <DoneAllIcon color="success" />
                              </Icon>
                              <Typography
                                variant="p"
                                sx={{
                                  fontSize: "15px",
                                  color: "green",
                                  ml: 1,
                                }}
                              >
                                ( read{" "}
                                <TimeAgoComponent datetime={message.dateRead} />{" "}
                                )
                              </Typography>
                            </>
                          ) : (
                            <Icon
                              sx={{ position: "relative", top: 6, left: 3 }}
                            >
                              <DoneIcon color="error" />
                            </Icon>
                          )
                        ) : null}
                      </Typography>
                      <Typography
                        variant="p"
                        sx={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        {message.content}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} sm={6} md={2} lg={2}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "50px",
                        height: "50px",
                        mr: 2,
                        borderRadius: 5,
                        mt: 1,
                      }}
                      image={message.senderPhotoUrl}
                    />
                  </Grid>
                  <Grid sx={{ m: 1 }} item xs={12} sm={12} md={12} lg={12}>
                    <Divider />
                  </Grid>
                </Grid>
              ))
            ) : (
              <Typography variant="p">
                Not message yet...Say hello to {username}{" "}
              </Typography>
            )}
          </List>
        )}
      </Paper>

      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 2,
          p: "8px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#dee2e3",
          color: "#dee2e3",
        }}
      >
        <TextField
          sx={{
            width: "100%",
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "blue",
              },
            },
          }}
          {...register("content", { required: true })}
          placeholder="Type message here..."
        />
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          color="primary"
          sx={{ p: "10px", mt: 2 }}
          aria-label="directions"
          variant="contained"
          type="submit"
        >
          Send Message
        </LoadingButton>
      </Stack>
    </>
  );
}
