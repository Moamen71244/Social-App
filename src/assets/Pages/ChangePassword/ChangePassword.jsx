import { Input, Form, Button, Spinner } from "@heroui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

const changepasswordSchema = zod.object({
  password: zod.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must be at least 8 characters with upper, lower, and numbers"),
  newPassword: zod.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "New password must follow the same security rules"),
}).refine((obj) => obj.password !== obj.newPassword, {
  path: ["newPassword"],
  message: "New password must be different from current password"
});

export default function ChangePassword() {
  const { token, logOutUser, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: { password: "", newPassword: "" },
    mode: "all",
    resolver: zodResolver(changepasswordSchema)
  });

  async function sendData(data) {
    setisloading(true);
    toast.promise(
      axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/change-password`,
        data, {
          headers: { token: localStorage.getItem("token") }
        }
      ),
      {
        pending: "Updating password...",
        success: {
          render({ data }) {
            localStorage.removeItem("token");
            localStorage.setItem("token", data.data.data.token);
            setTimeout(() => navigate("/"), 1500);
            return "Password updated successfully";
          },
        },
        error: {
          render({ data }) {
            return data?.response?.data?.error || "Failed to update password";
          },
        },
      }
    ).finally(() => setisloading(false));
  }

  return (
    <div className="min-h-screen bg-modern-gradient flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={3000} theme="dark" transition={Bounce} />
      <Form 
        onSubmit={handleSubmit(sendData)}
        className="glass-card w-full max-w-md p-8 rounded-[2.5rem] flex flex-col gap-6 shadow-2xl"
      >
        <div className="text-center">
          <h2 className="text-3xl font-black display-font tracking-tight mb-2">Security Hub</h2>
          <p className="text-sm text-slate-500 font-medium">Update your account password</p>
        </div>

        <div className="flex flex-col w-full gap-4">
          <Input
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            label="Current Password"
            labelPlacement="outside"
            placeholder="••••••••"
            type="password"
            variant="bordered"
            classNames={{
              label: "text-xs font-bold uppercase tracking-wider text-slate-400",
              inputWrapper: "h-12 rounded-2xl border-slate-200/50 focus-within:border-primary-500"
            }}
          />

          <Input
            {...register("newPassword")}
            isInvalid={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
            label="New Secure Password"
            labelPlacement="outside"
            placeholder="••••••••"
            type="password"
            variant="bordered"
            classNames={{
              label: "text-xs font-bold uppercase tracking-wider text-slate-400",
              inputWrapper: "h-12 rounded-2xl border-slate-200/50 focus-within:border-primary-500"
            }}
          />
        </div>

        <Button 
          disabled={isloading} 
          color="primary" 
          variant="shadow"
          className="h-12 rounded-2xl font-bold text-sm tracking-wide mt-2" 
          type="submit"
        >
          {isloading ? <Spinner size="sm" color="white" /> : "Update Security Key"}
        </Button>

        <div className="text-center pt-2">
          <p className="text-sm text-slate-500">
            Changed your mind? 
            <Link className="text-primary-600 font-bold ml-2 hover:underline" to="/">Return Home</Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
