import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './stars.js'

import App, { People, Planets, Films, Home, ErrorPage, PeopleSidebar, Person, PlanetsSidebar, Planet, FilmsSidebar, Film } from './App'

import './index.css'

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { 
                path: 'people',
                element: <PeopleSidebar />,
                children: [
                    { index: true, element: <People />},
                    {path: ':person', element: <Person />}
                ]
            },
            {
                path: 'planets',
                element: <PlanetsSidebar />,
                children: [
                    {index: true, element: <Planets />},
                    {path: ':planet', element: <Planet />}
                ]
            },
            {
                path: 'films',
                element: <FilmsSidebar />,
                children: [
                    {index: true, element: <Films />},
                    {path: ':film', element: <Film />}
                ]
            }
        ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)