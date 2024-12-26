import React from 'react';
import 'normalize.css';
import {useTitle} from "ahooks";
import {RouterProvider} from "react-router-dom";
import router from "./router"; // Import normalize.css first

function App() {
    useTitle("questionnaire")

    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default App;
