import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, allowedRole }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/giris-yap" replace />;
  }

  const allowedRoles = Array.isArray(allowedRole)
    ? allowedRole
    : [allowedRole];

  if (allowedRole && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}