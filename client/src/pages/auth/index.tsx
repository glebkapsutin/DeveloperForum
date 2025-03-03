import React, { useState } from "react";
import { Login } from "../../features/user/login";
import { Register } from "../../features/user/register";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { Card, CardContent, Tabs, Tab } from "@mui/material";

export const Auth = () => {
  const [selected, setSelected] = useState("login");
  useAuthGuard();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <Tabs
          value={selected}
          onChange={(_, newValue) => setSelected(newValue)}
          variant="fullWidth"
          className="border-b border-gray-300 dark:border-gray-700"
        >
          <Tab value="login" label="Вход" className="text-lg font-semibold text-gray-800 dark:text-gray-200" />
          <Tab value="registration" label="Регистрация" className="text-lg font-semibold text-gray-800 dark:text-gray-200" />
        </Tabs>

        <CardContent className="p-6">
          {selected === "login" && <Login setSelected={setSelected} />}
          {selected === "registration" && <Register setSelected={setSelected} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
