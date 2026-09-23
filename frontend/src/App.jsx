import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MemberDashboard from "./pages/MemberDashboard";
import MemberProfile from "./pages/MemberProfile";

function App() {

    const [page, setPage] = useState("home");

    return (
        <>
            {page === "home" && (
    <Home
        onLogin={() => setPage("login")}
        onSignup={() => setPage("signup")}
    />
)}

{page === "login" && (
    <Login
        onSignup={() => setPage("signup")}
        onHome={() => setPage("home")}
        onLoginSuccess={() => setPage("member-dashboard")}
    />
)}

{page === "signup" && (
    <Signup
        onLogin={() => setPage("login")}
        onHome={() => setPage("home")}
    />
)}

{page === "member-dashboard" && (
    <MemberDashboard
        onProfile={() => setPage("member-profile")}
    />
)}

{page === "member-profile" && (
    <MemberProfile
        onBack={() => setPage("member-dashboard")}
    />
)}
        </>
    );
}

export default App;