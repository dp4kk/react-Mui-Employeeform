import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useForm, Form } from "../../components/useForm";
import Input from "../../components/controls/Input";
import RadioGroups from "../../components/controls/RadioGroups";
import Select from "../../components/controls/Select";
import DatePicker from "../../components/controls/Datepicker";
import Button from "../../components/controls/Button";
import * as employeeService from "../../services/EmployeeService";
import Checkbox from "../../components/controls/Checkbox";
const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];
const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};
const EmployeeForm = (props) => {

  const {addOrEdit,recordForEdit}=props;

    useEffect(()=>{
      if(recordForEdit!=null){
        setValues({...recordForEdit})
      }

    },[recordForEdit])


  const validate = (fieldValues=values) => {
    let temp = {...errors};
    if('fullName' in fieldValues)
    temp.fullName = fieldValues.fullName ? "" : "This field is required";
    if('email' in fieldValues)
    temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? "" : "Email is not valid";
    if('mobile' in fieldValues)
    temp.mobile = fieldValues.mobile.length > 9 ? "" : "minimum 10 numbers required";
    if('departmentId' in fieldValues)
    temp.departmentId =
      fieldValues.departmentId.length != 0 ? "" : "this field is required";
    setErrors({ ...temp })
    if(fieldValues==values)
    return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
  } = useForm(initialFValues,true,validate);


  const handleSubmit = (e) => {
    e.preventDefault();
     addOrEdit(values,resetForm)

  };
      
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <RadioGroups
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />

          <Select
            name="departmentId"
            label="department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />

          <DatePicker
            name="hireDate"
            label="HireDate"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          />

          <div>
            <Button type="submit" text="submit"></Button>
            <Button  text="Reset" color="default" onClick={resetForm}></Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeForm;
