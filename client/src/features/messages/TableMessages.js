import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  Button,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TimeAgoComponent from "../../app/components/TimeAgoComponent";
import agent from "../../app/api/agent";
import { getMessages } from "./messageSlice";
import LoadingSmallComponent from "../../app/components/LoadingSmallComponent";

export default function TableMessages({ messages, dispatch }) {
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const [open, setOpen] = useState(false);

  function handleOpen(id) {
    setOpen(true);
    setMessageId(id);
  }

  function handleClose() {
    setOpen(false);
    setMessageId(0);
  }

  async function removeMessage() {
    setLoading(true);
    await agent.Message.deleteMessage(messageId)
      .then(() => dispatch(getMessages()))
      .catch((error) => console.log(error))
      .finally(() => {
        setMessageId(0);
        setOpen(false);
        setLoading(false);
      });
  }

  if (loading) return <LoadingSmallComponent justifyContent="center" />;

  return (
    <TableContainer sx={{ mt: 2, mb: 2 }} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Message</StyledTableCell>
            <StyledTableCell>From / To</StyledTableCell>
            <StyledTableCell>Sent / Received</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages?.map((message) => (
            <StyledTableRow key={message.id}>
              <StyledTableCell
                sx={{ fontWeight: "bold" }}
                component="th"
                scope="row"
              >
                {message.content}
              </StyledTableCell>
              <StyledTableCell direction="row">
                <Stack spacing={2} direction="row">
                  <CardMedia
                    component="img"
                    sx={{ width: "60px", height: "60px", borderRadius: 10 }}
                    image={message.recipientPhotoUrl}
                  />
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      position: "relative",
                      top: "15px",
                    }}
                  >
                    {message.recipientUsername}
                  </Typography>
                </Stack>
              </StyledTableCell>
              <StyledTableCell>
                <TimeAgoComponent datetime={message.messageSent} />
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  onClick={() => handleOpen(message.id)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Your Message</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this message ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={removeMessage}
            autoFocus
          >
            Delete Message
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5f7fe8",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
