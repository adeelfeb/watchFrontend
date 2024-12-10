import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { AuthLayout } from './components'
import Signup from './pages/Signup'
import Login from './pages/Login'
import InputURL from './pages/InputURL.jsx'
import Dashboard from './components/Header/DashBoard.jsx'
import UserHistory from './pages/UserHistory.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/dashboard",
            element: (
                <AuthLayout authentication>
                    <Dashboard />
                </AuthLayout>
            ),
        },
        {
            path: "/history",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <UserHistory />
                </AuthLayout>
            ),
        },
        {
            path: "/add-url",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <InputURL />
                </AuthLayout>
            ),
        },
        {
            path: "/forgot-password", // The route for ForgetPassword
            element: <ForgetPassword/>
        },
        
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>

    </Provider>
  </React.StrictMode>,
)
