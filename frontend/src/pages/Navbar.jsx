const Navbar = ({ onLogin, onSignup }) => {
    const scrollToSection = (id) => {
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

                {/* Logo */}
                <button
                    onClick={() => scrollToSection("home")}
                    className="text-2xl font-extrabold text-white"
                >
                    ⚡ Gym<span className="text-orange-500">OS</span>
                </button>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-7">

                    <button
                        onClick={() => scrollToSection("home")}
                        className="text-sm text-gray-300 hover:text-orange-500 transition"
                    >
                        Home
                    </button>

                    <button
                        onClick={() => scrollToSection("about")}
                        className="text-sm text-gray-300 hover:text-orange-500 transition"
                    >
                        About
                    </button>

                    <button
                        onClick={() => scrollToSection("plans")}
                        className="text-sm text-gray-300 hover:text-orange-500 transition"
                    >
                        Plans
                    </button>

                    <button
                        onClick={() => scrollToSection("trainers")}
                        className="text-sm text-gray-300 hover:text-orange-500 transition"
                    >
                        Trainers
                    </button>

                    <button
                        onClick={() => scrollToSection("gallery")}
                        className="text-sm text-gray-300 hover:text-orange-500 transition"
                    >
                        Gallery
                    </button>

                    <button
                        onClick={() => scrollToSection("testimonials")}
                        className="text-sm text-gray-300 hover:text-orange-500 transition"
                    >
                        Testimonials
                    </button>

                    <button
                        onClick={() => scrollToSection("contact")}
                        className="text-sm text-gray-300 hover:text-orange-500 transition"
                    >
                        Contact
                    </button>

                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">

                    <button
                        onClick={onLogin}
                        className="text-sm font-semibold text-white hover:text-orange-500 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={onSignup}
                        className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-5 py-3 rounded-lg transition"
                    >
                        Join Now
                    </button>

                </div>

            </div>
        </header>
    );
};

export default Navbar;