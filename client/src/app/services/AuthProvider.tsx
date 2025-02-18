// src/app/services/AuthProvider.tsx
import React, { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUserQuery } from "./userApi";
import { setUser, setLoading } from "./authSlice";
import { RootState } from "../store";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: user, isLoading } = useCurrentUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
    dispatch(setLoading(false));
  }, [user, dispatch]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
