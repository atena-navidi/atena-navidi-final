import { useSendOtp } from "@/core/services/mutations";
import toast from "react-hot-toast";

function SendOTPFrom({ mobile, setMobile, setStep }) {
  const { mutate, isPending } = useSendOtp();
  const SendOTPHandler = (e) => {
    e.preventDefault();

    if (isPending) return;

    mutate(
      { mobile },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success(data?.data?.message);
          toast(data?.data?.code);
          setStep(2);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };
  return (
    <div
      className="w-96 p-10 bg-amber-50 rounded-2xl"
      onSubmit={SendOTPHandler}
    >
      <h4>ورود به تورینو</h4>
      <form>
        <input
          type="text"
          placeholder="0912 --- ----"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button type="submit">ارسال</button>
      </form>
    </div>
  );
}

export default SendOTPFrom;
