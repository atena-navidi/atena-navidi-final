import { useCheckOtp } from "@/core/services/mutations";
import { useState } from "react";

function CheckOTPForm({ mobile, setStep, setIsOpen }) {
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
    <div
      className="w-96 p-10 bg-amber-50 rounded-2xl"
      onSubmit={checkOtpHandler}
    >
      <h4>کد تایید را وارد کنید</h4>
      <form>
        <input
          type="text"
          placeholder="کد تایید"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">ورود</button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
