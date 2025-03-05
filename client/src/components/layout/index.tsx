import { useEffect } from "react"

import { Header } from "../header"
import * as React from "react"
import { NavBar } from "../nav-bar/index"
import { Outlet, useNavigate } from "react-router-dom"
import { Container } from "../container/index"
import { Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { selectIsAuthenticated, selectUser} from "../../features/user/userSlice"

export const Layout = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user= useSelector(selectUser);
    const navigate = useNavigate();
   

    useEffect(() => {
        
       
        if (!isAuthenticated ) {
            navigate("/Auth");
        } 
    }, []);


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
