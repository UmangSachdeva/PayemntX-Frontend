import { CircularProgress } from "@heroui/progress";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import Form from "@/components/form";
import Input from "@/components/input";
import { authValidator } from "@/validations/auth";
import { useLogin } from "@/api/mutations/auth";
import { LoginCreds } from "@/types/auth";
import { Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  const { mutate: login, isPending } = useLogin();
  const [isVisible, setIsVisible] = useState(false);

  const handleLogin = (data: LoginCreds) => {
    if (!isPending) login(data);
  };

  return (
    <div className="flex justify-center h-full gap-4 overflow-hidden">
      <div className="flex items-center justify-center w-1/2 h-full">
        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-col items-center w-full">
              <div className="p-4 mb-4 shadow-md border-white/10 border-1 shadow-white/20 rounded-xl w-fit">
                <LogIn />
              </div>

              <p className="text-xl font-bold">Login with your Email</p>

              <p className="text-default-600">
                Sign in to your account to manage your payments
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Form
              resolver={yupResolver(authValidator)}
              onSubmit={(data: LoginCreds) => {
                handleLogin(data);
              }}
            >
              <div className="flex flex-col items-center w-full gap-4">
                <Input
                  controller={{
                    name: "email",
                  }}
                  input={{
                    isRequired: true,
                    errorMessage: "Please enter a valid email",
                    label: "Email",
                    labelPlacement: "outside",
                    placeholder: "Email",
                    type: "email",
                  }}
                />
                <Input
                  controller={{
                    name: "password",
                  }}
                  input={{
                    isRequired: true,
                    endContent: (
                      <button
                        title="button"
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {/* <Icon
                        className="pointer-events-none text-default-400"
                        icon={isVisible ? "lucide:eye-off" : "lucide:eye"}
                      /> */}
                      </button>
                    ),
                    label: "Password",
                    labelPlacement: "outside",
                    placeholder: "Password",
                    type: `${isVisible ? "text" : "password"}`,
                  }}
                />
                <Button
                  className="w-full bg-primary text-semibold"
                  type="submit"
                >
                  Login
                  {isPending ? (
                    <CircularProgress
                      classNames={{
                        svg: "w-[22px] h-[22px] text-white",
                      }}
                      size="sm"
                    />
                  ) : null}
                </Button>
              </div>
            </Form>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex flex-col justify-center w-full gap-4">
              <div className="flex justify-center">
                <p className="">
                  Don't have and account?{" "}
                  <Link className="hover:underline" to="/signup">
                    Create an account
                  </Link>
                </p>
              </div>
              <div className="flex items-center justify-center w-full gap-2">
                <Lock className="w-[14px] h-[14px] text-default-600" />{" "}
                <span className="text-sm text-default-600">
                  Secure, encrypted connection
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;
