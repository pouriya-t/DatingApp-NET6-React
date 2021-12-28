import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageUploader from "../../app/components/ImageUploader";
import { useState } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { deletePhoto, isMainPhoto } from "./accountSlice";

export default function UserPhotos({ photos }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [photoId, setPhotoId] = useState(0);
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingButton, setLoadingButton] = useState({ id: 0, loading: false });

  function handleOpen(id) {
    setOpen(true);
    setPhotoId(id);
  }

  function handleClose() {
    setOpen(false);
    setPhotoId(0);
  }

  async function removePhoto() {
    setLoadingImages(true);
    await dispatch(deletePhoto(photoId));
    setOpen(false);
    setPhotoId(0);
    setLoadingImages(false);
  }

  async function mainPhoto(id) {
    setLoadingButton({ id: id, loading: true });
    await dispatch(isMainPhoto(id));
    setLoadingButton({ id: 0, loading: false });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {loadingImages ? (
        <Box sx={{ textAlign: "center", mt: 5, mb: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container>
          {photos.map((photo) => (
            <Grid key={photo.id} item xs={6} sm={3}>
              <Card sx={{ maxWidth: "80%", mt: 2 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={photo.url}
                  alt={photo.url}
                />
                <CardActions>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      bgcolor: "background.paper",
                    }}
                  >
                    {photo.isMain ? (
                      <Button
                        sx={{ textTransform: "capitalize" }}
                        disabled
                        variant="contained"
                        color="success"
                      >
                        Main
                      </Button>
                    ) : (
                      <LoadingButton
                        sx={{ textTransform: "capitalize" }}
                        color="success"
                        variant="contained"
                        onClick={() => mainPhoto(photo.id)}
                        loading={loadingButton.id === photo.id}
                      >
                        Main
                      </LoadingButton>
                    )}
                  </Box>
                  <Box
                    sx={{
                      pl: 2,
                      bgcolor: "background.paper",
                    }}
                  >
                    {photo.isMain ? (
                      <IconButton disabled color="error">
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleOpen(photo.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </CardActions>
              </Card>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                key={photo.id}
              >
                <DialogTitle id="alert-dialog-title">
                  Delete Your Image
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure to delete this image ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="error"
                    key={photo.id}
                    onClick={removePhoto}
                    autoFocus
                  >
                    Delete Photo
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                  >
                    Disagree
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          ))}
        </Grid>
      )}
      <ImageUploader />
    </Box>
  );
}
