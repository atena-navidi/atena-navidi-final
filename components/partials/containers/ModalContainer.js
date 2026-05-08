import { useState } from "react";
import SendOTPForm from "@/components/templates/AuthForm/SendOTPForm";
import CheckOTPForm from "@/components/templates/AuthForm/CheckOTPForm";
import Image from "next/image";

function ModalContainer({ isOpen, setIsOpen }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[561px] h-[362px] bg-white rounded-[20px] p-5 shadow-xl flex flex-col"
      >
        <div className="absolute top-3 left-5 z-50">
          {step === 1 ? (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            >
              <Image src="/icons/add.svg" width={28} height={28} alt="close" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="cursor-pointer"
            >
              <Image
                src="/icons/arrow-left.svg"
                width={20}
                height={20}
                alt="back"
              />
            </button>
          )}
        </div>

        <div className="flex-1 mt-8">
          {step === 1 ? (
            <SendOTPForm
              mobile={mobile}
              setMobile={setMobile}
              setStep={setStep}
            />
          ) : (
            <CheckOTPForm
              mobile={mobile}
              setStep={setStep}
              setIsOpen={setIsOpen}
              setMobile={setMobile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
