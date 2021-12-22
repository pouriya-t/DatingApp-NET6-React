import {
  Box,
  Grid,
  OutlinedInput,
  TextareaAutosize,
  Typography,
} from "@mui/material";

export default function UserDescription({ profileForm }) {
  const { register, handleSubmit } = profileForm;

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ margin: "0 20px 0 20px" }}
    >
      <Typography sx={{ mb: 2 }} variant="h4" component="div">
        Description
      </Typography>
      <TextareaAutosize
        style={style.textAreaStyle}
        {...register("introduction")}
      />
      <Typography sx={{ mb: 2 }} variant="h4" component="div">
        Looking for
      </Typography>
      <TextareaAutosize
        style={style.textAreaStyle}
        {...register("lookingFor")}
      />
      <Typography sx={{ mb: 2 }} variant="h4" component="div">
        Interests
      </Typography>
      <TextareaAutosize
        style={style.textAreaStyle}
        {...register("interests")}
      />
      <Grid item xs={8} sm={12}>
        <Typography variant="h6" component="label">
          City :
        </Typography>
        <OutlinedInput
          sx={{ m: 1 }}
          {...register("city")}
          placeholder="Please enter city"
        />
        <Typography variant="h6" component="label">
          Country :
        </Typography>
        <OutlinedInput
          sx={{ m: 1 }}
          {...register("country")}
          placeholder="Please enter country"
        />
      </Grid>
    </Box>
  );
}

const style = {
  textAreaStyle: {
    width: "100%",
    height: "200px",
    resize: "none",
    overflowY: "scroll",
    fontSize: "20px",
    marginBottom: "20px",
    overflow: "hidden",
  },
};
