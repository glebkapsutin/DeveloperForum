import { useEffect } from "react"

import { Header } from "../header"
import * as React from "react"
import { NavBar } from "../nav-bar/index"
import { Outlet, useNavigate } from "react-router-dom"
import { Container } from "../container/index"
import { Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { selectIsAuthenticated, selectUsers } from "../../features/user/userSlice"

export const Layout = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user= useSelector(selectUsers);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isAuthenticated)
            {
                navigate('/auth')
            }
    },[])

    return (
        <>
            <Header />
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <NavBar />
                    </Grid>
                    <Grid item xs={9}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
