import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Link } from "@mui/material";
import { Input } from "../../components/input";
import { ErrorMessage } from "../../components/error-message";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useCurrentQuery } from "../../app/services/userApi";
import { LoginRequest } from "../../app/types";

type Props = {
  setSelected: (value: string) => void;
};

export const Login = ({ setSelected }: Props) => {
  const { handleSubmit, control } = useForm<LoginRequest>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { refetch: triggerCurrentQuery } = useCurrentQuery();

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data).unwrap();
      await triggerCurrentQuery();
      navigate("/");
    } catch {
      setError("Ошибка входа. Проверьте данные.");
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} name="email" label="Email" type="email" required="Обязательное поле" />
      <Input control={control} name="password" label="Пароль" type="password" required="Обязательное поле" />
      <ErrorMessage error={error} />

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Нет аккаунта?{" "}
        <Link className="cursor-pointer" onClick={() => setSelected("registration")}>
          Зарегистрируйтесь
        </Link>
      </p>

      <Button fullWidth variant="contained" color="primary" type="submit" disabled={isLoading}>
        Войти
      </Button>
    </form>
  );
};

