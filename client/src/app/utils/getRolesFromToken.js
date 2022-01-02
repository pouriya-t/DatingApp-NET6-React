export default function getRolesFromToken(token) {
  const { role } = JSON.parse(atob(token.split(".")[1]));
  return role;
}

//   const roles =
//   claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

//   return typeof roles === "string" ? [roles] : roles;
