import * as React from "react";
import { handleInput } from "../utils/handleInput";
import * as classNames from "classnames";
import { fetchData } from "../api/fetchClient";
import { RadioSelect } from "../modules/RadioSelect";
import { PositionType } from "../types/PositionType";
import InputField from "../modules/InputField";
import { Loader } from "./Loader";
import { Button } from "../modules/Button";
import {
  validateEmail,
  validateName,
  validatePhone,
  validatePhoto,
} from "../utils/validation";
import { POSITIONS_URL, POST_USER_URL, TOKEN_URL } from "../api/URLs";

interface Props {
  setMessage: (message: string) => void;
  getData: () => void;
}

export const SectionPostRequest: React.FC<Props> = ({
  setMessage,
  getData,
}) => {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [positionId, setPositionId] = React.useState(1);
  const [photo, setPhoto] = React.useState<FileList | null>(null);
  const [positions, setPositions] = React.useState<PositionType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [validationsErrors, setValidationsErrors] = React.useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });
  const disabled = !name || !email || !phone || !photo;

  const getPostions = async () => {
    try {
      const data = await fetchData(POSITIONS_URL);
      setPositions(data.positions);
    } catch (error) {
      setMessage(error.message);
    }
  };

  React.useEffect(() => {
    getPostions();
  }, []);

  const updateInputs = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPositionId(1);
    setPhoto(null);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const photoError = await validatePhoto(photo[0]);

    setValidationsErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      photo: photoError,
    });

    if (nameError || emailError || phoneError || photoError) {
      return;
    }

    const token = await fetchData(TOKEN_URL);

    if (!token.success) {
      setMessage(token.message);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("position_id", positionId.toString());
    formData.append("photo", photo[0]);

    try {
      setIsLoading(true);
      const response = await fetch(POST_USER_URL, {
        method: "POST",
        body: formData,
        headers: {
          Token: token.token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
      getData();
      updateInputs();
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-light_gray">
      <div className="container">
        <div className="pb-[100px] flex flex-col items-center">
          <h1>Working with POST request</h1>

          <form id="regForm" className="max-w-[380px] flex flex-col gap-y-10 pt-[50px] w-full">
            <InputField
              label="Your name"
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleInput(nameRef)(e);
                setValidationsErrors({ ...validationsErrors, name: "" });
              }}
              onFocus={handleInput}
              onBlur={handleInput}
              error={validationsErrors.name}
            />

            <InputField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInput(emailRef)(e);
                setValidationsErrors({ ...validationsErrors, email: "" });
              }}
              onFocus={handleInput}
              onBlur={handleInput}
              error={validationsErrors.email}
            />

            <InputField
              label="Phone"
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                handleInput(phoneRef)(e);
                setValidationsErrors({ ...validationsErrors, phone: "" });
              }}
              onFocus={handleInput}
              onBlur={handleInput}
              error={validationsErrors.phone}
            />

            <div>
              <ul className="flex flex-col gap-y-[7px]">
                <li className="mb-1">Select your position</li>
                {positions.map((position) => (
                  <li
                    key={position.id}
                    className="flex items-center duration-300 cursor-pointer gap-x-3 w-max hover:text-blue"
                    onClick={() => setPositionId(position.id)}
                  >
                    <RadioSelect
                      name={position.name}
                      selected={positionId === position.id}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label
                htmlFor="file"
                className={classNames(
                  "relative cursor-pointer py-[14px] px-4 border rounded block hover:border-blue",
                  {
                    "border-error border-2": validationsErrors.photo,
                  },
                  {
                    "border-gray border": !validationsErrors.photo,
                  }
                )}
              >
                <span className="block text-sm text-gray pl-[86px]">
                  {photo
                    ? photo[0]
                      ? `${photo[0].name}`
                      : "Upload your photo"
                    : "Upload your photo"}
                </span>

                <span
                  className={`absolute inset-[-1px] flex items-center border max-w-[83px] rounded-l ${
                    validationsErrors.photo
                      ? "border-error border-r-2"
                      : "border-black border-r-1"
                  }`}
                >
                  <span className="mx-auto">Upload</span>
                </span>

                <input
                  type="file"
                  id="file"
                  name="file"
                  className="hidden"
                  required
                  onChange={(e) => {
                    setPhoto(e.target.files);
                    setValidationsErrors({ ...validationsErrors, photo: "" });
                  }}
                />
              </label>
              {validationsErrors.photo && (
                <p className="text-xs text-error">{validationsErrors.photo}</p>
              )}
            </div>

            <div className="m-auto w-28">
              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  disabled={disabled}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleSubmit(e)}
                >
                  Sign up
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
