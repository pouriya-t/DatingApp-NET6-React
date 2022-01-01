import { Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getMessages, setPageNumber } from "./messageSlice";
import TableMessages from "./TableMessages";
import ToggleButtonMessageGroup from "./ToggleButtonMessageGroup";
import AppPagination from "../../app/components/AppPagination";
import LoadingSmallComponent from "../../app/components/LoadingSmallComponent";

export default function Messages() {
  const { messages, messagesLoaded, metaData } = useAppSelector(
    (state) => state.message
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!messagesLoaded) {
      dispatch(getMessages());
    }
  }, [dispatch, messagesLoaded]);

  return (
    <Container>
      <ToggleButtonMessageGroup dispatch={dispatch} />
      {!messagesLoaded ? (
        <LoadingSmallComponent justifyContent="center" />
      ) : messages.length > 0 ? (
        <Container>
          <TableMessages messages={messages} dispatch={dispatch} />
        </Container>
      ) : (
        <Typography sx={{ mt: 2 }} variant="h4">
          Not any message...
        </Typography>
      )}
      <Grid container spacing={2} sx={{ m: 2 }}>
        {messages?.length > 0 && metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Container>
  );
}
