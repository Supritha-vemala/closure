import React from "react";
import { useFormik } from "formik";
export default function Form() {
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(`values`, values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "name required";
      } else if (values.name.length < 3) {
        errors.name = "too small name";
      }
      if (!values.password) {
        errors.password = "required";
      } else if (values.password.length < 8) {
        errors.password = "password must be atleast 8";
      }
      return errors;
    },
  });

  console.log(`formik.values`, formik.values);
  console.log(`formik.errors`, formik.errors);
  console.log(`formik.touched`, formik.touched);
  return (
    <div className="container">
      <h2>Formik form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <p>{formik.errors.name}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label for="pwd">Password:</label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
