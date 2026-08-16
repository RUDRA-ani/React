import { createBrowserRouter,type RouteObject } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import { RouteErrorBoundary } from "../layouts/RouteErrorBoundary";
import Home from "../pages/homepage";
import EditorLayout from "../layouts/EditorLayout";
import Editor from "../pages/editor";
 export const router = createBrowserRouter([
    {
        path:'/',
        element:<RootLayout/>,
        errorElement:<RouteErrorBoundary/>,
        children:[
            {
                index:true,
                element:<Home/>,
                

            },
            
            {
                path:"editor",
                element:<EditorLayout/>,
                children:[
                    {
                        index:true,
                        element:<Editor/>
                    }
                ]

            }
        ]
    }
])