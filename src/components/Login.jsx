"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/api/auth";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast styling
import { useRouter } from "next/navigation"; // Redirect to dashboard page

export default function Login() {
    // State to manage form input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault(); // Prevents the default action (refreshing the page) from happening
            const userInfo = {
                email: email,
                password: password,
            };
            const result = await login(userInfo);
            const token = result.token;
            const user_id = result.user_id;
            console.log(user_id);

            toast.success("Logged in succesfully!", { position: "bottom-right" }); // Make the toast notification messages appear on the bottom right
            localStorage.setItem("token", token); // Set the local storage to contain the token
            localStorage.setItem("user_id", user_id);
            // Redirect to the dashboard route
            router.push("/dashboard");
        } catch (error) {
            toast.error(error.response.data, { position: "bottom-right" });
            console.log(error.response.data);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <ToastContainer />
            {/* Add a shadow, padding, and border radius */}
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <div className="flex justify-center items-center">
                    <Image
                        className="mr-5"
                        src={`/Designer.png`}
                        width="100"
                        height="100"
                        alt="Logo"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-15 text-xl p-5">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="border p-2 border-gray-800 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-15 text-xl p-5">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="border p-2 border-gray-800 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-15 text-xl p-5">
                        <button
                            className="bg-customBlue py-2 px-40 font-bold text-white text-xl rounded-lg"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link href="/sign-up">
                        {" "}
                        {/* If they don't have an account link them to the sign up page instead */}
                        <button className="hover:text-blue-700">
                            Don't have an account? Sign up here.
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
