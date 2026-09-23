const About = () => {

    const features = [
        {
            number: "01",
            title: "Modern Equipment",
            description:
                "Train with quality equipment built for every fitness goal."
        },
        {
            number: "02",
            title: "Expert Trainers",
            description:
                "Get guidance from trainers who understand your goals."
        },
        {
            number: "03",
            title: "Flexible Plans",
            description:
                "Choose a membership that fits your routine and budget."
        },
        {
            number: "04",
            title: "Supportive Community",
            description:
                "Surround yourself with people who keep you motivated."
        }
    ];

    return (
        <section
            id="about"
            className="py-28 px-6 lg:px-20 bg-white"
        >

            <div className="max-w-7xl mx-auto">

                <div className="max-w-2xl mb-14">

                    <p className="text-orange-500 font-bold tracking-[3px] text-sm">
                        WHY GYMOS?
                    </p>

                    <h2 className="text-6xl font-black uppercase leading-none mt-3">
                        More Than A Gym.
                        <br />
                        <span className="text-orange-500">
                            A Healthier You.
                        </span>
                    </h2>

                    <p className="text-gray-500 mt-6 leading-7">
                        Everything you need to train consistently,
                        stay accountable and enjoy the journey.
                    </p>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                    {features.map((feature) => (

                        <article
                            key={feature.number}
                            className="border border-gray-200 rounded-2xl p-7 hover:border-orange-500 hover:-translate-y-1 transition"
                        >

                            <span className="text-orange-500 font-bold">
                                {feature.number}
                            </span>

                            <h3 className="text-xl font-bold mt-14">
                                {feature.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-6 mt-3">
                                {feature.description}
                            </p>

                        </article>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default About;