import React from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { useCurrentQuery } from "../app/services/userApi";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Занимает всю высоту окна браузера
        }}
      >
        <ClipLoader color="#1976d2" size={50} />
      </div>
    );
  }

  return children;
};
