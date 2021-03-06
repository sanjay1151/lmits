import React from "react";
import { Typography, Row, Col } from "antd";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Slide,
  makeStyles,
} from "@material-ui/core";
import styles from "../../styles/profile/Support.module.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  marginAutoContainer: {
    width: 500,
    height: 80,
    display: "flex",
    backgroundColor: "gold",
  },
  marginAutoItem: {
    margin: "auto",
  },
  alignItemsAndJustifyContent: {
    width: 500,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const { Title } = Typography;

const Support = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={2} className={styles.paper_padd}>
      <Row>
        <Col className={styles.title_padd}>
          <Title level={4}>Support</Title>
        </Col>

        <Col className={styles.content_padd}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined" className={styles.card_padd}>
                <Title level={4}>Contact</Title>
                <Box display="flex">
                  <Box className="text-muted">
                    Reach our customer support representatives for any of your
                    queries and/or feedback and to any issue. <br />
                    <br />
                    Our phone support is available between 9AM - 6PM from Monday
                    - Friday.
                  </Box>
                </Box>
                <br />
                <br />
                <Typography className="text-center" variant="h4" component="h4">
                  +91 86200 87300
                </Typography>
                {/* <Button
                  className={styles.btn}
                  onClick={handleClickOpen}
                  color="primary"
                  variant="contained"
                >
                  Call Us
                </Button> 

                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <div style={{ display: 'flex' }}>
                    <DialogTitle
                      style={{ flexGrow: 2 }}
                      id="alert-dialog-slide-title"
                    >
                      {'Customer Support'}
                    </DialogTitle>
                  </div>

                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      <Typography
                        className="text-center"
                        component={'span'}
                        variant={'body2'}
                      >
                        +91 86200 87300
                      </Typography>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>*/}
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card variant="outlined" className={styles.card_padd}>
                <Title level={4}>Email</Title>
                <Box display="flex">
                  <Box className="text-muted">
                    Drop us an email at any point of time for any of your
                    queries and/or feedback and to report any issue.
                    <br />
                    <br />
                    our supoort teak will get back to you within 24 hours.{" "}
                    <br />
                    <br />
                    <span className="font-weight-medium f-16">
                      Email: support@lmits.in
                    </span>
                  </Box>
                </Box>
                <div className="text-center">
                  <a href={"mailto:support@lmits.in"}>
                    <Button
                      className={styles.btn}
                      color="primary"
                      variant="contained"
                    >
                      Email Us
                    </Button>
                  </a>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Col>
      </Row>
    </Paper>
  );
};

export default Support;
