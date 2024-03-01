import { Button, Input, notification } from "antd";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase/firebase.config";

export default function LoginWithPhone() {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [user, setUser] = useState(null);
  const [OTP, setOTP] = useState("");
  console.log(user);
  // hàm lấy mã OTP
  const handleSendOTP = async () => {
    try {
      const reCaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        reCaptcha
      );
      setUser(confirmation);
    } catch (error) {
      console.log(error);
    }
  };

  // hàm giải mã OTP
  const verifyOTP = async () => {
    try {
      const data = await user.confirm(OTP);
      if (data) {
        notification.success({
          message: "Thành công",
          description: "Đăng nhập thành công",
        });
      }
    } catch (error) {
      notification.error({
        message: "Thất bại",
        description: "Đăng nhập thất bại",
      });
    }
  };
  return (
    <>
      <PhoneInput
        country={"vn"}
        value={phoneNumber}
        onChange={(phone) => setPhoneNumber("+" + phone)}
      />
      <div id="recaptcha"></div>
      <Button onClick={handleSendOTP}>Lấy mã</Button>
      <Input value={OTP} onChange={(e) => setOTP(e.target.value)} />
      <Button onClick={verifyOTP}>Xác nhận</Button>
    </>
  );
}
