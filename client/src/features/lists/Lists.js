import { Container, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import MemberCardElement from "../../app/components/MemberCardElement";
import ToggleButtonListGroup from "./ToggleButtonListGroup";
import AppPagination from "../../app/components/AppPagination";
import { likesUser, setPageNumber } from "./likeSlice";
import { useEffect } from "react";
import LoadingSmallComponent from "../../app/components/LoadingSmallComponent";

export default function Lists() {
  const { users, metaData, likesLoaded } = useAppSelector(
    (state) => state.like
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!likesLoaded) {
      dispatch(likesUser());
    }
  }, [likesLoaded, dispatch]);

  return (
    <Container>
      <ToggleButtonListGroup dispatch={dispatch} />
      {!likesLoaded ? (
        <LoadingSmallComponent />
      ) : users?.length > 0 ? (
        <Grid container spacing={2}>
          {users?.map((user) => (
            <MemberCardElement key={user.id} user={user} />
          ))}
        </Grid>
      ) : (
        <Typography variant="h3">No Lists here...</Typography>
      )}
      <Grid container spacing={2} sx={{ m: 2 }}>
        {metaData && users?.length > 0 && (
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
