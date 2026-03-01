import { Button, Form, Input, Select, SelectItem, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import * as zod from 'zod'
import { userDataContext } from "../../Context/AuthUserData";
import { Sms, Lock1, User, Calendar, Woman } from "iconsax-reactjs";

const RegisterSchema = zod.object({
  name: zod.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(25, "Name must be maximum 25 characters"),
  username: zod.string().regex(/^[a-zA-Z]{3,7}[0-9]{0,5}(_)?[a-zA-Z0-9]{4,7}$/, "Username must be valid (e.g., user123_test)"),
  email: zod.string().email("Please enter a valid email address").nonempty("Email is required"),
  password: zod.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, and numbers"),
  rePassword: zod.string().nonempty("Please confirm your password"),
  dateOfBirth: zod.coerce.date().refine(function (date) {
    return new Date().getFullYear() - date.getFullYear() >= 18
  }, "You must be at least 18 years old").transform(function (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }),
  gender: zod.enum(['male', 'female'], { errorMap: () => ({ message: "Gender is required" }) })
}).refine(function (obj) {
  return obj.password === obj.rePassword
}, { path: ["rePassword"], message: "Passwords do not match" })

export default function Register() {
  const [isloading, setisloading] = useState(false)
  const { setAuthUserData } = useContext(userDataContext)
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: ""
    },
    mode: "all",
    resolver: zodResolver(RegisterSchema)
  })

  async function sendData(data) {
    setisloading(true)
    toast.promise(
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signup`,
        data
      ),
      {
        pending: "Creating account...",
        success: {
          render({ data }) {
            localStorage.clear()
            localStorage.setItem("token",data.data.data.token)
            setAuthUserData()
            setTimeout(() => {
              navigate("/");
            }, 1500);
            return "Account created successfully!";
          },
        },
        error: {
          render({ data }) {
            return (
              data?.response?.data?.errors ||
              "Registration failed, please try again"
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
      <div className="hidden lg:flex w-1/2 relative overflow-hidden h-full">
        <div className="w-full min-h-screen bg-black bg-cover bg-center rounded-e-4xl" 
             style={{ backgroundImage: `url('https://i.pinimg.com/1200x/42/fe/f1/42fef162a6235ac9cc0f6049f5db7780.jpg')` }}>
          {/* <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div> */}
        </div>
        
        
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 lg:ml-auto flex items-center justify-center bg-linear-to-b from-[#001444] via-[#00247d] to-[#001444]">
        <div className="w-full max-w-md">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-white text-center mb-8">Join our community</h1>
          </div>

          <Form onSubmit={handleSubmit(sendData)} className="flex flex-col">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-gray-300 text-xs font-medium ml-1">Full Name</label>
                <Input
                  {...register("name")}
                  placeholder="Enter your name"
                  variant="bordered"
                  radius="lg"
                  autoComplete="off"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                  startContent={<User className="text-gray-400" size={18} />}
                  classNames={{
                    inputWrapper: "bg-[#0b1c45]/50 border-gray-600 text-white focus-within:border-blue-500",
                    input: "text-white text-sm placeholder:text-gray-500",
                  }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 text-xs font-medium ml-1">Username</label>
                <Input
                  {...register("username")}
                  placeholder="Enter your username"
                  variant="bordered"
                  radius="lg"
                  autoComplete="off"
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                  startContent={<User className="text-gray-400" size={18} />}
                  classNames={{
                    inputWrapper: "bg-[#0b1c45]/50 text-white border-gray-600 focus-within:border-blue-500",
                    input: "text-white text-sm placeholder:text-gray-500",
                  }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 text-xs font-medium ml-1">Email address</label>
                <Input
                  {...register("email")}
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  radius="lg"
                  autoComplete="off"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  startContent={<Sms className="text-gray-400" size={18} />}
                  classNames={{
                    inputWrapper: "bg-[#0b1c45]/50 text-white border-gray-600 focus-within:border-blue-500",
                    input: "text-white text-sm placeholder:text-gray-500",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-300 text-xs font-medium ml-1">Password</label>
                  <Input
                    {...register("password")}
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    radius="lg"
                    autoComplete="new-password"
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    startContent={<Lock1 className="text-gray-400" size={18} />}
                    classNames={{
                      inputWrapper: "bg-[#0b1c45]/50 text-white border-gray-600 focus-within:border-blue-500",
                      input: "text-white text-sm placeholder:text-gray-500",
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300 text-xs font-medium ml-1">Confirm Password</label>
                  <Input
                    {...register("rePassword")}
                    placeholder="Confirm your password"
                    type="password"
                    variant="bordered"
                    radius="lg"
                    autoComplete="new-password"
                    isInvalid={!!errors.rePassword}
                    errorMessage={errors.rePassword?.message}
                    startContent={<Lock1 className="text-gray-400" size={18} />}
                    classNames={{
                      inputWrapper: "bg-[#0b1c45]/50 text-white border-gray-600 focus-within:border-blue-500",
                      input: "text-white text-sm placeholder:text-gray-500",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-300 text-xs font-medium ml-1">Date of Birth</label>
                  <Input
                    {...register("dateOfBirth")}
                    type="date"
                    variant="bordered"
                    radius="lg"
                    isInvalid={!!errors.dateOfBirth}
                    errorMessage={errors.dateOfBirth?.message}
                    startContent={<Calendar className="text-gray-400" size={18} />}
                    classNames={{
                      inputWrapper: "bg-[#0b1c45]/50 text-white border-gray-600 focus-within:border-blue-500",
                      input: "text-white text-sm placeholder:text-gray-500",
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300 text-xs font-medium ml-1">Gender</label>
                  <Select
                    {...register("gender")}
                    placeholder="Select gender"
                    variant="bordered"
                    radius="lg"
                    isInvalid={!!errors.gender}
                    errorMessage={errors.gender?.message}
                    startContent={<Woman className="text-gray-400" size={18} />}
                    classNames={{
                      trigger: "bg-[#0b1c45]/50 text-white  border-gray-600 focus-within:border-blue-500",
                      value: "text-white text-sm",
                      popoverContent: "bg-[#0b1c45] text-white border-gray-600 text-white",
                    }}
                  >
                    <SelectItem key="male"  textValue="Male">Male</SelectItem>
                    <SelectItem key="female"  textValue="Female">Female</SelectItem>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isloading}
              className="w-full h-12 bg-linear-to-r from-gray-900 via-gray-800 to-black text-white font-medium rounded-xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
            >
              {isloading ? <Spinner color="white" size="sm" /> : "Sign up"}
            </Button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 font-medium hover:underline">
                Login
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
