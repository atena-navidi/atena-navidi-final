import { useSendOtp } from "@/core/services/mutations";
import toast from "react-hot-toast";
import { mobileSchema } from "@/core/validation/validation";

function SendOTPForm({ mobile, setMobile, setStep }) {
  const { mutate, isPending } = useSendOtp();

  const SendOTPHandler = async (e) => {
    e.preventDefault();
    if (isPending) return;

    const cleanedMobile = mobile.replace(/\D/g, "");

    try {
      await mobileSchema.validate({ mobile: cleanedMobile });
    } catch (err) {
      return toast.error(err?.message);
    }

    mutate(
      { mobile: cleanedMobile },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message);
          setStep(2);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "خطا در ارسال کد");
        },
      },
    );
  };

  return (
    <div className="w-full h-full relative bottom-10">
      <h4
        className="absolute left-1/2 -translate-x-1/2 top-[40px] text-[28px] font-semibold text-[#282828] whitespace-nowrap"
        style={{ fontFamily: "Yekan Bakh" }}
      >
        ورود به تورینو
      </h4>

      <label
        className="absolute right-[45px] top-[138px] p-1.5 text-base font-light text-black"
        style={{ fontFamily: "Yekan Bakh" }}
      >
        شماره موبایل خود را وارد کنید
      </label>

      <form
        onSubmit={SendOTPHandler}
        className="absolute left-10 right-10 top-[173px] flex flex-col gap-[41px]"
      >
        <div className="flex flex-row justify-start items-center p-2  bg-white border border-black/25 rounded-md h-[54px]">
          <input
            type="text"
            inputMode="numeric"
            maxLength={11}
            placeholder="۰۹۱۲۰۰۰۰۰۰۰"
            value={mobile}
            onChange={(e) => {
              const raw = e.target.value;

              const english = raw
                .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
                .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));

              const cleaned = english.replace(/\D/g, "");

              setMobile(cleaned);
            }}
           
          />
        </div>

        <button
          type="submit"
          className="flex flex-row justify-center items-center p-2 gap-2 bg-[#28A745] border border-black/25 rounded-md h-[54px] text-white text-lg font-medium"
        >
          ارسال کد تایید
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
