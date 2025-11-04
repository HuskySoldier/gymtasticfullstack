import { useRoutes } from "react-router-dom";

import { RobotsApp } from "../RobotsApp";
import { RobotComponent } from "../pages/robotComponents";

export const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <RobotsApp />
        },
        {
            path: '/robot-component/:id',
            element: <RobotComponent />
        },
        {
            path: '*',
            element: <div>Pagina no encontrada - 404</div>
        }
    ]);

    return routes;
}