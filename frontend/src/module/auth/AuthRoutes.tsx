
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Asegúrate de que exista este hook

interface Props {
  children?: ReactNode;
}

export function AuthRoutes({ children }: Props) {
  const { token } = useAuth(); // Asegúrate de que useAuth devuelva `token`

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
