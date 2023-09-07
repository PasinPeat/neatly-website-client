import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  //user's profile
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [avatars, setAvatars] = useState({});

  //user's credit card
  const [cardNumber, setCardNumber] = useState("");
  // eslint-disable-next-line
  let [expireDate, setExpireDate] = useState("");
  const [cardOwner, setCardOwner] = useState("");
  const [cardCode, setCardCode] = useState("");

  //validation
  const [fullNameError, setFullNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [creditCardError, setCreditCardError] = useState(false);

  const [birthDayError, setBirthDayError] = useState(false);

  //invalid file
  const [invalidFile, setInvalidFile] = useState("");

  //loading
  const [isLoading, setIsLoading] = useState(false);

  //check full name handler
  const validateFullName = (name: string) => {
    const names = name.trim().split(" ");
    if (
      names.length !== 2 ||
      !/^[a-zA-Z]*$/.test(names[0]) ||
      !/^[a-zA-Z]*$/.test(names[1])
    ) {
      setFullNameError(true);
    } else {
      setFullNameError(false);
    }
  };

  //check password handler
  const isPasswordValid = (password: string) => {
    if (password.length < 6 || password.length > 15) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  //check credit card number
  const creditCardNumberRegex = /^\d{4} ?\d{4} ?\d{4} ?\d{4}$/;
  const cvvRegex = /^\d{3}$/;

  const validateCreditCard = (cardNumber: string, cvv: string) => {
    const cleanedCardNumber = cardNumber.replace(/[^\d]/g, "");

    const isCardNumberValid = creditCardNumberRegex.test(cleanedCardNumber);
    const isCvvValid = cvvRegex.test(cvv);

    return isCardNumberValid && isCvvValid;
  };

  //check age
  const validateBirthDay = (birthDay: string) => {
    const dob = new Date(birthDay);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();

    return age >= 18;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    //check full name
    validateFullName(fullName);
    validateFullName(cardOwner);

    //check username
    const queryParamsUsername = `?username=${username}`;
    const validUsername = await axios.get(
      `http://localhost:4000/validUser/username${queryParamsUsername}`
    );
    if (validUsername.data.data.length === 1) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    //check email
    const queryParamsEmail = `?email=${email}`;
    const validEmail = await axios.get(
      `http://localhost:4000/validUser/email${queryParamsEmail}`
    );
    if (validEmail.data.data.length === 1) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    //check password
    isPasswordValid(password);

    // credit card number valiation
    const cleanedCardNumber = cardNumber.replace(/\s/g, "");
    if (isNaN(Number(cleanedCardNumber))) {
      setCreditCardError(true);
      return;
    }
    const isCreditCardValid = validateCreditCard(cardNumber, cardCode);
    if (!isCreditCardValid) {
      setCreditCardError(true);
    } else {
      setCreditCardError(false);
    }

    //check credit card expire date
    // eslint-disable-next-line
    let [enteredMonth, enteredYear] = expireDate
      .split("/")
      .map((part) => part.trim());
    const currentYear = new Date().getFullYear() % 100;
    if (
      expireDate.length !== 5 ||
      !/^\d{2}\/\d{2}$/.test(expireDate) ||
      +enteredMonth < 1 ||
      +enteredMonth > 12 ||
      +enteredYear < currentYear
    ) {
      enteredMonth = "12";
    }
    expireDate = `${enteredMonth}/${enteredYear}`;

    const isAgeValid = validateBirthDay(birthDay);
    setBirthDayError(!isAgeValid);

    if (
      fullNameError ||
      passwordError ||
      emailError ||
      usernameError ||
      creditCardError ||
      birthDayError
    ) {
      setIsLoading(false);
      return;
    }

    const data: Record<string, string> = {
      fullName: String(fullName),
      username: String(username),
      password: String(password),
      idNumber: String(idNumber),
      email: String(email),
      birth_day: String(birthDay),
      country: String(country),
      card_owner: String(cardOwner),
      card_number: cleanedCardNumber,
      cvc: String(cardCode),
      expireDate: String(expireDate),
    };

    for (let avatarKey in avatars) {
      //@ts-ignore
      data.avatar = avatars[avatarKey];
    }

    try {
      await axios.post("http://localhost:4000/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  //@ts-ignore
  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const fileExtension = file.name.toLowerCase().slice(-4);
      if (
        file.size <= 2 * 1024 * 1024 &&
        allowedExtensions.includes(fileExtension)
      ) {
        setAvatars({
          ...avatars,
          [uniqueId]: file,
        });
        setInvalidFile("");
      } else {
        setInvalidFile(
          "Your file is invalid. Please select a file that is no larger than 2 MB and is .jpg, .jpeg, or .png"
        );
      }
    }
  };

  //@ts-ignore
  const handleRemoveImage = (event, avatarKey) => {
    event.preventDefault();
    //@ts-ignore
    delete avatars[avatarKey];
    setAvatars({ ...avatars });
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryOptions: { value: string; label: string }[] = data.map(
          (country: { name: { common: string } }) => ({
            value: country.name.common,
            label: country.name.common,
          })
        );
        const sortedCountries = countryOptions.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setCountries(sortedCountries);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-screen bg-coverRegister bg-cover">
      <Navbar />

      <div className="w-[75%] flex flex-col justify-center items-start p-20 my-[90px] bg-bg shadow-md rounded">
        <h1 className="text-[68px] font-noto-serif-display font-medium text-green-800">
          Register
        </h1>
        <p className="text-gray-600 text-headline5 py-10">Basic Information</p>
        <form
          className="w-full"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div>
            <label htmlFor="fname">
              <p className="font-body1 text-gray-900  text-start">Full Name</p>
              {fullNameError && (
                <span className="text-body3 text-red">
                  The full name should include both the first name and the last
                  name and cannot contain any numbers.
                </span>
              )}
            </label>
            <input
              type="text"
              id="fname"
              value={fullName}
              name="fname"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              placeholder="Enter your name and last name"
              className="w-full Input mb-10 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-rows-3 grid-flow-col gap-10 mb-10">
            <div>
              <label htmlFor="username">
                <p className="font-body1 text-gray-900 text-start">Username</p>
              </label>
              <input
                type="text"
                value={username}
                id="username"
                name="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter your username"
                className="w-full Input focus:outline-none focus:border-orange-500"
                required
              />
              {usernameError && (
                <span className="text-body3 text-red">
                  Username already in use. Please choose a different username.
                </span>
              )}
            </div>

            <div>
              <label htmlFor="password">
                <p className="font-body1 text-gray-900  text-start">Password</p>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your Password"
                className="w-full Input focus:outline-none focus:border-orange-500"
                required
              />
              {passwordError && (
                <span className="text-body3 text-red">
                  Password must be between 6 and 15 characters long.
                </span>
              )}
            </div>

            <div>
              <label htmlFor="birthDate">
                <p className="font-body1 text-gray-900 text-start">
                  Date of Birth
                </p>
              </label>
              <input
                type="date"
                id="birthDate"
                value={birthDay}
                name="birthDate"
                onChange={(e) => {
                  const cleanedValue = e.target.value
                    .replace(/[^0-9-]/g, "")
                    .substring(0, 10);

                  setBirthDay(cleanedValue);
                }}
                placeholder="Select your date of birth"
                maxLength={10}
                className="w-full Input focus:outline-none focus:border-orange-500"
                required
              />
              {birthDayError && (
                <span className="text-body3 text-red">
                  You must be at least 18 years old to register.
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email">
                <p className="font-body1 text-gray-900  text-start">Email</p>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your Email"
                className="w-full Input focus:outline-none focus:border-orange-500"
                required
              />
              {emailError && (
                <span className="text-body3 text-red">
                  Email already in use. Please choose a different email.
                </span>
              )}
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
                value={idNumber}
                name="idNumber"
                onChange={(e) => {
                  setIdNumber(e.target.value);
                }}
                pattern="\d*"
                maxLength={13}
                placeholder="Enter your ID Number"
                className="w-full Input focus:outline-none focus:border-orange-500"
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
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                className="w-full Input focus:outline-none focus:border-orange-500"
              >
                <option value="">Select your country</option>{" "}
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Profile Picture*/}
          <div className="flex items-start">
            <p className="text-gray-600 text-headline5 py-10">
              Profile Picture
            </p>
          </div>
          <div className="flex flex-row">
            {Object.keys(avatars).length === 0 ? (
              <div>
                <label htmlFor="upload">
                  <div className="w-[197px] h-[167px] bg-gray-200 rounded mb-[25px] flex flex-col justify-center items-center border-2 hover:border-orange-500 active:border-orange-700">
                    <p className="text-orange-500 text-[30px] font-medium text-center">
                      +
                    </p>
                    <p className="text-orange-500 text-sm font-medium text-center">
                      Upload photo
                    </p>
                    <input
                      id="upload"
                      name="avatar"
                      type="file"
                      onChange={handleFileChange}
                      disabled={Object.keys(avatars).length > 0}
                      accept="image/jpg, image/jpeg, image/png"
                      hidden
                    />
                  </div>
                </label>
              </div>
            ) : null}

            {/* Avatar Render */}
            {Object.keys(avatars).map((avatarKey) => {
              //@ts-ignore
              const file = avatars[avatarKey];
              return (
                <div
                  key={avatarKey}
                  className="w-[197px] h-[167px] mb-[25px] relative"
                >
                  <img
                    className="w-[197px] h-[167px] rounded object-cover"
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                  <button
                    className="h-[24px] w-[24px] rounded-full bg-[#B61515] flex items-center justify-center absolute -top-2 -right-2 hover:bg-orange-700 active:bg-orange-800"
                    onClick={(event) => handleRemoveImage(event, avatarKey)}
                  >
                    <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/X.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1guc3ZnIiwiaWF0IjoxNjkzOTI4MDgyLCJleHAiOjE3MjU0NjQwODJ9.t222UE-9r9-MjxyWxgHvvGtwhg7AEAvphm2mY-VVfg0&t=2023-09-05T15%3A34%3A21.534Z" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Invalid File */}
          <div className="h-[35px]">
            {invalidFile && (
              <p className="text-body3 text-red">{invalidFile}</p>
            )}
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
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardNumber}
                pattern="(\d{4} ?){4}"
                onChange={(e) => {
                  const cleanedValue = e.target.value.replace(/[^\d]/g, "");

                  const formattedValue = cleanedValue
                    .replace(/(\d{4})/g, "$1 ")
                    .trim();

                  setCardNumber(formattedValue);
                }}
                maxLength={19}
                placeholder="Enter your card number"
                className="w-full Input font-body1 focus:outline-none focus:border-orange-500"
                required
              />
              {creditCardError && (
                <span className="text-body3 text-red">
                  Invalid Credit Card number
                </span>
              )}
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
                value={expireDate}
                onChange={(e) => {
                  const cleanedValue = e.target.value.replace(/\D/g, "");
                  const formattedValue = cleanedValue.replace(
                    /^(\d{2})(\d{0,2})/,
                    (_, month, year) => {
                      const maxMonth = month > 12 ? "12" : month;
                      return `${maxMonth}${year ? "/" : ""}${year}`;
                    }
                  );
                  setExpireDate(formattedValue);
                }}
                name="expried"
                maxLength={5}
                placeholder="MM/YY"
                className="w-full Input focus:outline-none focus:border-orange-500"
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
                value={cardOwner}
                onChange={(e) => {
                  setCardOwner(e.target.value);
                }}
                name="cardOwner"
                placeholder="Enter your name"
                className="w-full Input font-body1 focus:outline-none focus:border-orange-500"
                required
              />
              {fullNameError && (
                <span className="text-body3 text-red">
                  Card Owner's name should include both first name and last
                  name.
                </span>
              )}
            </div>

            <div>
              <label htmlFor="cvc">
                <p className="font-body1 text-gray-900 text-start">CVC/CVV</p>
              </label>
              <input
                type="tel"
                id="cvc"
                name="cvc"
                value={cardCode}
                onChange={(e) => {
                  setCardCode(e.target.value);
                }}
                pattern="\d*"
                maxLength={3}
                placeholder="CVC/CVV"
                className="w-full Input focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div className="columns-2 gap-10">
            <div>
              <button
                className="btn Button w-full mt-[60px] mb-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner w-7 bg-orange-600"></span>
                ) : (
                  "Register"
                )}
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
