import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/dCandidate";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuList,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "./useForm";
import { useToasts } from "react-toast-notifications";
const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 20,
      maxWidth: 155,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 155,
    maxWidth: 155,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const intialFileValues = {
  fullName: "",
  mobile: "",
  email: "",
  age: "",
  bloodGroup: "",
  address: "",
};

export const DCandidateForm = ({ classes, ...props }) => {
  const dispatch = useDispatch();
  const dCandidateList = useSelector((state) => state.dCandidate.list);
  const { addToast } = useToasts();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile ? "" : "This field is required.";
    if ("bloodGroup" in fieldValues)
      temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not vaild.";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    resetForm,
  } = useForm(intialFileValues, validate, props.setCurrentId);

  const inputLabel = useRef(null);
  const [lableWidth, setLableWidth] = useState(0);
  useEffect(() => {
    setLableWidth(inputLabel.current.offsetWidth);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Your information has been submitted.", { appearance: "success" });
      };
      if (props.currentId === 0) 
      dispatch(actions.create(values, onSuccess));
      else 
      dispatch(actions.update(props.currentId, values, onSuccess));
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...dCandidateList.find((candidate) => candidate.id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId, dCandidateList, setValues, setErrors]);

  return (
    <form
      autoComplete='off'
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name='fullName'
            variant='outlined'
            label='Full Name'
            value={values.fullName}
            onChange={handleChange}
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          />
          <TextField
            name='email'
            variant='outlined'
            label='Email'
            value={values.email}
            onChange={handleChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <FormControl
            variant='outlined'
            className={classes.formControl}
            {...(errors.bloodGroup && { error: true })}
          >
            <InputLabel ref={inputLabel}>BloodGroup</InputLabel>
            <Select
              name='bloodGroup'
              value={values.bloodGroup}
              onChange={handleChange}
              labelWidth={lableWidth}
            >
              <MenuList value=''>Select Blood Group</MenuList>
              <MenuList value='A+'>A+</MenuList>
              <MenuList value='A-'>A-</MenuList>
              <MenuList value='B+'>B+</MenuList>
              <MenuList value='B-'>B-</MenuList>
              <MenuList value='AB+'>AB+</MenuList>
              <MenuList value='AB-'>AB-</MenuList>
              <MenuList value='O+'>O+</MenuList>
              <MenuList value='O-'>O-</MenuList>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name='mobile'
            variant='outlined'
            label='Mobile'
            value={values.mobile}
            onChange={handleChange}
            {...(errors.mobile && { error: true, helperText: errors.mobile })}
          />
          <TextField
            name='age'
            variant='outlined'
            label='Age'
            value={values.age}
            onChange={handleChange}
          />
          <TextField
            name='address'
            variant='outlined'
            label='Address'
            value={values.address}
            onChange={handleChange}
          />
        </Grid>
        <div>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={classes.smMargin}
          >
            Submit
          </Button>
          <Button
            variant='contained'
            className={classes.smMargin}
            onClick={resetForm}
          >
            Reset
          </Button>
        </div>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(DCandidateForm);
