import { useState } from "react";
import Dropzone from "react-dropzone";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useAppDispatch } from "../store/configureStore";
import { uploadPhoto } from "../../features/account/accountSlice";

export default function ImageUploader() {
  const [showFiles, setShowFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function uploadImages() {
    setLoading(true);
    let form = new FormData();
    for (const file of showFiles) {
      form.append("file", file);
      await dispatch(uploadPhoto(form));
    }
    setLoading(false);
    setShowFiles([]);
  }

  return (
    <>
      <Dropzone
        maxFiles={5}
        onDrop={(acceptedFiles) => {
          setShowFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section style={{ cursor: "pointer", mt: 2 }}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <IconButton color="primary">
                <UploadFileIcon sx={{ fontSize: "80px" }} />
              </IconButton>
              <p>Drag 'n' drop some images here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <Typography color="error" variant="h6">
        NOTICE : You can't upload images more than 5 numbers , with once upload
        .
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {showFiles?.map((file, index) => (
            <Grid key={index} item xs={6} sm={2} sx={{ marginRight: 2 }}>
              <IconButton
                disabled={loading}
                sx={{
                  position: "relative",
                  bottom: "-30px",
                  right: "-5px",
                  cursor: "pointer",
                  color: "red",
                  backgroundColor: "orange",
                  borderRadius: 10,
                }}
                onClick={() =>
                  setShowFiles(
                    showFiles.filter((image) => image.name !== file.name)
                  )
                }
              >
                X
              </IconButton>
              <CardMedia
                component="img"
                sx={{ width: "100px", height: "100px" }}
                image={file.preview}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {showFiles.length > 0 && (
        <>
          <LoadingButton
            loading={loading}
            onClick={uploadImages}
            color="success"
            variant="contained"
          >
            Upload Files
          </LoadingButton>
          <Button
            sx={{ m: 3 }}
            disabled={loading}
            onClick={() => {
              setShowFiles([]);
            }}
            color="error"
            variant="contained"
          >
            Clear
          </Button>
        </>
      )}
    </>
  );
}
