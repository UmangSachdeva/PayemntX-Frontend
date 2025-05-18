import { useSignup } from "@/api/mutations/auth";
import Checkbox from "@/components/checkbox";
import Form from "@/components/form";
import Input from "@/components/input";

import NoSidebarLayout from "@/layouts/nosidebarlayout";
import { SignupCreds } from "@/types/auth";
import { signupValidator } from "@/validations/auth";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { CircularProgress } from "@heroui/progress";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreditCard, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const { mutate: signup, isPending } = useSignup();

  const handleSignup = (data: SignupCreds) => {
    if (!isPending) signup(data);
  };

  return (
    <NoSidebarLayout>
      <div className="flex justify-center h-full gap-4 overflow-hidden">
        <div className="flex items-center justify-center w-1/2 h-full">
          <Card className="w-full mb-4">
            <CardHeader>
              <div className="flex flex-col items-center w-full">
                <div className="p-4 mb-4 shadow-md border-white/10 border-1 shadow-white/20 rounded-xl w-fit">
                  <CreditCard />
                </div>

                <p className="text-xl font-bold">Create Account</p>

                <p className="text-default-600">
                  Sign up for PaymentX to start managing your payments
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Form
                resolver={yupResolver(signupValidator)}
                onSubmit={(data: SignupCreds) => {
                  handleSignup(data);
                }}
              >
                <div className="flex flex-col items-center w-full gap-4">
                  <Input
                    controller={{
                      name: "name",
                    }}
                    input={{
                      isRequired: true,
                      errorMessage: "Please enter a valid email",
                      label: "Name",
                      labelPlacement: "outside",
                      placeholder: "Name",
                      type: "text",
                    }}
                  />
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
                          {isVisible ? (
                            <EyeOff className="pointer-events-none text-default-400" />
                          ) : (
                            <Eye className="pointer-events-none text-default-400" />
                          )}
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

                  <Checkbox
                    label="I accept the terms and conditions and privacy policy"
                    labelProps={{
                      className: "hover:underline font-semibold cursor-pointer",
                    }}
                    name="termsAndConditions"
                  />
                  <Button
                    className="w-full bg-primary text-semibold"
                    type="submit"
                  >
                    Get Started
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
                    Already have an account?{" "}
                    <Link className="hover:underline" to="/">
                      Log in
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
    </NoSidebarLayout>
  );
}

export default Signup;
