import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  IoMdContact,
  IoMdEye,
  IoMdEyeOff,
  IoIosPhonePortrait,
} from "react-icons/io";
import { MdPhoneAndroid } from "react-icons/md";
import { IoPhonePortraitOutline, IoLockClosedSharp } from "react-icons/io5";
import { Sparkles } from "../components/ui/sparkles";
import toast from "react-hot-toast";

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Please enter your name");
    if (!formData.username.trim())
      return toast.error("Please enter your username");
    if (!formData.email.trim()) return toast.error("Please enter your email");
    if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone))
      return toast.error("Invalid phone format");
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      return toast.error("Invalid email format");

    if (!formData.password) return toast.error("Enter your password");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      signup(formData).catch((error) => {
        console.error("Unexpected error during signup:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-14 ">
      <div className="text-center mb-4">
        <div className="flex flex-col mt-20 items-center gap-2 group">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row gap-11">
              <IoIosPhonePortrait className="text-[75px]" />
              <IoPhonePortraitOutline className="text-[75px]" />
            </div>
            <progress className="progress w-[120px]"></progress>
          </div>

          <h1 className="text-3xl font-extrabold mt-2">
            Real Time Chat for Sibers
          </h1>
          <p className="text-xl font-medium">
            Create a new account for real-time messaging
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-screen-sm md:w-[500px] lg:w-[800px] z-[3]"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text font-mono text-xl">Full Name</span>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <IoMdContact />
            <input
              type="text"
              className="grow"
              value={formData.name}
              placeholder="Kozoliy Michail"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-mono text-xl">Chat username</span>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="mellocatlover"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-mono text-xl">Phone</span>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <MdPhoneAndroid />
            <input
              type="text"
              className="grow"
              placeholder="+79132345678"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-mono text-xl">Email</span>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow font-light"
              placeholder="e.xample@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-mono text-xl">Password</span>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <IoLockClosedSharp />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="grow"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <span className="loading loading-infinity loading-lg"></span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
      <div className="text-center flex flex-row z-[5]">
        <p className="text-base-content/60">Already have an account? </p>
        <Link to="/login" className="link link-primary">
          Login
        </Link>
      </div>
      <div className="fixed bottom-[-350px] z-[2] h-[700px] w-screen overflow-hidden [mask-image:radial-gradient(100%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,oklch(var(--p)),transparent_90%)] before:opacity-40 after:absolute">
        <Sparkles
          density={800}
          speed={1}
          size={1.1}
          color="#FFFFFF"
          direction="top"
          className="fixed inset-y-[500px] bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
    </div>
  );
};
