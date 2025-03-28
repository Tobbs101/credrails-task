import { Text } from "../../ui/text";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import { SubmitBtn } from "@/components/ui/submit-btn";
import { Link, useNavigate } from "react-router-dom";
import { responseModalDefaults as Defaults } from "@/lib/utils";
import { ResponseModal as Response } from "@/@types";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import FailureModalCard from "@/components/custom/failure-modal-card";
import SuccessModalCard from "@/components/custom/success-modal-card";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address!" }),
  password: z.string().min(2, { message: "Please enter your password!" }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const [successModal, setSuccessModal] = useState<Response>(Defaults);
  const [failureModal, setFailureModal] = useState<Response>(Defaults);

  const handleCloseOnSuccess = () => {
    setSuccessModal(Defaults);
    navigate("/artiste");
  };

  const handleCloseOnFailure = () => {
    setFailureModal(Defaults);
  };

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {};

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
          Log In
        </Text>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[425px] w-full mt-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
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
                  label={"Password"}
                />
              )}
            />

            <div className="">
              <SubmitBtn
                className="w-full h-[45px] rounded-2xl mt-10"
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              >
                Log In
              </SubmitBtn>
            </div>
            <div className="flex items-center justify-start mt-1 pl-3">
              <Text size={"sm"}>Don't have an account?</Text>
              <Link
                className="ml-1 hover:text-primary text-sm hover:underline"
                to={"/auth/register"}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
