/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

export default function PrivateRoute({ children }: any) {
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user && !localStorage.getItem("user")) {
    return <Navigate to="/" />;
  }

  return children;
}