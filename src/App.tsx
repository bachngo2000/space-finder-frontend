import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useState } from 'react';
import LoginComponent from './components/LoginComponent';
import { AuthService } from './services/AuthService';
import { DataService } from './services/DataService';
import CreateSpace from './components/spaces/CreateSpace'
import Spaces from './components/spaces/Spaces';

const authService = new AuthService();

const dataService = new DataService(authService);

function App() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar userName={userName}/>
          <Outlet />
        </>
      ),
      children:[
        {
          path: "/",
          element: <div>Welcome to Space Finder!</div>,
        },
        {
          path: "/login",
          element: <LoginComponent authService={authService} setUserNameCb={setUserName}/>,
        },
        {
          path: "/profile",
          element: <div>
                    Welcome to the Profile page!
                      <h2>Please navigate to the Spaces tab to view your spaces</h2>
                  </div>,
        },
        {
          path: "/createSpace",
          element: <CreateSpace dataService={dataService}/>,
        },
        {
          path: "/spaces",
          element: <Spaces dataService={dataService}/>,
        },
      ]
    },
  ]);


  return (
    <div className="wrapper">
      <RouterProvider router={router} />
    </div>
  )
}


export default App
