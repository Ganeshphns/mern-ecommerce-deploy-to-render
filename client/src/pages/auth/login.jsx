import CommonForm from "@/components/common/form";
//import { Textarea } from "@/components/ui/textarea"; // Adjust the path based on your project

import { LoginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        //title: data?.payload?.message,
        toast.success(data?.payload?.message || "Something went wrongsu");

        // console.log(data?.payload?.message)
        // navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message || "Something went wrongel", {
          variant: "destructive",
        });
      }
    });
    //console.log("Submitted data:", formData);
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={LoginFormControls}
        buttonText={"Log In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
