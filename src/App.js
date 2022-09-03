import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {createContext, useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

export const appContext = createContext({
    authenticated: false,
    setAuthenticated: (state) => {},
});


function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) setAuthenticated(true)
    }, [])

    return (
      <appContext.Provider value={{ authenticated, setAuthenticated}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/auth" element={<AuthPage />}/>
            </Routes>
            <ToastContainer />
          </BrowserRouter>
      </appContext.Provider>
    );
}

export default App;
