import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../button"
    
type Props = {
    children: React.ReactNode
    icon: JSX.Element
    href: string
}

export const NavButton: React.FC<Props> = ({ children, icon, href }) => {
    return (
        <Button
            component={Link}
            to={href}
            startIcon={icon}
            variant="text"
            sx={{
                display: 'flex',                // эквивалент flex
                justifyContent: 'flex-start',    // эквивалент justify-start
                fontSize: '1.25rem',             // эквивалент text-xl
            }}
        >
            {children}
        </Button>
    )
}
