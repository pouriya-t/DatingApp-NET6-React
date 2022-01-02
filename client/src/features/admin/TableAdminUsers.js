import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  Button,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import LoadingSmallComponent from "../../app/components/LoadingSmallComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getUsersWithRoles } from "./adminSlice";
import agent from "../../app/api/agent";

export default function TableAdminUsers() {
  const { usersWithRoles } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    if (!usersWithRoles) dispatch(getUsersWithRoles());
  }, [usersWithRoles, dispatch]);

  function handleOpen(userInfo) {
    setOpen(true);
    setUser(userInfo);
    userInfo.roles.forEach((role) => {
      if (role === "Admin") {
        setIsAdmin(true);
      }
      if (role === "Member") {
        setIsMember(true);
      }
      if (role === "Moderator") {
        setIsModerator(true);
      }
    });
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setUser({});
      setIsAdmin(false);
      setIsMember(false);
      setIsModerator(false);
    }, 500);
  }

  async function editRolesUser() {
    setLoading(true);
    let roleList = [];
    let stringRoles = "";
    if (isAdmin) roleList.push("Admin");
    if (isMember) roleList.push("Member");
    if (isModerator) roleList.push("Moderator");
    stringRoles = roleList.join(",");
    await agent.Admin.changeUserRoles(user.userName, stringRoles)
      .then(() => dispatch(getUsersWithRoles()))
      .catch((error) => console.log(error))
      .finally(() => {
        setOpen(false);
        setTimeout(() => {
          setUser({});
          setIsAdmin(false);
          setIsMember(false);
          setIsModerator(false);
          setLoading(false);
        }, 500);
      });
  }

  if (loading) return <LoadingSmallComponent justifyContent="center" />;

  return (
    <TableContainer sx={{ mt: 2, mb: 2 }} component={Paper}>
      {usersWithRoles ? (
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Active / Roles</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersWithRoles?.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell
                  sx={{ fontWeight: "bold" }}
                  component="th"
                  scope="row"
                >
                  {user.userName}
                </StyledTableCell>
                <StyledTableCell direction="row">
                  {user.roles.join(",")}
                </StyledTableCell>
                <StyledTableCell>
                  <LoadingButton
                    onClick={() => handleOpen(user)}
                    variant="contained"
                    color="primary"
                  >
                    Edit Roles
                  </LoadingButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <LoadingSmallComponent justifyContent="center" />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 2 }} id="alert-dialog-title">
          Edit roles for {user.userName}
        </DialogTitle>
        <Divider />
        <FormGroup sx={{ m: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            }
            label="Admin"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isMember}
                onChange={(e) => setIsMember(e.target.checked)}
              />
            }
            label="Member"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isModerator}
                onChange={(e) => setIsModerator(e.target.checked)}
              />
            }
            label="Moderator"
          />
        </FormGroup>
        <Divider />
        <DialogActions sx={{ m: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={editRolesUser}
            autoFocus
          >
            Submit
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
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
