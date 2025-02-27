//import React, { useState } from 'react'
//import { Login } from "../../features/user/login"
//import { Register } from "../../features/user/register"
//import { useAuthGuard } from "../../hooks/useAuthGuard"
//import { Card, CardContent, Tabs, Tab } from "@mui/material"
//export const Auth = () => {
//    const [selected, setSelected] = useState("login");
//    useAuthGuard();
//    return (
//        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
//          <div className="flex flex-col">
//                <Card className="max-w-full w-85 h-112 shadow-lg rounded-lg">
//                    <CardContent className="overflow-hidden">
//                        <Tabs fullWidth
//                            value={selected} 
//                            onChange={(_, newValue) => setSelected(newValue)} 
//                            variant="fullWidth" 
//                            className="border-b border-gray-300">
//                            <Tab label="login" className="text-lg">
//                                <Login setSelected={setSelected }/>
                               
//                            </Tab>

//                            <Tab label="registration" className="text-lg">
//                                <Register setSelected={setSelected} />
//                            </Tab>
                                
                            
//                        </Tabs>
//                    </CardContent>
//                </Card>
//          </div>
//        </div>
//      );
//    };
    
//    export default Auth;