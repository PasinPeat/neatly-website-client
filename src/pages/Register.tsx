import React from "react";
import Navbar from "../components/Navbar";

function Register() {
  return (
    <div className="flex flex-col items-center w-screen bg-coverRegister bg-cover">
      <Navbar />

      <div className="w-[75%] flex flex-col justify-center items-start p-20 my-[90px] bg-bg shadow-md rounded">
        <h1 className="text-[68px] font-noto-serif-display font-medium text-green-800">
          Register
        </h1>
        <p className="text-gray-600 text-headline5 py-10">Basic Information</p>
        <form className="w-full">
          <div>
            <label htmlFor="fname">
              <p className="font-body1 text-gray-900  text-start">Full Name</p>
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter your name and lastname"
              className="w-full Input mb-10"
              required
            />
          </div>

          <div className="grid grid-rows-3 grid-flow-col gap-10 mb-10">
            <div>
              <label htmlFor="username">
                <p className="font-body1 text-gray-900 text-start">Username</p>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="w-full Input"
                required
              />
            </div>

            <div>
              <label htmlFor="email">
                <p className="font-body1 text-gray-900  text-start">Email</p>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                className="w-full Input"
                required
              />
            </div>

            <div>
              <label htmlFor="password">
                <p className="font-body1 text-gray-900  text-start">Password</p>
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
              <label htmlFor="idNumber">
                <p className="font-body1 text-gray-900  text-start">
                  ID Number
                </p>
              </label>
              <input
                type="tel"
                id="idNumber"
                name="idNumber"
                pattern="\d*"
                maxLength={13}
                placeholder="Enter your ID Number"
                className="w-full Input"
                required
              />
            </div>

            <div>
              <label htmlFor="birthDate">
                <p className="font-body1 text-gray-900  text-start">
                  Date of Birth
                </p>
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                placeholder="Select your date of birth"
                className="w-full Input"
                required
              />
            </div>

            <div>
              <label htmlFor="country">
                <p className="font-body1 text-gray-900 text-start">Country</p>
              </label>
              <select
                name="country"
                id="country"
                placeholder="Select your country"
                className="w-full Input"
              >
                <option value="thailand">Thailand</option>
                <option value="japan">Japan</option>
                <option value="china">China</option>
              </select>
            </div>
          </div>

          {/* Profile Picture*/}
          <div className="h-[0.2px] bg-gray-500"></div>
          <div className="flex flex-col items-start">
            <p className="text-gray-600 text-headline5 py-10">
              Profile Picture
            </p>
            <div>
              <button className="w-[197px] h-[167px] border-2 bg-gray-200 rounded mb-[60px]">
                <p className="text-orange-500 text-sm font-medium">
                  + <hr />
                  Upload photo
                </p>
              </button>
            </div>
          </div>

          {/* Credit Card */}
          <div className="h-[0.2px] bg-gray-500"></div>
          <p className="text-gray-600 text-headline5 py-10 text-start">
            Credit Card
          </p>
          <div className="grid grid-rows-2 grid-flow-col gap-10">
            <div>
              <label htmlFor="cardNumber">
                <p className="font-body1 text-gray-900 text-start">
                  Card Number
                </p>
              </label>
              <input
                type="tel"
                id="cardNumber"
                name="cardNumber"
                pattern="\d*"
                maxLength={10}
                placeholder="Enter your card number"
                className="w-full Input font-body1"
                required
              />
            </div>

            <div>
              <label htmlFor="expried">
                <p className="font-body1 text-gray-900 text-start">
                  Expiry Date
                </p>
              </label>
              <input
                type="tel"
                id="expried"
                name="expried"
                pattern="\d*"
                maxLength={4}
                placeholder="MM/YY"
                className="w-full Input"
                required
              />
            </div>

            <div>
              <label htmlFor="cardOwner">
                <p className="font-body1 text-gray-900 text-start">
                  Card Owner
                </p>
              </label>
              <input
                type="text"
                id="cardOwner"
                name="cardOwner"
                placeholder="Enter your name"
                className="w-full Input font-body1"
                required
              />
            </div>

            <div>
              <label htmlFor="cvc">
                <p className="font-body1 text-gray-900 text-start">CVC/CVV</p>
              </label>
              <input
                type="tel"
                id="cvc"
                name="cvc"
                pattern="\d*"
                maxLength={3}
                placeholder="CVC/CVV"
                className="w-full Input"
                required
              />
            </div>
          </div>

          <div>
            <button className="btn Button w-full mt-[60px] mb-4" type="submit">
              Register
            </button>

            <span className="text-gray-700 font-body1">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-orange-500 font-semibold hover:underline"
              >
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
