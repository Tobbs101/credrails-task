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
      // Encrypt password before saving
      const payload = { ...values, password: encrypt(values.password) };

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

      <div className="max-w-[400px] 2xl:max-w-[500px] py-5 w-full flex items-center justify-center flex-col">
        <Text className="mt-10" size={"3xl"} weight={"semibold"}>
          Register
        </Text>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[425px] w-full mt-5"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormInput
                  field={field}
                  className="border border-gray-300 shadow-none py-5"
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
                  className="border border-gray-300 shadow-none py-5"
                  label={"Last Name"}
                />
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormInput
                  field={field}
                  type="number"
                  className="border border-gray-300 shadow-none py-5"
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
                  className="border border-gray-300 shadow-none py-5"
                  label={"Email address"}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormInput
                  field={field}
                  className="border border-gray-300 shadow-none py-5"
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
                  className="border border-gray-300 shadow-none py-5"
                  type="password"
                  label={"Confirm Password"}
                />
              )}
            />

            <div className="">
              <SubmitBtn
                className="w-full h-[45px] rounded-2xl mt-10"
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              >
                Create Account
              </SubmitBtn>
            </div>
            <div className="flex items-center justify-start mt-1 pl-3">
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
