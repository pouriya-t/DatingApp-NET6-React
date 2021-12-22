import { Typography } from "@mui/material";

export default function MemberDescription({userDetails}) {
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h4" component="div">
        Description
      </Typography>
      <Typography sx={{ mb: 4 }} variant="h6" component="div">
        {userDetails.introduction}
      </Typography>
      <Typography sx={{ mb: 2 }} variant="h4" component="div">
        Looking for
      </Typography>
      <Typography sx={{ mb: 4 }} variant="h6" component="div">
        {userDetails.lookingFor}
      </Typography>{" "}
    </>
  );
}
