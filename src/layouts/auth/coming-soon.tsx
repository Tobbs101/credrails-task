import { KudaLogoLight } from "@/assets/svg-components";
import { ComingSoonSvg } from "@/assets/coming-soon";

const ComingSoon = () => {
  return (
    <div className="h-screen flex items-center justify-between flex-col px-3">
      <div className="w-full justify-evenly min-h-[50%] flex items-center flex-col">
        <KudaLogoLight />
        <div className="flex items-center justify-center flex-col gap-2">
          <h1 className="text-brand-purple lg:text-5xl text-4xl text-center font-900">
            Coming Soon Credit Collections
          </h1>
          <p className="text-xl text-center font-medium">
            Be the first to know when we launch.
          </p>
          {/* <div className="flex gap-2 items-center justify-center w-full mt-10">
            <Input
              className="lg:w-[400px] w-full placeholder:text-gray-300 border focus:ring-0 outline-none"
              placeholder="Enter your email address"
            />
            <Button className="bg-brand-purple w-[150px]">Notify me</Button>
          </div> */}
        </div>
      </div>
      <div className="w-full h-[50%] flex items-end justify-center">
        <ComingSoonSvg />
      </div>
    </div>
  );
};

export default ComingSoon;
