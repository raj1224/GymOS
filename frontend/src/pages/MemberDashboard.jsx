import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api/v1";

const MemberDashboard = ({ onProfile }) => {

    const [user, setUser] = useState(null);
    const [member, setMember] = useState(null);
    const [membership, setMembership] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {

        try {

            setLoading(true);
            setError("");

            const [userResponse, memberResponse, membershipResponse] =
                await Promise.allSettled([

                    axios.get(
                        `${API}/users/current-user`,
                        {
                            withCredentials: true,
                        }
                    ),

                    axios.get(
                        `${API}/members/me`,
                        {
                            withCredentials: true,
                        }
                    ),

                    axios.get(
                        `${API}/memberships/me`,
                        {
                            withCredentials: true,
                        }
                    ),

                ]);

            // Current User
            if (userResponse.status === "fulfilled") {
                setUser(
                    userResponse.value.data?.data
                );
            }

            // Member Profile
            if (memberResponse.status === "fulfilled") {
                setMember(
                    memberResponse.value.data?.data
                );
            }

            // Membership
            if (membershipResponse.status === "fulfilled") {
                setMembership(
                    membershipResponse.value.data?.data
                );
            }

        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard."
            );

        } finally {

            setLoading(false);

        }
    };


    const handleLogout = async () => {

        try {

            await axios.post(
                `${API}/users/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            window.location.reload();

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-[#080909] flex items-center justify-center text-white">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />

                    <p className="text-gray-400 mt-4">
                        Loading dashboard...
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#f4f5f4]">

            {/* NAVBAR */}

            <header className="h-20 bg-[#080909] text-white flex items-center justify-between px-6 lg:px-10">

                <div className="text-2xl font-black">
                    ⚡ Gym<span className="text-orange-500">OS</span>
                </div>

                <div className="flex items-center gap-5">

                    <div className="hidden sm:block text-right">

                        <p className="text-sm font-bold">
                            {user?.username || "Member"}
                        </p>

                        <p className="text-xs text-gray-400">
                            Member
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="border border-white/20 hover:border-orange-500 px-4 py-2 rounded-lg text-sm transition"
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* MAIN */}

            <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

                {/* ERROR */}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6">
                        {error}
                    </div>
                )}


                {/* WELCOME */}

                <div className="mb-10">

                    <p className="text-orange-500 font-bold tracking-[3px] text-xs">
                        MEMBER DASHBOARD
                    </p>

                    <h1 className="text-4xl md:text-5xl font-black mt-2">
                        Welcome back,{" "}
                        <span className="text-orange-500">
                            {user?.username || "Member"}
                        </span>
                        👋
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Track your membership and stay consistent
                        with your fitness journey.
                    </p>

                </div>


                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                    {/* Membership */}

                    <div className="bg-white rounded-2xl p-6 border border-gray-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Membership
                                </p>

                                <h2 className="text-2xl font-black mt-2">
                                    {membership?.membership?.plan?.name ||
                                        membership?.plan?.name ||
                                        "No Active Plan"}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                                💳
                            </div>

                        </div>

                    </div>


                    {/* Days Left */}

                    <div className="bg-white rounded-2xl p-6 border border-gray-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Days Remaining
                                </p>

                                <h2 className="text-3xl font-black mt-2 text-orange-500">
                                    {membership?.daysLeft ?? 0}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                                📅
                            </div>

                        </div>

                    </div>


                    {/* Trainer */}

                    <div className="bg-white rounded-2xl p-6 border border-gray-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 text-sm">
                                    My Trainer
                                </p>

                                <h2 className="text-xl font-black mt-2">
                                    {member?.trainer?.user?.username ||
                                        "Not Assigned"}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                                🏋️
                            </div>

                        </div>

                    </div>

                </div>


                {/* CONTENT GRID */}

                <div className="grid lg:grid-cols-3 gap-6">


                    {/* MEMBERSHIP */}

                    <div className="lg:col-span-2 bg-[#101313] rounded-2xl p-7 text-white">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-orange-500 text-xs font-bold tracking-[2px]">
                                    CURRENT MEMBERSHIP
                                </p>

                                <h2 className="text-3xl font-black mt-2">
                                    {membership?.membership?.plan?.name ||
                                        membership?.plan?.name ||
                                        "No Active Membership"}
                                </h2>

                            </div>

                            {membership?.isActive && (
                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                                    ACTIVE
                                </span>
                            )}

                        </div>


                        {membership ? (

                            <div className="grid md:grid-cols-3 gap-5 mt-8">

                                <div>
                                    <p className="text-gray-500 text-xs">
                                        Start Date
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {membership.membership?.startDate
                                            ? new Date(
                                                membership.membership.startDate
                                            ).toLocaleDateString()
                                            : membership.startDate
                                                ? new Date(
                                                    membership.startDate
                                                ).toLocaleDateString()
                                                : "-"}
                                    </p>
                                </div>


                                <div>
                                    <p className="text-gray-500 text-xs">
                                        End Date
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {membership.membership?.endDate
                                            ? new Date(
                                                membership.membership.endDate
                                            ).toLocaleDateString()
                                            : membership.endDate
                                                ? new Date(
                                                    membership.endDate
                                                ).toLocaleDateString()
                                                : "-"}
                                    </p>
                                </div>


                                <div>
                                    <p className="text-gray-500 text-xs">
                                        Days Left
                                    </p>

                                    <p className="font-semibold mt-1 text-orange-500">
                                        {membership.daysLeft ?? 0} days
                                    </p>
                                </div>

                            </div>

                        ) : (

                            <div className="mt-8">

                                <p className="text-gray-400">
                                    You don't have an active membership.
                                </p>

                                <button
                                    className="mt-5 bg-orange-500 hover:bg-orange-600 text-black font-bold px-5 py-3 rounded-lg"
                                >
                                    Browse Plans
                                </button>

                            </div>

                        )}

                    </div>


                    {/* PROFILE */}

                    <div className="bg-white rounded-2xl p-7 border border-gray-200">

                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-black">
                                My Profile
                            </h2>

                            <button onClick={onProfile}
    className="text-orange-500 text-sm font-bold">
                                Edit
                            </button>

                        </div>


                        <div className="flex items-center gap-4 mt-7">

                            <img
                                src={
                                    user?.avatar ||
                                    "https://ui-avatars.com/api/?name=Member"
                                }
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover"
                            />

                            <div>

                                <h3 className="font-bold">
                                    {user?.username || "Member"}
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    {user?.email || "-"}
                                </p>

                            </div>

                        </div>


                        <div className="border-t mt-6 pt-5 space-y-4">

                            <div>

                                <p className="text-xs text-gray-400">
                                    Phone
                                </p>

                                <p className="text-sm font-semibold mt-1">
                                    {member?.phone || "Not added"}
                                </p>

                            </div>


                            <div>

                                <p className="text-xs text-gray-400">
                                    Gender
                                </p>

                                <p className="text-sm font-semibold mt-1 capitalize">
                                    {member?.gender || "Not added"}
                                </p>

                            </div>


                            <div>

                                <p className="text-xs text-gray-400">
                                    Address
                                </p>

                                <p className="text-sm font-semibold mt-1">
                                    {member?.address || "Not added"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* TRAINER */}

                <div className="bg-white rounded-2xl border border-gray-200 p-7 mt-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-orange-500 text-xs font-bold tracking-[2px]">
                                MY TRAINER
                            </p>

                            <h2 className="text-2xl font-black mt-2">
                                Training & Guidance
                            </h2>

                        </div>

                    </div>


                    {member?.trainer ? (

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-7">

                            <img
                                src={
                                    member.trainer.image ||
                                    member.trainer.user?.avatar ||
                                    "https://ui-avatars.com/api/?name=Trainer"
                                }
                                alt="Trainer"
                                className="w-24 h-24 rounded-2xl object-cover"
                            />

                            <div>

                                <h3 className="text-xl font-bold">
                                    {member.trainer.user?.username ||
                                        "Trainer"}
                                </h3>

                                <p className="text-orange-500 text-sm mt-1">
                                    {member.trainer.specialization?.join(
                                        " • "
                                    ) || "Fitness Trainer"}
                                </p>

                                <p className="text-gray-500 text-sm mt-2">
                                    {member.trainer.experience
                                        ? `${member.trainer.experience}+ years experience`
                                        : "Experienced fitness trainer"}
                                </p>

                            </div>

                        </div>

                    ) : (

                        <div className="mt-6 bg-gray-50 rounded-xl p-6">

                            <p className="text-gray-500">
                                You haven't been assigned a trainer yet.
                            </p>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
};

export default MemberDashboard;