import React, { useRef } from 'react'

const ResetPassword = () => {

    const emailRef = useRef(null);
    const otpRef = useRef(null);

    const sendOTP = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/util/sendotp`, {
            method: 'POST',
            body : JSON.stringify({email: emailRef.current.value}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.status);
    }

    const verifyOTP = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/util/verifyotp/${emailRef.current.value}/${otpRef.current.value}`);
        console.log(res.status);
    }

  return (
    <div>
        <h2>Reset Your Password</h2>

        <label htmlFor="">Enter Registered Email</label>
        <input type="text" ref={emailRef} />

        <button onClick={sendOTP}>Send OTP</button>

        <label htmlFor="">Enter OTP</label>
        <input type="text" ref={otpRef} />

        <button onClick={verifyOTP}>Verify OTP</button>
    </div>
  )
}

export default ResetPassword;