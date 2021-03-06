import React, { useContext, useEffect, useState } from "react";
import lmitsLogo from "../../../assets/images/Logo.png";
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles, Container } from "@material-ui/core";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import SignupOtpVerification from "./SignupOtpVerification";
import LoginOtpVerification from "./LoginOtpVerification";
import Link from "@material-ui/core/Link";
import InputAdornment from "@material-ui/core/InputAdornment";
import Alert from "@material-ui/lab/Alert";
import styles from "../../../styles/landing/SignupWithOtp.module.css";

// Ant Design
import { Row, Col } from "antd";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8845d0",
    },
  },
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

const SignupWithOtp = () => {
  const classes = useStyles();
  const [userAuth, setUserAuth] = useContext(UserContext);
  const [mobile_number, setMobile_Number] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [counter, setCounter] = useState(0);
  const [changeDet, setChangeDet] = useState(true);
  const [otpCounter, setOtpCounter] = useState(0);

  const handleClick = () => {
    setUserAuth("1");
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  useEffect(() => {
    const otpTimer =
      otpCounter > 0 && setInterval(() => setOtpCounter(otpCounter - 1), 1000);
    return () => {
      clearInterval(otpTimer);
    };
  }, [otpCounter]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setOtpSent(false);
    setChangeDet(false);

    if (mobile_number.length === 10) {
      const otpSignUpData = {
        mobile_number,
        controller: "users",
        action: "verify_mobile",
        user: {
          mobile_number,
        },
      };
      console.log(otpSignUpData);

      axios
        .post(`${process.env.REACT_APP_SIGNUP_WITH_OTP}`, otpSignUpData)
        .then(function (response) {
          console.log(response.data);
          if (response.data.response_code === 200) {
            localStorage.setItem("lmits_login_mob", mobile_number);
            localStorage.setItem(
              "lmits_otp_details",
              response.data.otp.Details
            );
            setOtpSent(true);
            setCounter(15);
            setOtpCounter(3);
          } else if (
            response.data.response_code &&
            response.data.response_code !== 200
          ) {
            // alert(response.data.message);
            setMobile_Number("");
            setErrorMsg(response.data.message);
          }
        })
        .catch((err) => alert(err));
    } else {
      setErrorMsg("Enter a valid Mobile Number");
      setMobile_Number("");
    }
  };

  const resendOtp = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (mobile_number.length === 10) {
      const otpSignUpData = {
        mobile_number,
        controller: "users",
        action: "verify_mobile",
        user: {
          mobile_number,
        },
      };
      console.log(otpSignUpData);

      axios
        .post(`${process.env.REACT_APP_SIGNUP_WITH_OTP}`, otpSignUpData)
        .then(function (response) {
          console.log(response.data);
          if (response.data.response_code === 200) {
            localStorage.setItem("lmits_login_mob", mobile_number);
            localStorage.setItem(
              "lmits_otp_details",
              response.data.otp.Details
            );
            setCounter(15);
            setOtpCounter(3);
          } else if (
            response.data.response_code &&
            response.data.response_code !== 200
          ) {
            // alert(response.data.message);
            setMobile_Number("");
            setErrorMsg(response.data.message);
          }
        })
        .catch((err) => alert(err));
    } else {
      setErrorMsg("Enter a valid Mobile Number");
      setMobile_Number("");
    }
  };

  return (
    <>
      <Row>
        <Col>
          <div className={styles.signup__img}>
            <img src={lmitsLogo} alt="LogoImg" />

            <h3 className={styles.signup__title}>Sign Up with OTP</h3>
          </div>
        </Col>
      </Row>

      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <Row>
          <Col xs={24} md={22}>
            <div className={styles.signup__error}>
              {!otpSent ? (
                !changeDet && errorMsg !== "" ? (
                  <div>
                    <Alert severity="error">{errorMsg}</Alert>
                  </div>
                ) : null
              ) : null}

              {otpCounter !== 0 ? (
                <Alert severity="success">Otp Sent Successfully</Alert>
              ) : null}
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={24} md={22}>
            <div className={styles.signup__form__div}>
              <TextField
                autoFocus
                className={`${styles.signup__textfield} ${classes.root}`}
                id="MobileNumber"
                type="number"
                value={mobile_number}
                onChange={(e) => {
                  setMobile_Number(e.target.value);
                  setOtpSent(false);
                  setChangeDet(true);
                }}
                required
                InputLabelProps={{
                  classes: {
                    asterisk: classes.asterisk,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment disableTypography={true} position="start">
                      +91 -
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                label="Enter Mobile Number"
                size="small"
              />
            </div>

            <div align="middle" className={styles.signup__btn_div}>
              <Button
                disabled={otpSent}
                className={styles.signup__btn}
                type="submit"
                variant="contained"
                color="primary"
              >
                Send OTP
              </Button>
            </div>
          </Col>
        </Row>
      </form>

      <Row>
        <Col xs={24} md={22}>
          <div className={styles.sigup__div_signup}>
            {!otpSent ? (
              <p>
                Already have an account?{" "}
                <span
                  className={styles.sigup__txt_signup}
                  onClick={() => {
                    setUserAuth("1");
                  }}
                >
                  Login
                </span>
              </p>
            ) : null}
          </div>
        </Col>
        <Col className={styles.sigup_otp__resend_div}>
          {otpSent ? <SignupOtpVerification /> : null}
          <div>
            {otpSent && counter !== 0 ? (
              <p className={styles.sigup_otp__resend}>
                Resend OTP in {counter} sec
              </p>
            ) : null}

            {otpSent && counter === 0 ? (
              <div>
                <Link onClick={resendOtp}>
                  <p className={styles.sigup_otp__resend}>Resend OTP</p>
                </Link>
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SignupWithOtp;
