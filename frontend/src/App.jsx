
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom"
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Failure from "./pages/Failure";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/failure" element={<Failure />} />
                    <Route path="/payment" element={<Payment/>} />
                    <Route path="*" element={<Navigate to="/login" />} /> {/* Baad me ise chnage krlenge jab login wala functionality add ho jayrga  */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;