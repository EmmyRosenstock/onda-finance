import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "../redux/store";

type Props = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const storedUser = localStorage.getItem("user");

  if (!user && !storedUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}