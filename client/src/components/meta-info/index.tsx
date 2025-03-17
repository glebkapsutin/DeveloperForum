import { useTheme } from "@mui/material/styles"
import React from "react"
import { IconType } from "react-icons"

type Props = {
    count: number
    Icon: IconType
    iconStyle?: React.CSSProperties
}

export const MetaInfo: React.FC<Props> = ({ count, Icon, iconStyle }) => {
    const theme = useTheme();
    return (
        <div className="flex items-center gap-2 cursor-pointer">
            {count > 0 && (
                <p className="font-semibold text-l"style={{color: theme.palette.text.primary}}>{count}</p>
            )}
            <p className="text-xl hover:text-2xl ease-in duration-100" style={iconStyle}>
                <Icon />
            </p>
        </div>
    )
}