// Импортируем необходимые библиотеки и компоненты
import { TextField, Button, Link } from "@mui/material"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"

import {
    useGetUsersQuery, // узнать больше про Get!
    useLoginMutation,
} from "../../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ErrorMessage } from "../../components/error-message"
import { hasErrorField } from "../../utils/has-error-field"
import { LoginRequest } from "../../app/types"
import * as React from "react"
type Props = {
    setSelected: (value: string) => void;
};

export const Login = ({ setSelected }: Props) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginRequest>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: { email: "", password: "" },
    });
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [triggerCurrentQuery] = useGetUsersQuery();
    const onSubmit = async (data: LoginRequest) => {
        try {
            await login(data).unwrap();

            await triggerCurrentQuery();

            navigate("/");
        }
        catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    };
    return (
        <form
            className="flex flex-col gap-4 w-80 mx-auto p-4 bg-white shadow-md rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                control={control}
                name="email"
                label="Email"
                type="email"
                required="Обязательное поле"
                errorMessage={errors.email?.message}

            />
            <Input
                control={control} // Подключаем к react-hook-form
                name="password" // Название поля
                label="Пароль" // Текст, который будет показываться рядом с полем
                type="password" // Тип поля (пароль, значит, текст будет скрыт)
                required="Обязательное поле" // Сообщение для пустого поля
                errorMessage={errors.password?.message} // Ошибка для пароля, если есть
            />
            <ErrorMessage error={error} />
            <p className="text-center text-sm">
                Нет аккаунта?{" "}
                <Link
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => setSelected("sign-up")} // При клике переключаем на форму регистрации
                >
                    Зарегистрируйтесь
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                {/* Кнопка "Войти", которая отправит данные формы */}
                <Button
                    fullWidth // Кнопка будет занимать всю ширину
                    color="primary" // Кнопка будет синей
                    type="submit" // Тип кнопки - отправка формы
                    isLoading={isLoading} // Если запрос в процессе, кнопка станет неактивной и будет показывать "Загрузка..."
                >
                    {isLoading ? "Загрузка..." : "Войти"} {/* Текст на кнопке */}
                </Button>
            </div>
        </form>
    );
};



