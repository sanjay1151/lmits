import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Link } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
import { UserContext } from "../../../context/UserContext";



const useStyles = makeStyles((theme) => ({
  loginButton: {
    color: '#fff',
    background: '#8845d0',
    textTransform: 'capitalize',
    marginLeft: 'auto',
    fontSize: '15px',
    padding: '0.5rem 1rem',
    outline: 'none',
    border: 'none',
    borderRadius: '0.5rem',
    opacity: '0.7',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      border: 'none',
      background: '#8845d0',
      boxShadow: '0 10px 36px rgba(0, 0, 0, 0.15)',
    },
  },
  asterisk: {
    display: 'none',
  },
}));

const ForgotPasswordOtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [userAuth, setUserAuth] = useContext(UserContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const otpVerifyData = {
      otp,
      details: localStorage.getItem('lmits_otp_details'),
      controller: 'users',
      action: 'verify_otp',
    };
    console.log(otpVerifyData);
    axios
      .post(`${process.env.REACT_APP_VERIFY_FORGOT_PASS}`, otpVerifyData)
      .then(function (response) {
        console.log(response.data);
        if (response.data.response_code === 200) {
          localStorage.removeItem('lmits_otp_details');
          alert(response.data.message);
          setUserAuth("4");
        } else if (
          response.data.response_code &&
          response.data.response_code !== 200
        ) {
          alert(response.data.message);
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div
        style={{
          marginLeft: '1rem',
        }}
      >
        <h5 className="text-muted">Verify Mobile Number</h5>
        <p>
          we sent a verification code to{' '}
          {localStorage.getItem('lmits_login_mob')} <br />
          Enter the Code Below
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div
          style={{
            margin: '0.5em',
            padding: '0.5rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            id="OTP"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            InputLabelProps={{
              classes: {
                asterisk: classes.asterisk,
              },
              style: { fontSize: 15 },
            }}
            variant="outlined"
            label="Enter OTP"
            size="small"
            style={{ minWidth: '100%' }}
          />
        </div>
        <div
          style={{
            margin: '0.5em',
            padding: '0.5rem',
          }}
        >
          <Button
            className={classes.loginButton}
            type="submit"
            variant="contained"
            color="primary"
            style={{
              minWidth: '100%',
            }}
          >
            Verify
          </Button>
        </div>
      </form>

      <div className="form__div otp-forget mt-2 mb-0 pb-0 m-2 p-2">
        <div className="d-inline-block">
          <Link>
            <p
              className="login-card-forgot f-12"
              style={{ color: '#000', cursor: 'pointer' }}
            >
              Resend OTP?
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordOtpVerification;
