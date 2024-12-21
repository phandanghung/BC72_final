import { Outlet, useRoutes } from "react-router-dom"
import { PATH } from "./path";
import HomePage from "../modules/home/HomePage";
import { MainLayout } from "../layouts/MainLayout";

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
      element: <Outlet/>,
      children: [
        {

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