import { useState } from "react";
import axios from "axios";

const Login = ({
    onSignup,
    onHome,
    onLoginSuccess
}) => {



    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {
            setError("Please enter email and password");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
    "http://localhost:8000/api/v1/users/login",
    formData,
    {
        withCredentials: true,
    }
);

console.log("Login response:", response.data);

const user = response.data?.data?.user;

if (!user) {
    throw new Error("User data not received");
}


// Role based navigation
if (user.role === "admin") {

    console.log("Admin login");

} else if (user.role === "trainer") {

    console.log("Trainer login");

} else {

    onLoginSuccess();

}
        } catch (error) {

            console.error("Login error:", error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-[#080909] flex">

            {/* LEFT SIDE */}

            <div
                className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(0,0,0,.65),
                            rgba(0,0,0,.9)
                        ),
                        url("https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=90")
                    `,
                }}
            >

                <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">

                    <button
                        onClick={onHome}
                        className="absolute top-8 left-10 text-2xl font-black"
                    >
                        ⚡ Gym<span className="text-orange-500">OS</span>
                    </button>

                    <p className="text-orange-500 tracking-[4px] text-sm font-bold mb-5">
                        WELCOME BACK
                    </p>

                    <h1 className="text-7xl font-black leading-[.9] uppercase">
                        Train Hard.
                        <br />
                        Stay
                        <br />
                        <span className="text-orange-500">
                            Consistent.
                        </span>
                    </h1>

                    <p className="text-gray-300 max-w-md mt-7 leading-7">
                        Your fitness journey continues here. Log in
                        to manage your membership, workouts and progress.
                    </p>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}

                    <button
                        onClick={onHome}
                        className="lg:hidden text-white text-2xl font-black mb-12"
                    >
                        ⚡ Gym<span className="text-orange-500">OS</span>
                    </button>


                    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">

                        <div className="mb-8">

                            <p className="text-orange-500 text-xs font-bold tracking-[3px]">
                                MEMBER LOGIN
                            </p>

                            <h2 className="text-4xl font-black uppercase mt-2">
                                Welcome Back
                            </h2>

                            <p className="text-gray-500 text-sm mt-2">
                                Login to continue your fitness journey.
                            </p>

                        </div>


                        {/* Error */}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-5">
                                {error}
                            </div>
                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                            </div>


                            {/* Password */}

                            <div>

                                <div className="flex justify-between mb-2">

                                    <label className="text-sm font-semibold">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs text-orange-500 font-semibold hover:text-orange-600"
                                    >
                                        Forgot password?
                                    </button>

                                </div>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                            </div>


                            {/* Remember */}

                            <label className="flex items-center gap-2 text-sm text-gray-500">

                                <input
                                    type="checkbox"
                                    className="accent-orange-500"
                                />

                                Remember me

                            </label>


                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-black font-bold py-3.5 rounded-lg transition"
                            >

                                {loading
                                    ? "Logging in..."
                                    : "Login"
                                }

                            </button>

                        </form>


                        {/* Signup */}

                        <div className="text-center mt-7 text-sm text-gray-500">

                            Don't have an account?

                            <button
                                onClick={onSignup}
                                className="text-orange-500 font-bold ml-1 hover:text-orange-600"
                            >
                                Sign up
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;