import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api/v1";

const MemberProfile = ({ onBack }) => {
    const [member, setMember] = useState(null);

    const [formData, setFormData] = useState({
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API}/members/me`,
                {
                    withCredentials: true,
                }
            );

            const data = response.data?.data;

            setMember(data);

            setFormData({
                phone: data?.phone || "",
                dateOfBirth: data?.dateOfBirth
                    ? new Date(data.dateOfBirth)
                        .toISOString()
                        .split("T")[0]
                    : "",
                gender: data?.gender || "",
                address: data?.address || "",
            });

        } catch (error) {
            console.error("Profile error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load profile."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response = await axios.patch(
                `${API}/members/me`,
                formData,
                {
                    withCredentials: true,
                }
            );

            setMember(response.data?.data);

            setSuccess(
                "Profile updated successfully."
            );

        } catch (error) {
            console.error("Update profile error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f4f5f4] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />

                    <p className="text-gray-500 mt-4">
                        Loading profile...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4f5f4]">

            {/* Header */}

            <header className="h-20 bg-[#080909] text-white flex items-center justify-between px-6 lg:px-10">

                <div className="text-2xl font-black">
                    ⚡ Gym<span className="text-orange-500">OS</span>
                </div>

                <button
                    onClick={onBack}
                    className="border border-white/20 hover:border-orange-500 px-4 py-2 rounded-lg text-sm transition"
                >
                    ← Dashboard
                </button>

            </header>


            {/* Content */}

            <main className="max-w-5xl mx-auto px-6 py-10">

                <div className="mb-8">

                    <p className="text-orange-500 text-xs font-bold tracking-[3px]">
                        MEMBER ACCOUNT
                    </p>

                    <h1 className="text-4xl font-black mt-2">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your personal information.
                    </p>

                </div>


                {/* Messages */}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 rounded-xl p-4 mb-6">
                        {success}
                    </div>
                )}


                <div className="grid lg:grid-cols-3 gap-6">


                    {/* USER CARD */}

                    <div className="bg-[#101313] text-white rounded-2xl p-7">

                        <div className="flex flex-col items-center text-center">

                            <img
                                src={
                                    member?.user?.avatar ||
                                    "https://ui-avatars.com/api/?name=GymOS"
                                }
                                alt="Profile"
                                className="w-28 h-28 rounded-full object-cover border-4 border-orange-500"
                            />

                            <h2 className="text-xl font-bold mt-5">
                                {member?.user?.username ||
                                    "Member"}
                            </h2>

                            <p className="text-gray-400 text-sm mt-1">
                                {member?.user?.email}
                            </p>

                            <span className="mt-4 bg-orange-500/15 text-orange-500 px-4 py-1 rounded-full text-xs font-bold uppercase">
                                Member
                            </span>

                        </div>


                        <div className="border-t border-white/10 mt-7 pt-6 space-y-5">

                            <div>
                                <p className="text-gray-500 text-xs">
                                    Username
                                </p>

                                <p className="text-sm mt-1">
                                    {member?.user?.username || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs">
                                    Email
                                </p>

                                <p className="text-sm mt-1 break-all">
                                    {member?.user?.email || "-"}
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* EDIT FORM */}

                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-7">

                        <h2 className="text-2xl font-black">
                            Personal Information
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Update your member profile details.
                        </p>


                        <form
                            onSubmit={handleSubmit}
                            className="mt-7 space-y-5"
                        >

                            {/* Phone */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                            </div>


                            {/* DOB */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                            </div>


                            {/* Gender */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 bg-white"
                                >

                                    <option value="">
                                        Select gender
                                    </option>

                                    <option value="male">
                                        Male
                                    </option>

                                    <option value="female">
                                        Female
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* Address */}

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Enter your address"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                            </div>


                            {/* Save */}

                            <div className="flex justify-end pt-2">

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-black font-bold px-7 py-3 rounded-lg transition"
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"
                                    }
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default MemberProfile;