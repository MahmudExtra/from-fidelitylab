import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  FormFeedback,
  Input,
  Button,
  Modal,
  ModalBody,
  CardBody,
  CardHeader,
  Label,
  Alert,
  UncontrolledAlert,
} from "reactstrap";

import AuthSlider from "../authCarousel";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../auth/Firebase/useAuth";

const CoverSignUp = () => {
  document.title = "Cover SignUp | Velzon - React Admin & Dashboard Template";

  const {
    user,
    registerUser,
    tog_successMessage,
    modal_successMessage = false,
    loginInWithGoogle,
    loginInWithFacebook,
    loginWithGithub,
    loginWithTwitter,
  } = useAuth();
  const [passwordShow, setPasswordShow] = useState(false);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState(false);
  const [invitationAlert, setInvitationAlert] = useState(false);
  const [invitationField, setInvitationField] = useState(false);

  function tog_categoryModal() {
    setSkillModalOpen(!skillModalOpen);
  }
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: "",
      email: "",
      password: "",
      // expertise: "",
      invitation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(RegExp("(.*[a-z].*)"), "At least lowercase letter")
        .matches(RegExp("(.*[A-Z].*)"), "At least uppercase letter")
        .matches(RegExp("(.*[0-9].*)"), "At least one number")
        .required("This field is required"),
    }),
    onSubmit: (values) => {
      if (category === "Investor") {
        if (values.invitation !== "") {
          registerUser(
            validation.values.email,
            validation.values.password,
            validation.values.username,
            category
          );
          tog_successMessage();
        } else {
          setInvitationAlert(!invitationAlert);
        }
      } else {
        tog_categoryModal();
      }

      // handleRegister(values);
    },
  });

  const handleCategoryPopUp = (e) => {
    e.preventDefault();
    if (category === "Startup") {
      registerUser(
        validation.values.email,
        validation.values.password,
        validation.values.username,
        category
      );
      setSkillModalOpen(!skillModalOpen);
    } else if (category === "Investor") {
      setInvitationField(!invitationField);
      setSkillModalOpen(!skillModalOpen);

      // setAlert(true);
    } else if (category === "Expertise") {
      registerUser(
        validation.values.email,
        validation.values.password,
        validation.values.username,
        category
      );
      setSkillModalOpen(!skillModalOpen);
      // tog_successMessage();
    } else {
      setAlert(!alert);
    }
  };

  // const Expertises = [
  //   "Agriculture services",
  //   "Artificial Intelligence",
  //   "Avionics",
  //   "Biolabs",
  //   "Branding",
  //   "Business",
  //   "Communication Technology",
  //   "Crisis & Risk Management services",
  //   "Deep Tech Investment",
  //   "Due Diligence",
  //   "Earth Observation",
  //   "Environment / Weather services",
  //   "Exploration and SR",
  //   "Finance",
  //   "Government Relations",
  //   "Ground Station",
  //   "GSM",
  //   "Hardware",
  //   "Human Resources",
  //   "Investors",
  //   "IoT",
  //   "IT/Comms services",
  //   "Legal/Insurance TTP",
  //   "Life Science",
  //   "Location-based services",
  //   "Management",
  //   "Maritime Services",
  //   "Marketing",
  //   "MOC & SOC",
  //   "Onboard Software",
  //   "Payload",
  //   "Platform",
  //   "Power",
  //   "Propulsion",
  //   "Robotics",
  //   "Rover",
  //   "SATCOM",
  //   "Satellite Data Marketplace",
  //   "Simulation/Digital twins",
  //   "Space Health",
  //   "Space security",
  //   "SSA",
  //   "Start-ups",
  //   "STM services",
  //   "Structure & Material",
  //   "Telecom & NAV",
  // ];

  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden m-0">
                  <Row className="justify-content-center g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">Register Account</h5>
                          <p className="text-muted">
                            Get your Free Velzon account now.
                          </p>
                        </div>

                        <div className="mt-4">
                          <form
                            className="needs-validation"
                            noValidate
                            action="index"
                            onSubmit={validation.handleSubmit}
                          >
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email <span className="text-danger">*</span>
                              </label>
                              <Input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email address"
                                required
                                value={validation.values.email}
                                // onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                              />
                              <div className="invalid-feedback">
                                Please enter email
                              </div>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="username" className="form-label">
                                Username <span className="text-danger">*</span>
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                required
                                value={validation.values.username}
                                // onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                              />
                              <div className="invalid-feedback">
                                Please enter username
                              </div>
                            </div>
                            {invitationField && (
                              <div className="mb-3">
                                <label
                                  htmlFor="invitation"
                                  className="form-label"
                                >
                                  Invitation Code
                                </label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="invitation"
                                  placeholder="Enter invitation code"
                                  // required
                                  value={validation.values.invitation}
                                  // onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                />
                                <div className="invalid-feedback">
                                  Please enter invitation code
                                </div>
                              </div>
                            )}

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Password
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <Input
                                  type={passwordShow ? "text" : "password"}
                                  className="form-control pe-5 password-input"
                                  placeholder="Enter password"
                                  id="password-input"
                                  name="password"
                                  required
                                  // onChange={(e) => setPassword(e.target.value)}
                                  value={validation.values.password}
                                  // onBlur={validation.handleBlur}
                                  onChange={validation.handleChange}
                                  invalid={
                                    validation.errors.password &&
                                    validation.touched.password
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.password &&
                                validation.touched.password ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.password}
                                  </FormFeedback>
                                ) : null}
                                <Button
                                  color="link"
                                  onClick={() => setPasswordShow(!passwordShow)}
                                  className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                  type="button"
                                  id="password-addon"
                                >
                                  <i className="ri-eye-fill align-middle"></i>
                                </Button>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="mb-0 fs-12 text-muted fst-italic">
                                By registering you agree to the Velzon{" "}
                                <Link
                                  to="#"
                                  className="text-primary text-decoration-underline fst-normal fw-medium"
                                >
                                  Terms of Use
                                </Link>
                              </p>
                            </div>

                            <div
                              id="password-contain"
                              className="p-3 bg-light mb-2 rounded"
                            >
                              <h5 className="fs-13">Password must contain:</h5>
                              <p
                                id="pass-length"
                                className="invalid fs-12 mb-2"
                              >
                                Minimum <b>8 characters</b>
                              </p>
                              <p id="pass-lower" className="invalid fs-12 mb-2">
                                At <b>lowercase</b> letter (a-z)
                              </p>
                              <p id="pass-upper" className="invalid fs-12 mb-2">
                                At least <b>uppercase</b> letter (A-Z)
                              </p>
                              <p
                                id="pass-number"
                                className="invalid fs-12 mb-0"
                              >
                                A least <b>number</b> (0-9)
                              </p>
                            </div>

                            <div className="mt-4">
                              <button
                                className="btn btn-success w-100"
                                type="submit"
                              >
                                Sign Up
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <div className="signin-other-title">
                                <h5 className="fs-13 mb-4 title text-muted">
                                  Create account with
                                </h5>
                              </div>

                              <div>
                                <button
                                  onClick={loginInWithFacebook}
                                  type="button"
                                  className="btn btn-primary btn-icon waves-effect waves-light me-1"
                                >
                                  <i className="ri-facebook-fill fs-16"></i>
                                </button>
                                <button
                                  onClick={loginInWithGoogle}
                                  type="button"
                                  className="btn btn-danger btn-icon waves-effect waves-light me-1"
                                >
                                  <i className="ri-google-fill fs-16"></i>
                                </button>
                                <button
                                  onClick={loginWithGithub}
                                  type="button"
                                  className="btn btn-dark btn-icon waves-effect waves-light me-1"
                                >
                                  <i className="ri-github-fill fs-16"></i>
                                </button>
                                <button
                                  onClick={loginWithTwitter}
                                  type="button"
                                  className="btn btn-info btn-icon waves-effect waves-light"
                                >
                                  <i className="ri-twitter-fill fs-16"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Already have an account ?{" "}
                            <Link
                              to="/auth-signin-cover"
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              {" "}
                              Signin
                            </Link>{" "}
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
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0">
                    &copy; {new Date().getFullYear()} Velzon. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </footer>
        {/* modal for skills */}
        <Modal
          id="success-Payment"
          tabIndex="-1"
          isOpen={skillModalOpen}
          toggle={() => {
            tog_categoryModal();
          }}
          centered
        >
          <Card className="mb-0">
            <CardHeader>
              <h5 className="mb-0">Expertise</h5>
            </CardHeader>
            <CardBody>
              <Col>
                <form onSubmit={handleCategoryPopUp}>
                  <Col md={6}>
                    <div className="mt-4 mt-md-0">
                      <div className="form-check form-radio-outline form-radio-primary mb-3">
                        <Input
                          className="form-check-input"
                          type="radio"
                          name="formradiocolor9"
                          id="Expertise"
                          value={"Expertise"}
                          // value={validation.values.category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        />
                        <Label className="form-check-label" for="Expertise">
                          Expertise
                        </Label>
                      </div>
                      <div className="form-check form-radio-outline form-radio-primary mb-3">
                        <Input
                          className="form-check-input"
                          type="radio"
                          name="formradiocolor9"
                          id="Investor"
                          value={"Investor"}
                          // value={validation.values.category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        />
                        <Label className="form-check-label" for="Investor">
                          Investor
                        </Label>
                      </div>
                      <div className="form-check form-radio-outline form-radio-primary mb-3">
                        <Input
                          className="form-check-input"
                          type="radio"
                          name="formradiocolor9"
                          id="Startup"
                          value={"Startup"}
                          // value={validation.values.category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        />
                        <Label className="form-check-label" for="Startup">
                          Startup
                        </Label>
                      </div>
                    </div>
                  </Col>
                  {/* <div className="form-check form-check-outline form-check-primary mb-1">
                    <Input
                      className="form-check-input"
                      type="radio"
                      id="formCheckExpertise"
                      value={"Expertise"}
                      onChange
                      // defaultChecked
                    />
                    <Label
                      className="form-check-label"
                      for="formCheckExpertise"
                    >
                      Expertise
                    </Label>
                  </div>
                  <div className="form-check form-check-outline form-check-primary mb-1">
                    <Input
                      className="form-check-input"
                      type="radio"
                      id="formCheckInvestor"
                      value={"Investor"}
                      // defaultChecked
                    />
                    <Label className="form-check-label" for="formCheckInvestor">
                      Investor
                    </Label>
                  </div>
                  <div className="form-check form-check-outline form-check-primary mb-1">
                    <Input
                      className="form-check-input"
                      type="radio"
                      id="formCheckStartup"
                      value={"Startup"}
                      // defaultChecked
                    />
                    <Label className="form-check-label" for="formCheckStartup">
                      Startup
                    </Label>
                  </div> */}

                  <Button type="submit" className=" mt-3" color="primary">
                    Submit
                  </Button>
                </form>
              </Col>
            </CardBody>
          </Card>
        </Modal>
        {/* registration success modal */}
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
              <h4 className="mb-3 mt-4">
                Your Account was created Successfully !
              </h4>
              <p className="text-muted fs-15 mb-4">
                Now please log in to continue to Velzon.
              </p>
            </div>
          </ModalBody>
        </Modal>

        {/* alert */}
        <Modal
          id="top-rightmodal"
          tabIndex={-1}
          toggle={() => {
            setAlert(!alert);
          }}
          isOpen={alert}
          className="modal-dialog-right"
        >
          <ModalBody className="p-0">
            <Alert
              color="danger"
              className="mb-0"
              onClick={() => setAlert(!alert)}
            >
              <p className="mb-0">Please select a category!</p>
            </Alert>
          </ModalBody>
        </Modal>
        {/* invitaion alert */}
        <Modal
          id="top-rightmodal"
          tabIndex={-1}
          toggle={() => {
            setInvitationAlert(!invitationAlert);
          }}
          isOpen={invitationAlert}
          className="modal-dialog-right"
        >
          <ModalBody className="p-0">
            <Alert
              color="warning"
              className="mb-0"
              onClick={() => setInvitationAlert(!invitationAlert)}
            >
              <p className="mb-0">Please Enter an invitaion code!</p>
            </Alert>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default CoverSignUp;
