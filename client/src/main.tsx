
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store";

import {createBrowserRouter} from 'react-router-dom'
import { CustomThemeProvider } from "./components/theme-provider";
import { Layout } from "./components/layout/index";
import { CurrentPost } from "./pages/current-post/index";
import { Posts } from "./pages/posts/index";
import { Followers } from "./pages/followers/index";
import { UserProfile } from "./pages/user-profile/index";
import { Following } from "./pages/following/index";
import { RouterProvider } from "../node_modules/react-router-dom/dist/index";
import { Auth } from "./pages/auth/index";
import "uno.css";
import { AuthGuard } from "./features/ AuthGuard"


const router = createBrowserRouter([
  {
    path: '/Auth',
    element:<Auth />
  },
  {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Posts />,
            },
            {
                path: "posts/:id",
                element: <CurrentPost />,
            },
            {
                path: "users/:id",
                element: <UserProfile />,
            },
            {
                path: "followers",
                element: <Followers />,
            },
            {
                path: "following",
                element: <Following />,
            },

        ],
  },
])
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <AuthGuard>
          <RouterProvider router={router } />
        </AuthGuard>
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>
);
