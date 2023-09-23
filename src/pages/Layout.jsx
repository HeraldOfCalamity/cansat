import { Outlet, Link } from "react-router-dom"
import { Header } from "../components/Header"

export const Layout = () => {
    return (
        <>
            <Header />
            <hr />
            <Outlet />
        </>
    )
}
