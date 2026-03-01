import { Input, Form, Button, Spinner } from "@heroui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { Bounce, toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { userDataContext } from "../../Context/AuthUserData";
import { Sms, Lock1 } from "iconsax-reactjs";

const LoginSchema = zod.object({
  email: zod.string().email("Please enter a valid email address").nonempty("Email is required"),
  password: zod.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, and numbers"),
})

export default function Login() {
  const navigate = useNavigate();
  const { setAuthUserData } = useContext(userDataContext)
  const [isloading, setisloading] = useState(false)

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "all",
    resolver: zodResolver(LoginSchema)
  })

  async function sendData(data) {
    setisloading(true);
    toast.promise(
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signin`,
        data
      ),
      {
        pending: "Signing in...",
        success: {
          render({ data }) {
            localStorage.removeItem("userdata")
            localStorage.setItem("userdata", JSON.stringify(data.data.data.user))
            localStorage.removeItem("token")
            localStorage.setItem("token", data.data.data.token)
            setAuthUserData()
            setTimeout(() => {
              navigate("/");
            }, 1500);
            return "Welcome back!";
          },
        },
        error: {
          render({ data }) {
            return (
              data?.response?.data?.error ||
              "Invalid email or password"
            );
          },
        },
      }
    ).finally(() => {
      setisloading(false);
    });
  }

  return (
    <div className="flex min-h-screen bg-[#001444]">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
        transition={Bounce}
      />

      {/* Left Side - Image Sidebar */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden ">
        <div className="absolute inset-0 bg-cover bg-center rounded-e-4xl "
          style={{ backgroundImage: `url('https://i.pinimg.com/1200x/42/fe/f1/42fef162a6235ac9cc0f6049f5db7780.jpg')` }}>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-linear-to-b from-[#001444] via-[#00247d] to-[#001444]">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">Welcome Back!</h1>
          </div>

          <Form onSubmit={handleSubmit(sendData)} className="space-y-6 flex flex-col">
            <div className="space-y-4 w-full">
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">Email address</label>
                <Input
                  {...register("email")}
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  autoComplete="off"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  startContent={<Sms className="text-gray-400" size={20} />}
                  classNames={{
                    inputWrapper: "bg-[#0b1c45]/50 border-gray-600 text-white focus-within:border-blue-500",
                    input: "text-white placeholder:text-gray-500",
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">Password</label>
                <Input
                  {...register("password")}
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  autoComplete="new-password"
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  startContent={<Lock1 className="text-gray-400" size={20} />}
                  classNames={{
                    inputWrapper: "bg-[#0b1c45]/50 border-gray-600 text-white focus-within:border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]",
                    input: "text-white placeholder:text-gray-500",
                  }}
                />
              </div>
            </div>

            <div className="flex justify-start">
              <Link to="/forgot-password" title="Forgot Password?" className="text-blue-400 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isloading}
              className="w-full h-14 bg-linear-to-r from-gray-900 via-gray-800 to-black text-white font-medium text-lg rounded-xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isloading ? <Spinner color="white" size="sm" /> : "Sign in"}
            </Button>

            <p className="text-center text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-400 font-medium hover:underline">
                Register
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
