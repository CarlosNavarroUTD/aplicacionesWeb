// import OrderTable from "../order/OrderTable";
// import ProductTable from "../product/Product/ProductTable";
// import UserForm from "../user/UserForm";
// import Reportes from "../report/Reports"; // Asegúrate de tener este componente creado
// import type { JSX } from "react";

// export interface MenuRoute {
//   path: string;
//   element: JSX.Element;
//   title: string;
// }

// const routes: MenuRoute[] = [
//   {
//     path: '/dashboard',
//     element: <p>Dashboard</p>,
//     title: 'Dashboard'
//   },
//   {
//     path: '/users',      
//     element: <UserForm />,
//     title: 'Usuarios'
//   },
//   {
//     path: '/products',
//     element: <ProductTable />,
//     title: 'Productos'
//   },
//   {
//     path: '/orders',
//     element: <OrderTable />,
//     title: 'Órdenes'
//   },
//   {
//     path: '/report',
//     element: <Reportes />,
//     title: 'Reportes'
//   }
// ];

// export default routes;
import OrderTable from "../order/OrderTable";
import ProductTable from "../product/Product/ProductTable";
import UserForm from "../user/UserForm";
import Reportes from "../report/Reports";
import type { JSX } from "react";

// Si tienes una vista principal del dashboard, crea un componente real para evitar que solo sea un <p>
const DashboardWelcome = () => (
  <div style={{ padding: 20 }}>
    <h1>Bienvenida al Dashboard</h1>
    <p>Selecciona una opción del menú lateral para comenzar.</p>
  </div>
);

export interface MenuRoute {
  path: string;
  element: JSX.Element;
  title: string;
}

const routes: MenuRoute[] = [
  {
    path: '', // Ruta raíz dentro de Dashboard
    element: <DashboardWelcome />,
    title: 'Dashboard'
  },
  {
    path: 'users',
    element: <UserForm />,
    title: 'Usuarios'
  },
  {
    path: 'products',
    element: <ProductTable />,
    title: 'Productos'
  },
  {
    path: 'orders',
    element: <OrderTable />,
    title: 'Órdenes'
  },
  {
    path: 'report',
    element: <Reportes />,
    title: 'Reportes'
  }
];

export default routes;
