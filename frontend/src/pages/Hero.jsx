const Hero = () => {

    const scrollToPlans = () => {
        document
            .getElementById("plans")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center px-6 lg:px-20 pt-20 bg-cover bg-center relative"
            style={{
                backgroundImage: `
                    linear-gradient(
                        90deg,
                        rgba(0,0,0,.95),
                        rgba(0,0,0,.65),
                        rgba(0,0,0,.15)
                    ),
                    url("https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=2200&q=90")
                `
            }}
        >

            <div className="max-w-7xl mx-auto w-full">

                <div className="max-w-2xl text-white">

                    <p className="text-orange-500 tracking-[4px] text-sm font-bold mb-5">
                        YOUR FITNESS. YOUR FUTURE.
                    </p>

                    <h1 className="text-7xl md:text-8xl lg:text-[110px] font-black leading-[.85]">
                        STRONGER.
                        <br />
                        HEALTHIER.
                        <br />
                        <span className="text-orange-500">
                            HAPPIER.
                        </span>
                    </h1>

                    <p className="text-gray-300 leading-7 max-w-xl mt-8">
                        Train with purpose, track your progress and build
                        the strongest version of yourself at GymOS.
                    </p>

                    <div className="flex gap-4 mt-8">

                        <button
                            onClick={scrollToPlans}
                            className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-7 py-4 rounded-lg"
                        >
                            Start Your Journey →
                        </button>

                        <button
                            onClick={() =>
                                document
                                    .getElementById("about")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                            className="border border-white/30 bg-white/10 text-white px-7 py-4 rounded-lg font-bold"
                        >
                            Explore GymOS
                        </button>

                    </div>

                    <div className="flex gap-12 mt-16">

                        <div>
                            <h3 className="text-orange-500 text-2xl font-bold">
                                5+
                            </h3>
                            <p className="text-gray-400 text-xs">
                                Years Experience
                            </p>
                        </div>

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
                                Expert Trainers
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;