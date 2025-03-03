import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { Button, Link } from "@mui/material"
import { useRegisterUserMutation } from "../../app/services/userApi"
import { ErrorMessage } from "../../components/error-message"

import { useState } from "react"
import * as React from "react"

type Register = {
    email: string
    name: string
    password: string
}

type Props = {
    setSelected: (value: string) => void
}

export const Register = ({ setSelected }: Props) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Register>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    })

    const [register] = useRegisterUserMutation()
    const [error, setError] = useState("")

    const onSubmit = async (data: Register) => {
        
            await register(data).unwrap()
            setSelected("login")
        
    }

    return (
        <form className="flex flex-col gap-4 w-full mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                control={control}
                required="Обязательное поле"
                label="Имя"
                name="name"
            />
            <Input
                control={control}
                name="email"
                label="Email"
                type="email"
                required="Обязательное поле"
            />
            <Input
                control={control}
                name="password"
                label="Пароль"
                type="password"
                required="Обязательное поле"
            />
            <ErrorMessage error={error} />

            <p className="text-center text-sm">
                Уже есть аккаунт?{" "}
                <Link
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setSelected("login")}
                >
                   Войдите
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit">
                   Зарегистрируйтесь
                </Button>
            </div>
        </form>
    )
}