
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store";
import App from "./App";
import {createBrowserRouter} from 'react-router-dom'
import { CustomThemeProvider } from "./components/theme-provider";


const router = createBrowserRouter([
  {
    path: '/Auth',
    element:<h1>Auth</h1>
  },
  {
    path: '/',
    element:<h1>Layout</h1>
  }
])
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>
);
