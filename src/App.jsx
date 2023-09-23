import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home";
import { Ia } from "./pages/Ia";
import { Layout } from "./pages/Layout";

export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="/" element={<Home />}/>
                    <Route path="ia" element={<Ia />}/>
                </Route>
            </Routes>
        </>
    );
}