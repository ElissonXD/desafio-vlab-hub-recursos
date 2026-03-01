import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import MainPage from './views/MainPage/MainPage.jsx'
import CreateCard from './views/CreateCard/CreateCard.jsx'
import EditCard from './views/EditCard/EditCard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: '/',
      element: <MainPage />
    },
    {
      path: '/criar',
      element: <CreateCard />
    },
    {
      path: '/editar/:id',
      element: <EditCard />
    }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
