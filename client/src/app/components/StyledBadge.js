import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";

export const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    "&::after": {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(1.4)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2, 2)",
      opacity: 0,
    },
  },
}));
