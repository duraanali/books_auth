import React, { useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../store/api/AuthSlice";

const Login = () => {

  const [ login, { error = {} }] = useLoginMutation();
  const navigate = useNavigate();
  const [loginErrror, setLoginError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    login({
      email: values.email,
      password: values.password,
    }).unwrap().then(() => {
      navigate("/");
      window.location.reload();
    }
    );
  };

  useEffect(() => {
    if (error.status === 401) {
      setLoginError("Invalid email or password");
    }

    if (error.status === 500) {
      setLoginError("Something went wrong, please try again later");
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-row items-center justify-center bg-gray-200">
      <div className="mx-auto rounded-lg bg-white p-10 shadow md:w-3/4 lg:w-1/2">
        <h4 className="mb-10 text-2xl font-bold">Login</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
          <div className="mb-5">
            {loginErrror && <div className="text-red-500">{loginErrror}</div>}
          </div>
            <div className="mb-5">
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
         
            <button
              type="submit"
              className="mt-4 rounded-3xl bg-red-400 px-12 py-3 text-white hover:bg-red-500"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;