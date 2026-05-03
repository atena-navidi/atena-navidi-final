"use client";

import ModalContainer from "@/components/partials/containers/ModalContainer";
import React, { use, useState } from "react";
import SendOTPFrom from "./SendOTPFrom";
import CheckOTPForm from "./CheckOTPForm";

function AuthForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  return (
    <div>
      <button className="bg-green-500" onClick={() => setIsOpen(true)}>
        ورود
      </button>

      {step === 1 && (
        <ModalContainer isOpen={isOpen}>
          <SendOTPFrom
            mobile={mobile}
            setMobile={setMobile}
            setStep={setStep}
          />
        </ModalContainer>
      )}
      {step === 2 && (
        <ModalContainer isOpen={isOpen}>
          <CheckOTPForm mobile={mobile} setStep={setStep} setIsOpen={setIsOpen}/>
        </ModalContainer>
      )}
    </div>
  );
}

export default AuthForm;
