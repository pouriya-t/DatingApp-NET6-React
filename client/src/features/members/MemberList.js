import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getUsersList, setPageNumber } from "./userSlice";
import AppPagination from "../../app/components/AppPagination";
import FilterMembers from "./FilterMembers";
import MemberCardElement from "../../app/components/MemberCardElement";
import LoadingSmallComponent from "../../app/components/LoadingSmallComponent";


export default function MemberList() {
  const { userList, metaData, usersLoaded } = useAppSelector(
    (state) => state.user
  );
  const [loading, setLoading] = useState("" + !usersLoaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!usersLoaded) dispatch(getUsersList());
  }, [dispatch, usersLoaded]);

  if (!userList) return <LoadingSmallComponent justifyContent="center" />;

  return (
    <Container sx={{ mb: 5 }}>
      {metaData?.totalItems && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginBottom="5vh"
        >
          <Typography variant="h4">
            Your Matches - {metaData.totalItems} found
          </Typography>
        </Grid>
      )}
      <FilterMembers
        loading={loading}
        setLoading={setLoading}
        dispatch={dispatch}
        usersLoaded={usersLoaded}
      />
      <Grid container spacing={2}>
        {usersLoaded &&
          userList?.map((user) => (
            <MemberCardElement key={user.id} user={user} />
          ))}
      </Grid>
      {loading === "pageNumber" + !usersLoaded ||
      loading === "resetFilters" + !usersLoaded ||
      loading === "created" + !usersLoaded ||
      loading === "lastActive" + !usersLoaded ||
      loading === "applyFilters" + !usersLoaded ? (
        <LoadingSmallComponent justifyContent="center" />
      ) : null}
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ margin: "30px 0 30px 0" }}
      >
        <Grid item xs={12}>
          <AppPagination
            metaData={metaData}
            onPageChange={async (page) => {
              setLoading("pageNumber" + !usersLoaded);
              await dispatch(setPageNumber({ pageNumber: page }));
              setLoading("pageNumber" + usersLoaded);
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
