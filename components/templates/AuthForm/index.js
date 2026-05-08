"use client";

import ModalContainer from "@/components/partials/containers/ModalContainer";
import React, { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";

function AuthForm({ isOpen, setIsOpen, step, setStep }) {
  const [mobile, setMobile] = useState("");

  return (
    <>
      {step === 1 && (
        <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
          <SendOTPForm
            mobile={mobile}
            setMobile={setMobile}
            setStep={setStep}
          />
        </ModalContainer>
      )}

      {step === 2 && (
        <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
          <CheckOTPForm
            mobile={mobile}
            setMobile={setMobile}
            setStep={setStep}
            setIsOpen={setIsOpen}
          />
        </ModalContainer>
      )}
    </>
  );
}

export default AuthForm;
