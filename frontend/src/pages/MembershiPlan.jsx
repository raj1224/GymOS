import { useEffect, useState } from "react";
import axios from "axios";

const MembershipPlans = () => {

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPlans = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8000/api/v1/membership-plans"
                );

                setPlans(response.data.data || []);

            } catch (error) {

                console.error(
                    "Failed to fetch membership plans:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchPlans();

    }, []);

    return (
        <section
            id="plans"
            className="py-28 px-6 lg:px-20 bg-[#101313] text-white"
        >

            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-14">

                    <p className="text-orange-500 font-bold tracking-[3px] text-sm">
                        MEMBERSHIP
                    </p>

                    <h2 className="text-6xl font-black uppercase mt-3">
                        Choose Your{" "}
                        <span className="text-orange-500">
                            Plan
                        </span>
                    </h2>

                    <p className="text-gray-400 mt-4">
                        Flexible plans for every fitness goal.
                    </p>

                </div>

                {loading ? (

                    <p className="text-center text-gray-400">
                        Loading plans...
                    </p>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {plans.map((plan, index) => (

                            <article
                                key={plan._id}
                                className={`
                                    bg-white text-black rounded-2xl p-8
                                    ${
                                        index === 1
                                            ? "border-2 border-orange-500 lg:-translate-y-3"
                                            : ""
                                    }
                                `}
                            >

                                {index === 1 && (
                                    <span className="inline-block bg-orange-500 text-black text-xs font-black px-4 py-2 rounded-full mb-4">
                                        MOST POPULAR
                                    </span>
                                )}

                                <h3 className="text-2xl font-bold">
                                    {plan.name}
                                </h3>

                                <p className="text-gray-500 text-sm mt-2">
                                    {plan.description}
                                </p>

                                <div className="mt-7">

                                    <span className="text-4xl font-black">
                                        ₹
                                        {Number(
                                            plan.price
                                        ).toLocaleString("en-IN")}
                                    </span>

                                </div>

                                <p className="text-gray-500 text-sm mt-1">
                                    {plan.duration} month
                                    {plan.duration > 1 ? "s" : ""}
                                </p>

                                <ul className="mt-7 space-y-3 min-h-[180px]">

                                    {plan.features?.map((feature) => (

                                        <li
                                            key={feature}
                                            className="text-sm text-gray-600"
                                        >
                                            <span className="text-orange-500 font-bold">
                                                ✓
                                            </span>{" "}
                                            {feature}
                                        </li>

                                    ))}

                                </ul>

                                <button
                                    onClick={() =>
                                        (window.location.href =
                                            "/login")
                                    }
                                    className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-bold"
                                >
                                    Get Started
                                </button>

                            </article>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
};

export default MembershipPlans;