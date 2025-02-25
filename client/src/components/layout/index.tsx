import { useEffect } from "react"

import { Header } from "../header"
import * as React from "react"
import { NavBar } from "../nav-bar/index"
import { Outlet } from "react-router-dom"
import { Container } from "../container/index"
import { Grid } from "@mui/material"

export const Layout = () => {
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
