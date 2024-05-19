import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const { loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await signup(inputs);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-80 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className=" mb-3 text-3xl font-semi-bold text-center text-gray-300 ">
                    Sign Up
                    <span className="text-stone-200 ml-10">Real Time Chat</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base text-label text-white">
                                FullName
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="input input-bordered w-full h-10 max-w-xs border-width-4 border-purple-400"
                            value={inputs.fullName}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    fullName: e.target.value,
                                })
                            }
                        ></input>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base text-label text-white">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="input input-bordered w-full h-10 max-w-xs border-width-4 border-purple-400"
                            value={inputs.username}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                })
                            }
                        ></input>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base text-label text-white">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="input input-bordered w-full h-10 max-w-xs border-width-4 border-purple-400"
                            value={inputs.password}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        ></input>
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base text-label text-white">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password again"
                            className="input input-bordered w-full h-10 max-w-xs border-width-4 border-purple-400"
                            value={inputs.confirmPassword}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    confirmPassword: e.target.value,
                                })
                            }
                        ></input>
                    </div>

                    <Link
                        to="/login"
                        className="text-sm text-purple-400 hover:text-blue-600 hover:underline mt-4 inline-block"
                    >
                        Already have an account ?? Login
                    </Link>

                    <div>
                        <button
                            disabled={loading}
                            className="btn btn-block btn-sm mt-2"
                        >
                            {loading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
