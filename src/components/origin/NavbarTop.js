import React, { useContext } from "react";
import logo from "../../assets/images/Logo.png";
import appStoreImg from "../../assets/images/navicons/Appstore.png";
import playStoreImg from "../../assets/images/navicons/Playstore.png";
import profileImg from "../../assets/images/navicons/profile.png";
import loginImg from "../../assets/images/login.svg";
import { Button } from "@material-ui/core";
import LoginWithMail from "../landing/landingModals/LoginWithMail";
import { UserContext } from "../../context/UserContext";
import LoginWithOtp from "../landing/landingModals/LoginWithOtp";
import ForgotPasswordOtp from "../landing/landingModals/ForgotPasswordOtp";
import EnterNewPassword from "../landing/landingModals/EnterNewPassword";
import SignupWithOtp from "../landing/landingModals/SignupWithOtp";
import SignUpForm from "../landing/landingModals/SignUpForm";

import { Link } from "react-router-dom";

// Dialog
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// Ant Design
import { Layout, Menu, Typography, Row, Col } from "antd";

const styles = (theme) => ({
  root: {
    overflowX: "hidden",
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: "-1rem",
    top: "-1rem",
    // right: theme.spacing(1),
    // top: theme.spacing(1),
    color: "#fff",
    backgroundColor: "#8845d0",
    "& :hover": {
      color: "#8845d0",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "700px",
      transition: "all 0.64s ease-in-out",
    },
    "& .MuiDialogContent-root": {
      overflow: "hidden",
    },
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          style={{ outline: "none" }}
          disableRipple="true"
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const NavbarTop = () => {
  const [userAuth, setUserAuth] = useContext(UserContext);
  // Dialog
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  // Ant Design
  const { Text } = Typography;

  const handleClickOpen = () => {
    setOpen(true);
    setUserAuth("1");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const profHolder = (
    <div className="header_img">
      <a href="">
        <img src={profileImg} alt="" />
      </a>
    </div>
  );

  const modalComponent = () => {
    switch (userAuth) {
      case "1":
        return <LoginWithMail />;
      case "2":
        return <LoginWithOtp />;
      case "3":
        return <ForgotPasswordOtp />;
      case "4":
        return <EnterNewPassword />;
      case "5":
        return <SignupWithOtp />;
      case "6":
        return <SignUpForm />;
      default:
        return <LoginWithMail />;
    }
  };

  const authentication = (
    <Menu.Item>
      <Button onClick={handleClickOpen} className="login_signup">
        Login/SignUp
      </Button>

      <Dialog
        className={classes.root}
        disableBackdropClick="true"
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent>
          <div className="container">
            <Row>
              <Col md={10} className="popup__photo m-auto">
                <img src={loginImg} alt="LMiTS Login Image" />
              </Col>
              <Col md={13} className="popup__text ">
                <div className="card-body p-0">{modalComponent()}</div>
              </Col>
            </Row>
          </div>
        </DialogContent>
      </Dialog>
    </Menu.Item>
  );

  return (
    <div className="header-fluid">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="LMiTS" height={20} />
        </div>

        <Menu mode="horizontal">
          <Menu.Item></Menu.Item>
          <Menu.Item className="ant_text_disable nav-name">
            <Text className="font-weight-medium" style={{ color: "#303952" }}>
              Download
            </Text>
          </Menu.Item>

          <Typography.Link>
            <Link
              className="app-store"
              to={{ pathname: "https://www.apple.com/in/ios/app-store/" }}
              target="_blank"
            >
              <img src={appStoreImg} alt="App Store" width={30} />
            </Link>
          </Typography.Link>

          <Typography.Link>
            <Link
              className="play-store"
              to={{ pathname: "https://play.google.com/store?hl=en_IN" }}
              target="_blank"
            >
              <img src={playStoreImg} alt="Play Store" width={25} />
            </Link>
          </Typography.Link>
          {authentication}
        </Menu>
      </div>
    </div>
  );
};

export default NavbarTop;
