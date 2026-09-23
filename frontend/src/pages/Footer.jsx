import React from 'react'

const Footer = () => {
    const scrollToSection = (id) => {
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="bg-[#070808] text-white">

            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-14">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <button
                            onClick={() => scrollToSection("home")}
                            className="text-2xl font-extrabold"
                        >
                            ⚡ Gym<span className="text-orange-500">OS</span>
                        </button>

                        <p className="text-gray-400 text-sm leading-6 mt-5 max-w-xs">
                            Train smart. Stay consistent. Build a stronger,
                            healthier and happier version of yourself.
                        </p>

                        <div className="flex gap-3 mt-6">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black transition"
                            >
                                Instagram
                            </a>

                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black transition"
                            >
                                X
                            </a>

                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-black transition"
                            >
                                FB
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-5">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3">

                            {[
                                ["home", "Home"],
                                ["about", "About"],
                                ["plans", "Membership Plans"],
                                ["trainers", "Trainers"],
                            ].map(([id, name]) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className="text-left text-sm text-gray-400 hover:text-orange-500 transition"
                                >
                                    {name}
                                </button>
                            ))}

                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="font-bold text-lg mb-5">
                            Explore
                        </h3>

                        <div className="flex flex-col gap-3">

                            {[
                                ["gallery", "Gallery"],
                                ["testimonials", "Testimonials"],
                                ["contact", "Contact"],
                            ].map(([id, name]) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className="text-left text-sm text-gray-400 hover:text-orange-500 transition"
                                >
                                    {name}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    (window.location.href = "/login")
                                }
                                className="text-left text-sm text-gray-400 hover:text-orange-500 transition"
                            >
                                Login
                            </button>

                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-5">
                            Get In Touch
                        </h3>

                        <div className="space-y-4 text-sm">

                            <div>
                                <p className="text-gray-500">
                                    Email
                                </p>

                                <p className="text-gray-300 mt-1">
                                    support@gymos.com
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Phone
                                </p>

                                <p className="text-gray-300 mt-1">
                                    +91 98765 43210
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Location
                                </p>

                                <p className="text-gray-300 mt-1">
                                    Meerut, Uttar Pradesh, India
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 mt-12 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-gray-500 text-sm">
                        © 2026 GymOS. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm text-gray-500">

                        <button className="hover:text-orange-500 transition">
                            Privacy Policy
                        </button>

                        <button className="hover:text-orange-500 transition">
                            Terms & Conditions
                        </button>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;