import React from "react";
import { Control, useController } from "react-hook-form"
import { TextField, InputAdornment } from "@mui/material";

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    control: Control<any>;
    required?: string;
    endContent?: JSX.Element; 
};

export const Input: React.FC<Props> = ({
    name,
    label,
    placeholder,
    type = "text",
    control,
    required = "",
    endContent,
}) => {
    const {
        field,
        fieldState: { invalid },
        formState: { errors },
    } = useController({
        name,
        control,
        rules: { required },
    });

    return (
        <TextField
            id={name}
            label={label}
            type={type}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={invalid}
            helperText={errors[name]?.message || ""}
            fullWidth
            variant="outlined"
            InputProps={{
                endAdornment: endContent ? (
                    <InputAdornment position="end">{endContent}</InputAdornment>
                ) : null,
            }}
            className="my-2" // ������ ������������� UnoCSS: ������� ������ � ����� (���� �������� UnoCSS, ����� ������������ ����������� ����������� ������)
        />
    );
};
