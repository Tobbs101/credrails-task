import { Text } from "../../ui/text";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import { SubmitBtn } from "@/components/ui/submit-btn";
import { Link, useNavigate } from "react-router-dom";
import useCrypto from "@/hooks/use-crypto";
import useUsers from "@/hooks/use-users";
import { useState } from "react";
import { responseModalDefaults as Defaults } from "@/lib/utils";
import { ResponseModal as Response } from "@/@types";
import { Dialog } from "@/components/ui/dialog";
import FailureModalCard from "@/components/custom/failure-modal-card";
import SuccessModalCard from "@/components/custom/success-modal-card";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required!" }),
    lastName: z.string().min(1, { message: "Last Name is required!" }),
    email: z.string().email({ message: "Please enter a valid email address!" }),
    mobileNumber: z
      .string()
      .min(10, { message: "Mobile Number must be at least 10 digits!" })
      .max(15, { message: "Mobile Number must not exceed 15 digits!" })
      .regex(/^\d+$/, { message: "Mobile Number must contain only digits!" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters!" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

const RegistrationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { encrypt } = useCrypto();
  const { addUser } = useUsers();

  const navigate = useNavigate();

  const [successModal, setSuccessModal] = useState<Response>(Defaults);
  const [failureModal, setFailureModal] = useState<Response>(Defaults);

  const handleCloseOnSuccess = () => {
    setSuccessModal(Defaults);
    navigate("/auth/login");
  };

  const handleCloseOnFailure = () => {
    setFailureModal(Defaults);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { confirmPassword, ...rest } = values;

      // Encrypt password before saving
      const payload = { ...rest, password: encrypt(rest.password) };

      const response = await addUser(payload);

      setSuccessModal({
        show: true,
        title: "Success",
        info: response as string,
        primaryBtnLabel: "Proceed",
      });
    } catch (error) {
      setFailureModal({
        show: true,
        title: "Error",
        info: error as string,
        primaryBtnLabel: "Dismiss",
      });
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <>
      <Dialog open={failureModal.show}>
        <FailureModalCard
          title={failureModal.title}
          info={failureModal.info}
          primaryBtnLabel={failureModal.primaryBtnLabel}
          onProceed={() => handleCloseOnFailure()}
        />
      </Dialog>
      <Dialog open={successModal.show}>
        <SuccessModalCard
          title={successModal.title}
          info={successModal.info}
          primaryBtnLabel={successModal.primaryBtnLabel}
          onProceed={() => handleCloseOnSuccess()}
        />
      </Dialog>

      <div className="max-w-[400px] overflow-scroll xl:max-w-[600px] 2xl:max-w-[700px] py-5 w-full flex items-center justify-center flex-col">
        <div className="w-full flex items-center justify-center">
          <Text className="mt-10" size={"3xl"} weight={"semibold"}>
            Register
          </Text>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-full w-full mt-5"
          >
            <div className="flex items-center px-2 justify-center gap-5 flex-wrap">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormInput
                    field={field}
                    className="border min-w-[250px] border-gray-300 shadow-none py-5"
                    label={"First Name"}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormInput
                    field={field}
                    className="border min-w-[250px] border-gray-300 shadow-none py-5"
                    label={"Last Name"}
                  />
                )}
              />
            </div>
            <div className="flex items-center px-2 justify-center gap-5 flex-wrap">
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormInput
                    field={field}
                    type="number"
                    className="border min-w-[250px] border-gray-300 shadow-none py-5"
                    label={"Phone Number"}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormInput
                    type="email"
                    field={field}
                    className="border min-w-[250px] border-gray-300 shadow-none py-5"
                    label={"Email address"}
                  />
                )}
              />
            </div>
            <div className="flex items-center px-2 justify-center gap-5 flex-wrap">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormInput
                    field={field}
                    className="border min-w-[250px] border-gray-300 shadow-none py-5"
                    type="password"
                    label={"Confirm Password"}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormInput
                    field={field}
                    className="border min-w-[250px] border-gray-300 shadow-none py-5"
                    type="password"
                    label={"Confirm Password"}
                  />
                )}
              />
            </div>
            <div className="w-full flex items-center justify-center mt-5">
              <SubmitBtn
                className="w-full max-w-[300px] mx-auto h-[45px] bg-gray-600 border border-gray-600 rounded-lg"
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              >
                Create Account
              </SubmitBtn>
            </div>
            <div className="flex items-center w-full justify-start mx-auto mt-10 pl-3">
              <Text size={"sm"}>Have an account?</Text>
              <Link
                className="ml-1 hover:text-primary text-sm hover:underline"
                to={"/auth/login"}
              >
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default RegistrationForm;
