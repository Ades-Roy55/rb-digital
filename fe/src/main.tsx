import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BgVideo from "./Compenent/BgVideo.tsx";
import Login from "./Login.tsx";
import Books from "./Pages/Books.tsx";
import Signup from "./Signup.tsx";
import Collection from "./Pages/Collection.tsx";
import Profile from "./Pages/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
    
  },
  {
    element : <App/>,
    children: [
      {
        path: "/home",
        element: <BgVideo />
      },
      {
        path: "/books",
        element: <Books />
      },
      {
        path: "/collection",
        element: <Collection />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
