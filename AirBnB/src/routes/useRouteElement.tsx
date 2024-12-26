import { Outlet, useRoutes } from "react-router-dom"
import { PATH } from "./path";
import HomePage from "../modules/home/HomePage";
import { MainLayout } from "../layouts/MainLayout";
import { UserPage } from "../modules/admin/users";
import { RoomPage } from "../modules/admin/rooms";
import { BookingPage } from "../modules/admin/bookings";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

const useRouteElements = () => {
  const routes = useRoutes([
    {
      path: PATH.HOME,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    },
    {
      path: PATH.ADMIN.ROOT,
      element:
        <AdminLayout>
          <Outlet />
        </AdminLayout>,
      children: [
        {
          path: PATH.ADMIN.USERS,
          element: <UserPage />
        },
        {
          path: PATH.ADMIN.ROOMS,
          element: <RoomPage />
        },
        {
          path: PATH.ADMIN.BOOKING,
          element: <BookingPage />
        }
      ]
    },
    {
      path: '*',
      element: <div>Not found</div>,
    },
  ]);
  return { routes };
}

export default useRouteElements;