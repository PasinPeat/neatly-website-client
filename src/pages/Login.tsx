import React from "react";
import Navbar from "../components/Navbar";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <Navbar />
      <div className="flex">
        <div className="flex-1 mx-auto">
          <img
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-garden-3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ2FyZGVuLTMiLCJpYXQiOjE2OTM1NDk2NzksImV4cCI6MTcyNTA4NTY3OX0.s3rwwqDSUUgQ_o5RwmhBssmWOz0v3UR5w-ftMYaEJI4&t=2023-09-01T06%3A27%3A59.603Z"
            alt="hotel-exterior"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex-1 ">
          <div className=" p-[120px] bg-bg shadow-md flex flex-col justify-center h-full w-full">
            <h1 className="text-[68px] font-noto-serif-display font-medium text-green-800 mb-[60px]">
              Log In
            </h1>
            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="font-body1 text-gray-900">
                    Username or Email
                  </span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username or email"
                  className="w-full Input"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="font-body1 text-gray-900">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  className="w-full Input"
                  required
                />
              </div>

              <div>
                <button
                  className="btn Button w-full border-none mb-4"
                  type="submit"
                >
                  Log In
                </button>
              </div>
              <p className="text-gray-700 font-body1 text-start">
                Don't have an account yet?{" "}
                <a
                  href="/register"
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
