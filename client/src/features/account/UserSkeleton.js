import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
} from "@mui/material";

export default function UserSkeleton() {
  return (
    <Grid item component={Card} sx={{ mt: 4 }}>
      <CardHeader sx={{ mb: 3 }} />
      <Skeleton
        sx={{ height: 250, mb: 9 }}
        animation="wave"
        variant="rectangular"
      />
      <CardContent>
        <>
          <Skeleton animation="wave" height={20} width="30%" />
          <Skeleton animation="wave" height={25} style={{ marginBottom: 7 }} />
        </>
      </CardContent>
      <CardContent>
        <>
          <Skeleton animation="wave" height={20} width="30%" />
          <Skeleton animation="wave" height={25} style={{ marginBottom: 7 }} />
        </>
      </CardContent>
      <CardContent>
        <>
          <Skeleton animation="wave" height={20} width="30%" />
          <Skeleton animation="wave" height={25} style={{ marginBottom: 7 }} />
        </>
      </CardContent>
      <CardContent>
        <>
          <Skeleton animation="wave" height={20} width="30%" />
          <Skeleton animation="wave" height={25} style={{ marginBottom: 7 }} />
        </>
      </CardContent>
      <CardActions>
        <>
          <Skeleton
            sx={{ mb: 3, mt: 2 }}
            variant="rectangular"
            height={35}
            width="100%"
          />
        </>
      </CardActions>
    </Grid>
  );
}
