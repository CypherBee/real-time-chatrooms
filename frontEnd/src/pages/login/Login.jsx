import { Link } from "react-router-dom";
import { useState } from "react";
import uselogin from "../../hooks/useLogin";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const { loading, login } = uselogin();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await login(inputs);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-80 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semi-bold text-center text-gray-300 ">
                    Login
                    <span className="text-stone-200 ml-10">Real Time Chat</span>
                </h1>
                <form onSubmit={handleLoginSubmit}>
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
                            className="input input-bordered w-full h-10 border-width-4 border-purple-400"
                            value={inputs.password}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        ></input>
                    </div>

                    <Link
                        to="/signup"
                        className="text-sm text-purple-400 hover:text-blue-600 hover:underline mt-2 inline-block"
                    >
                        Create an account
                    </Link>

                    <div>
                        <button
                            disabled={loading}
                            className="btn btn-block btn-sm mt-2"
                        >
                            {loading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
