import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import useAuth from "../../../auth/Firebase/useAuth";
import AuthSlider from "../authCarousel";

const CoverSignIn = () => {
  document.title = "Cover SignIn | Velzon - React Admin & Dashboard Template";
  const {
    loginUser,
    tog_successMessage,
    modal_successMessage = false,
    loginInWithGoogle,
    loginInWithFacebook,
    loginWithGithub,
    loginWithTwitter,
  } = useAuth();
  //
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>

        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden border-0">
                  <Row className="g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p className="text-muted">
                            Sign in to continue to Velzon.
                          </p>
                        </div>

                        <div className="mt-4">
                          <form onSubmit={handleLogin}>
                            <div className="mb-3">
                              <Label htmlFor="username" className="form-label">
                                Username
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              <div className="float-end">
                                <Link
                                  to="/auth-pass-reset-cover"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                              <Label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Password
                              </Label>
                              <div className="position-relative auth-pass-inputgroup mb-3">
                                <Input
                                  type="password"
                                  className="form-control pe-5 password-input"
                                  placeholder="Enter password"
                                  id="password-input"
                                  required
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                  type="button"
                                  id="password-addon"
                                >
                                  <i className="ri-eye-fill align-middle"></i>
                                </button>
                              </div>
                            </div>

                            <div className="form-check">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="auth-remember-check"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4">
                              <Button
                                color="success"
                                className="w-100"
                                type="submit"
                              >
                                Sign In
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <div className="signin-other-title">
                                <h5 className="fs-13 mb-4 title">
                                  Sign In with
                                </h5>
                              </div>

                              <div>
                                <Button
                                  onClick={loginInWithFacebook}
                                  color="primary"
                                  className="btn-icon me-1"
                                >
                                  <i className="ri-facebook-fill fs-16"></i>
                                </Button>
                                <Button
                                  onClick={loginInWithGoogle}
                                  color="danger"
                                  className="btn-icon me-1"
                                >
                                  <i className="ri-google-fill fs-16"></i>
                                </Button>
                                <Button
                                  onClick={loginWithGithub}
                                  color="dark"
                                  className="btn-icon me-1"
                                >
                                  <i className="ri-github-fill fs-16"></i>
                                </Button>
                                <Button
                                  onClick={loginWithTwitter}
                                  color="info"
                                  className="btn-icon"
                                >
                                  <i className="ri-twitter-fill fs-16"></i>
                                </Button>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Don't have an account ?{" "}
                            <a
                              href="/auth-signup-cover"
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              {" "}
                              Signup
                            </a>{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <footer className="footer">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center">
                  <p className="mb-0">
                    &copy; {new Date().getFullYear()} Velzon. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
      <Modal
        id="success-Payment"
        tabIndex="-1"
        isOpen={modal_successMessage}
        toggle={() => {
          tog_successMessage();
        }}
        centered
      >
        <ModalBody className="text-center p-5">
          <div className="text-end">
            <button
              type="button"
              onClick={() => {
                tog_successMessage();
              }}
              className="btn-close text-end"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="mt-2">
            <lord-icon
              src="https://cdn.lordicon.com/tqywkdcz.json"
              trigger="hover"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
            <h4 className="mb-3 mt-4">You have Successfully Logged in!</h4>
            <p className="text-muted fs-15 mb-4">
              Now you will be redirected to the dashboard.
            </p>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CoverSignIn;
