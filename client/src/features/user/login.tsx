// ����������� ����������� ���������� � ����������
import { TextField, Button, Link } from "@mui/material"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"

import {
    useGetUsersQuery, // ������ ������ ��� Get!
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
                required="������������ ����"
                errorMessage={errors.email?.message}

            />
            <Input
                control={control} // ���������� � react-hook-form
                name="password" // �������� ����
                label="������" // �����, ������� ����� ������������ ����� � �����
                type="password" // ��� ���� (������, ������, ����� ����� �����)
                required="������������ ����" // ��������� ��� ������� ����
                errorMessage={errors.password?.message} // ������ ��� ������, ���� ����
            />
            <ErrorMessage error={error} />
            <p className="text-center text-sm">
                ��� ��������?{" "}
                <Link
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => setSelected("sign-up")} // ��� ����� ����������� �� ����� �����������
                >
                    �����������������
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                {/* ������ "�����", ������� �������� ������ ����� */}
                <Button
                    fullWidth // ������ ����� �������� ��� ������
                    color="primary" // ������ ����� �����
                    type="submit" // ��� ������ - �������� �����
                    isLoading={isLoading} // ���� ������ � ��������, ������ ������ ���������� � ����� ���������� "��������..."
                >
                    {isLoading ? "��������..." : "�����"} {/* ����� �� ������ */}
                </Button>
            </div>
        </form>
    );
};



