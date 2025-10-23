import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import Login from './components/Login.tsx';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import { AuthProvider } from './components/auth/AuthProvider.tsx';
import Register from './components/Register.tsx';
import { Main } from './App.tsx';
import NotFound from './pages/NotFound.tsx';
import IndexConsultas from './pages/IndexConsultas.tsx';
import IndexAdmin from './pages/IndexAdmin.tsx';
import ProtectedAdmin from './components/auth/ProtectedAdmin.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/consultas",
        element: <IndexConsultas />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path:"/",
        element:<ProtectedRoute/>,
        children:[
            {
                path:"/main",
                element:<Main/>,
            }
        ]
    },
    {
        path:"/",
        element:<ProtectedAdmin/>,
        children:[
            {
                path:"/admin",
                element:<IndexAdmin/>,
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
    
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLBRElement).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
