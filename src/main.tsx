import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import Login from './components/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthProvider';
import Register from './components/Register';
import { Main } from './App';
import NotFound from './pages/NotFound';
import IndexConsultas from './pages/IndexConsultas';
import IndexAdmin from './pages/IndexAdmin';
import ProtectedAdmin from './components/auth/ProtectedAdmin';
import { AuthProvider as AuthProviderAdmin } from './components/auth/AuthProviderAdmin';
import CalendarioAdmin from './pages/CalendarioAdmin';

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
        path:"/",
        element:<ProtectedAdmin/>,
        children:[
            {
                path:"/calendario",
                element:<CalendarioAdmin/>,
            }
        ]
    },
    {
        path:"/",
        element:<ProtectedAdmin/>,
        children:[
            {
                path:"/consultas",
                element:<IndexConsultas/>,
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
    
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <AuthProviderAdmin>
                <RouterProvider router={router} />
            </AuthProviderAdmin>
        </AuthProvider>
    </React.StrictMode>
);
