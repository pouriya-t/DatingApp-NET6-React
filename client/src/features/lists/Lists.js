import { CircularProgress, Container, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import MemberCardElement from "../../app/components/MemberCardElement";
import ToggleButtonListGroup from "./ToggleButtonListGroup";
import AppPagination from "../../app/components/AppPagination";
import { likesUser, setPageNumber } from "./likeSlice";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

export default function Lists() {
  const { users, metaData, likesLoaded } = useAppSelector(
    (state) => state.like
  );
  const dispatch = useAppDispatch();
  const [alignment, setAlignment] = useState("");

  useEffect(() => {
    if (alignment && !likesLoaded) {
      dispatch(likesUser());
    }
  }, [alignment, likesLoaded, dispatch]);

  return (
    <Container>
      <ToggleButtonListGroup
        dispatch={dispatch}
        alignment={alignment}
        setAlignment={setAlignment}
      />
      {alignment && !likesLoaded ? (
        <Box height="39vh" display="flex" alignItems="center">
          <CircularProgress size={100} color="secondary" />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ m: 2 }}>
          {users?.map((user) => (
            <MemberCardElement key={user.id} user={user} />
          ))}
        </Grid>
      )}
      <Grid container spacing={2} sx={{ m: 2 }}>
        {metaData && (
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
