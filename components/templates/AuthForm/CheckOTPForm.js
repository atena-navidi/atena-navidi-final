import { useCheckOtp } from "@/core/services/mutations";
import { useState } from "react";

function CheckOTPForm({ mobile, setStep, setIsOpen, setMobile }) {
  const [code, setCode] = useState("");

  const { mutate, isPending } = useCheckOtp();

  const checkOtpHandler = (e) => {
    e.preventDefault();
    if (isPending) return;

    mutate(
      { mobile, code },
      {
        onSuccess: (data) => {
          console.log(data);
          setIsOpen(false);
          setStep(1);
        },
        onError: (error) => console.log(error),
      },
    );
  };

  return (
    <div className="w-full h-full relative bottom-10">
      <h4 className="absolute left-1/2 -translate-x-1/2 top-[59px] text-[28px] font-semibold text-[#282828] whitespace-nowrap">
        کد تایید را وارد کنید
      </h4>

      <label className="absolute right-[30px] top-[138px] text-base font-light text-black">
        کد تایید پیامک شده را وارد کنید
      </label>

      <form
        onSubmit={checkOtpHandler}
        className="absolute left-10 right-10 top-[173px] flex flex-col gap-[41px]"
      >
        <div className="flex flex-row justify-end items-center p-2 gap-2 bg-white border border-black/25 rounded-md h-[54px]">
          <input
            type="text"
            placeholder="کد تایید"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full text-right text-[15px] pr-1.5 font-light text-black/50 outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex flex-row justify-center items-center p-2 gap-2 bg-[#28A745] border border-black/25 rounded-md h-[54px] text-white text-lg font-medium"
        >
          ورود
        </button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
