import { HiLockClosed, HiLogin, HiMail, HiUserAdd } from "react-icons/hi";
import LandingAnimation from "../components/landingAnimation";
import SemInput from "../components/semInput";
import SemTitle from "../components/semTitle";
import { Button, HR } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useValidateUser from "../hooks/useValidateUser";
import { toast } from "react-toastify";
import { useSemStore } from "../zustand/store";
import ScreenLoading from "../components/screenLoading";
import cn from "../assets/cnsc front.jpeg";

const Login = () => {
  const [forms, setForms] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Hooks
  const { validateUser } = useValidateUser();
  const { setCurrentUser, currentUser, setIsAdmin } = useSemStore();
  const navigation = useNavigate();

  const handleUpdateForm = (event) => {
    const { name, value } = event.target;
    setForms((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    setLoading(true);
    setTimeout(() => {
      const res = validateUser(forms);
      if (!res) {
        toast.error("Email or Password is incorrect.");
        setLoading(false);
        return;
      }
      setCurrentUser(res);
      localStorage.setItem("user", JSON.stringify(res));
      navigation("/master-records");
      setLoading(false);
    }, 2000);
  };

  //If has user in localstorage, set the currentUser to the user save in localstorage

  useEffect(() => {
    const output = localStorage.getItem("user");
    const data = JSON.parse(output);
    setCurrentUser(data);
  }, []);

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${cn})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading && <ScreenLoading />}
      <div className="flex justify-center items-center w-full lg:w-3/6">
        <div className="content bg-slate-800 min-h-5/6 mx-5 w-full lg:w-4/6 rounded-lg">
          <div className="title-wrapper m-10">
            <SemTitle
              color={"white"}
              title={"Supply And Equipment Management System"}
            />
          </div>
          <form className="form-wrapper m-10" onSubmit={handleSubmitForm}>
            <div className="my-3">
              <SemInput
                label={"Email"}
                id={"email"}
                name={"email"}
                placeholder={"Please enter your email"}
                icon={HiMail}
                event={handleUpdateForm}
              />
            </div>
            <div className="my-3">
              <SemInput
                label={"Password"}
                id={"password"}
                name={"password"}
                placeholder={"Please enter your password"}
                icon={HiLockClosed}
                event={handleUpdateForm}
                type={"password"}
              />
            </div>
            <div className="submit-wrapper mt-10">
              <Button
                type="submit"
                gradientMonochrome="info"
                className="w-full "
              >
                <HiLogin className="mr-2 h-5 w-5" />
                Login
              </Button>
              <HR.Text />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
