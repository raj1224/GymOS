import { useState } from "react";
import axios from "axios";

const Signup = ({ onLogin, onHome }) => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setAvatar(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill all required fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        try {

            setLoading(true);

            const data = new FormData();

            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);

            if (avatar) {
                data.append("avatar", avatar);
            }

            const response = await axios.post(
                "http://localhost:8000/api/v1/users/register",
                data,
                {
                    withCredentials: true,
                }
            );

            console.log("Signup response:", response.data);

            setSuccess(
                "Account created successfully! Please login."
            );

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            setAvatar(null);

            setTimeout(() => {
                onLogin();
            }, 1200);

        } catch (error) {

            console.error("Signup error:", error);

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
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
                            rgba(0,0,0,.92)
                        ),
                        url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=90")
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
                        START YOUR JOURNEY
                    </p>

                    <h1 className="text-7xl font-black leading-[.9] uppercase">
                        BUILD.
                        <br />
                        <span className="text-orange-500">
                            BECOME.
                        </span>
                        <br />
                        BELIEVE.
                    </h1>

                    <p className="text-gray-300 max-w-md mt-7 leading-7">
                        Create your GymOS account and take the first
                        step towards becoming stronger, healthier and
                        more consistent.
                    </p>

                    <div className="flex gap-10 mt-10">

                        <div>
                            <h3 className="text-orange-500 text-2xl font-bold">
                                1000+
                            </h3>

                            <p className="text-gray-400 text-xs">
                                Members
                            </p>
                        </div>

                        <div>
                            <h3 className="text-orange-500 text-2xl font-bold">
                                20+
                            </h3>

                            <p className="text-gray-400 text-xs">
                                Trainers
                            </p>
                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}

                    <button
                        onClick={onHome}
                        className="lg:hidden text-white text-2xl font-black mb-10"
                    >
                        ⚡ Gym<span className="text-orange-500">OS</span>
                    </button>


                    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">

                        <div className="mb-7">

                            <p className="text-orange-500 text-xs font-bold tracking-[3px]">
                                CREATE ACCOUNT
                            </p>

                            <h2 className="text-4xl font-black uppercase mt-2">
                                Join GymOS
                            </h2>

                            <p className="text-gray-500 text-sm mt-2">
                                Create your account and start your fitness journey.
                            </p>

                        </div>


                        {/* Error */}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-5">
                                {error}
                            </div>
                        )}


                        {/* Success */}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg p-3 mb-5">
                                {success}
                            </div>
                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >

                            {/* Username */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                            </div>


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

                                <label className="block text-sm font-semibold mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                            </div>


                            {/* Confirm Password */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                            </div>


                            {/* Avatar */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Profile Photo{" "}
                                    <span className="text-gray-400 font-normal">
                                        (Optional)
                                    </span>
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="w-full text-sm text-gray-500
                                    file:mr-4 file:py-2
                                    file:px-4 file:rounded-lg
                                    file:border-0
                                    file:bg-orange-100
                                    file:text-orange-600
                                    file:font-semibold
                                    hover:file:bg-orange-200"
                                />

                                {avatar && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Selected: {avatar.name}
                                    </p>
                                )}

                            </div>


                            {/* Terms */}

                            <label className="flex items-start gap-2 text-xs text-gray-500 pt-1">

                                <input
                                    type="checkbox"
                                    required
                                    className="accent-orange-500 mt-0.5"
                                />

                                <span>
                                    I agree to the GymOS terms and conditions.
                                </span>

                            </label>


                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-black font-bold py-3.5 rounded-lg transition mt-2"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"
                                }
                            </button>

                        </form>


                        {/* Login */}

                        <div className="text-center mt-6 text-sm text-gray-500">

                            Already have an account?

                            <button
                                onClick={onLogin}
                                className="text-orange-500 font-bold ml-1 hover:text-orange-600"
                            >
                                Login
                            </button>

                        </div>

                        <p className="absolute bottom-5 right-8 text-xs tracking-[0.3em] text-white/50 lg:right-16">
          STRONGER EVERYDAY
          <span className="ml-3 text-green-400">━━━</span>
        </p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Signup;