import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import HomeApp from "./HomeApp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeApp />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
