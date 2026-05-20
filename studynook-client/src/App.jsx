import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
// import AllRooms from "./pages/AllRooms";
// import RoomDetails from "./pages/RoomDetails";
// import AddRoom from "./pages/AddRoom";
// import MyListings from "./pages/MyListings";
// import MyBookings from "./pages/MyBookings";
// import UpdateRoom from "./pages/UpdateRoom";
import Login from "./pages/Login";
// import Register from "./pages/Register";
// import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      // {
      //   path: "/rooms",
      //   element: <AllRooms />
      // },
      // {
      //   path: "/rooms/:id",
      //   element: <RoomDetails />
      // },
      {
        path: "/login",
        element: <Login />
      },
      // {
      //   path: "/register",
      //   element: <Register />
      // },

      // {
      //   path: "/add-room",
      //   element: <PrivateRoute><AddRoom /></PrivateRoute>
      // },
      // {
      //   path: "/my-listings",
      //   element: <PrivateRoute><MyListings /></PrivateRoute>
      // },
      // {
      //   path: "/my-bookings",
      //   element: <PrivateRoute><MyBookings /></PrivateRoute>
      // },
      // {
      //   path: "/update-room/:id",
      //   element: <PrivateRoute><UpdateRoom /></PrivateRoute>
      // }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
