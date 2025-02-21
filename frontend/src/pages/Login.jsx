// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [state, setState] = useState("Sign Up");

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");
//     const navigate = useNavigate();
//     const { backendUrl, token, setToken } = useContext(AppContext);

//     const onsubmitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             if (state === "Sign Up") {
//                 const { data } = await axios.post(backendUrl + "/api/user/register", {
//                     name,
//                     password,
//                     email,
//                 });
//                 if (data.success) {
//                     localStorage.setItem("token", data.token);
//                     setToken(data.token);
//                 } else {
//                     toast.error(data.message);
//                 }
//             } else {
//                 const { data } = await axios.post(backendUrl + "/api/user/login", {
//                     password,
//                     email,
//                 });
//                 if (data.success) {
//                     localStorage.setItem("token", data.token);
//                     setToken(data.token);
//                 } else {
//                     toast.error(data.message);
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             navigate('/')
//         }
//     }, [token]);
//     return (
//         <>
//             <form onSubmit={onsubmitHandler} className="min-h-[80vh] flex items-center">
//                 <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//                     <p className="text-2xl font-semibold">
//                         {state === "Sign Up" ? "Create Account" : "Login"}
//                     </p>
//                     <p className="text-gray-400">
//                         Please {state === "Sign Up" ? "sign in" : "log in"} to book
//                         appointment
//                     </p>
//                     {state === "Sign Up" && (
//                         <div className="w-full">
//                             <p>Full Name</p>
//                             <input
//                                 className="border border-zinc-300 rounded w-full p-2 mt-1"
//                                 type="text"
//                                 onChange={(e) => setName(e.target.value)}
//                                 value={name}
//                                 required
//                             />
//                         </div>
//                     )}

//                     <div className="w-full">
//                         <p>Email</p>
//                         <input
//                             className="border border-zinc-300 rounded w-full p-2 mt-1"
//                             type="email"
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                             required
//                         />
//                     </div>
//                     <div className="w-full">
//                         <p>Password</p>
//                         <input
//                             className="border border-zinc-300 rounded w-full p-2 mt-1"
//                             type="password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-primary text-white w-full py-2 rounded-md text-base"
//                     >
//                         {state === "Sign Up" ? "Create Account" : "Login"}
//                     </button>
//                     {state === "Sign Up" ? (
//                         <p>
//                             Already have an account?{" "}
//                             <span
//                                 onClick={() => setState("Login")}
//                                 className="text-primary underline cursor-pointer"
//                             >
//                                 Login here
//                             </span>
//                         </p>
//                     ) : (
//                         <p>
//                             Create a new account?{" "}
//                             <span
//                                 onClick={() => setState("Sign Up")}
//                                 className="text-primary underline cursor-pointer"
//                             >
//                                 click here
//                             </span>{" "}
//                         </p>
//                     )}
//                 </div>
//             </form>
//         </>
//     );
// };

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [state, setState] = useState("Sign Up");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const { backendUrl, token, setToken } = useContext(AppContext);

    const onsubmitHandler = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            if (state === "Sign Up") {
                const { data } = await axios.post(backendUrl + "/api/user/register", {
                    name,
                    password,
                    email,
                });
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                    toast.success("Account created successfully!");
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + "/api/user/login", {
                    password,
                    email,
                });
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                    toast.success("Logged in successfully!");
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.error("Authentication error:", error);
            toast.error(
                error.response?.data?.message ||
                "An error occurred during authentication"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        if (state === "Sign Up") {
            setName("");
        }
    };

    useEffect(() => {
        resetForm();
    }, [state]);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <>
            <form onSubmit={onsubmitHandler} className="min-h-[80vh] flex items-center">
                <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                    <p className="text-2xl font-semibold">
                        {state === "Sign Up" ? "Create Account" : "Login"}
                    </p>
                    <p className="text-gray-400">
                        Please {state === "Sign Up" ? "sign in" : "log in"} to book
                        appointment
                    </p>
                    {state === "Sign Up" && (
                        <div className="w-full">
                            <p>Full Name</p>
                            <input
                                className="border border-zinc-300 rounded w-full p-2 mt-1"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    )}

                    <div className="w-full">
                        <p>Email</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="w-full">
                        <p>Password</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-primary text-white w-full py-2 rounded-md text-base ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting
                            ? "Processing..."
                            : state === "Sign Up"
                                ? "Create Account"
                                : "Login"
                        }
                    </button>
                    {state === "Sign Up" ? (
                        <p>
                            Already have an account?{" "}
                            <span
                                onClick={() => !isSubmitting && setState("Login")}
                                className={`text-primary underline ${isSubmitting ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                                    }`}
                            >
                                Login here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Create a new account?{" "}
                            <span
                                onClick={() => !isSubmitting && setState("Sign Up")}
                                className={`text-primary underline ${isSubmitting ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                                    }`}
                            >
                                click here
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </>
    );
};

export default Login;