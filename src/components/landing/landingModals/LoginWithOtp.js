import React, { useContext, useState } from "react";
import lmitsLogo from "../../../assets/images/Logo.png";
import TextField from "@material-ui/core/TextField";
import { Button, Grid, Link, makeStyles } from "@material-ui/core";
import LoginWithMail from "./LoginWithMail";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import LoginOtpVerification from "./LoginOtpVerification";
import ForgotPasswordOtpVerification from "./ForgotPasswordOtpVerification";

const useStyles = makeStyles((theme) => ({
  loginButton: {
    color: "#fff",
    background: "#8845d0",
    textTransform: "capitalize",
    marginLeft: "auto",
    fontSize: "15px",
    padding: "0.5rem 1rem",
    outline: "none",
    border: "none",
    borderRadius: "0.5rem",
    opacity: "0.7",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      border: "none",
      background: "#8845d0",
      boxShadow: "0 10px 36px rgba(0, 0, 0, 0.15)",
    },
  },
  asterisk: {
    display: "none",
  },
}));

const LoginWithOtp = (props) => {
  const classes = useStyles();
  const [mobile_number, setMobile_Number] = useState("");
  const [userAuth, setUserAuth] = useContext(UserContext);
  const [otpSent, setOtpSent] = useState(false);

  // let history = useHistory();

  const handleClick = () => {
    setUserAuth("1");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const otpData = {
      mobile_number,
    };
    console.log(otpData);
    axios
      .post(`${process.env.REACT_APP_LOGIN_WITH_OTP}`, otpData)
      .then(function (response) {
        console.log(response.data);
        if (response.data.response_code === 200) {
          localStorage.setItem("lmits_login_mob", mobile_number);
          localStorage.setItem("lmits_otp_details", response.data.otp.Details);
          alert(response.data.message);
          setOtpSent(true);
        } else if (
          response.data.response_code &&
          response.data.response_code !== 200
        ) {
          alert(response.data.message);
          setMobile_Number("");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <img
        src={lmitsLogo}
        style={{
          width: "25%",
          marginLeft: "0.5em",
          padding: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <div>
        <h3
          className="text-black"
          style={{
            fontSize: "20px",
            margin: "0.5em",
            padding: "0.5rem",
            paddingBottom: "0px",
          }}
        >
          Login
        </h3>
        <p
          className="login-card-description mb-0 pb-0"
          style={{
            margin: "0.5em",
            padding: "0.5rem",
          }}
        >
          We will send you a OTP(One Time Password) to verify the below mobile
          number provide by you.
        </p>
      </div>
      {/*<h6>*/}
      {/*  We will send you a OTP(One Time Password) to verify the below mobile*/}
      {/*  number provided by you*/}
      {/*</h6>*/}
      <form onSubmit={onSubmit} className="mb-0 pb-0">
        <div
          style={{
            margin: "0.5em",
            padding: "0.5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            id="MobileNumber"
            type="number"
            value={mobile_number}
            onChange={(e) => setMobile_Number(e.target.value)}
            required
            InputLabelProps={{
              classes: {
                asterisk: classes.asterisk,
              },
              style: { fontSize: 15 },
            }}
            variant="outlined"
            label="Enter Mobile Number"
            size="small"
            style={{ minWidth: "100%" }}
          />
        </div>
        <div
          style={{
            margin: "1rem",
          }}
        >
          <Button
            className={classes.loginButton}
            type="submit"
            variant="contained"
            color="primary"
            style={{
              minWidth: "100%",
            }}
          >
            Generate OTP
          </Button>
          {/* <Grid container style={{ marginTop: '0.6em' }}>
            <Link onClick={handleClick}>
              <p
                className="login-card-forgot f-12"
                style={{ color: '#000', cursor: 'pointer' }}
                onClick={() => {
                  setUserAuth('1');
                }}
              >
                Login with Password
              </p>
            </Link>
          </Grid> */}
        </div>
      </form>
      {otpSent ? <LoginOtpVerification /> : null}
      <div className="form__div otp-forget mt-2 mb-0 pb-0 m-2 p-2">
        <div className="d-inline-block">
          <Link>
            <p
              className="login-card-forgot f-12"
              style={{ color: "#000", cursor: "pointer" }}
            >
              Resend OTP?
            </p>
          </Link>
        </div>

        <div className="pb-0 mb-0">
          <p>
            New to LMiTS?{" "}
            <span
              className="text-black"
              onClick={() => {
                setUserAuth("5");
              }}
              style={{ cursor: "pointer" }}
            >
              SignUp
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginWithOtp;
