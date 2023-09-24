import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Ia from "./pages/Ia";
import Tracking from "./pages/Tracking";
import Us from "./pages/Us";
import Layout from "./pages/Layout";

export const App = () => {
    return (
        <>
            <Routes>
                <Route element={<Layout />} >
                    <Route path="/" element={<Home />}/>
                    <Route path="/ia" element={<Ia />}/>
                    <Route path="/monitoreo" element={<Tracking />}/>
                    <Route path="/nosotros" element={<Us />}/>
                </Route>
            </Routes>
        </>
    );
}