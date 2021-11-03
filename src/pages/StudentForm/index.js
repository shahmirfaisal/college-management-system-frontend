import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Paper,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useStyles } from "./style";
import axios from "axios";
import { FETCH_CLASSES, FETCH_STUDENT } from "../../api/endpoints";
import { withAuth } from "../../hoc/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { createStudent, updateStudent } from "../../store/slices/student";
import { useParams } from "react-router-dom";

export const StudentForm = withAuth((props) => {
  const classNames = useStyles();
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [image, setImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cnic, setCnic] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [classes, setClasses] = useState([]);
  const [Class, setClass] = useState("");
  const createStudentLoading = useSelector(
    (state) => state.student.createStudentLoading
  );
  const updateStudentLoading = useSelector(
    (state) => state.student.updateStudentLoading
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const [stdLoading, setStdLoading] = useState(false);

  const nameChangeHandler = (e) => setName(e.target.value);
  const fatherNameChangeHandler = (e) => setFatherName(e.target.value);
  const imageChangeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImage(e.target.result);
      console.log(e.target.result);
    };
  };
  const dateOfBirthChangeHandler = (e) => setDateOfBirth(e.target.value);
  const cnicChangeHandler = (e) => {
    setCnic(e.target.value);
  };
  const admissionDateChangeHandler = (e) => setAdmissionDate(e.target.value);
  const addressChangeHandler = (e) => setAddress(e.target.value);
  const phoneChangeHandler = (e) => setPhone(e.target.value);
  const genderChangeHandler = (e) => setGender(e.target.value);
  const classChangeHandler = (e) => {
    console.log(e.target.value);
    setClass(e.target.value);
  };

  const createStudentHandler = (e) => {
    const data = {
      name,
      fatherName,
      image,
      dateOfBirth,
      cnic,
      admissionDate,
      class: Class,
      gender,
      phone,
      address,
    };
    dispatch(createStudent(data));
  };

  const updateStudentHandler = (e) => {
    const student = {
      name,
      fatherName,
      image,
      dateOfBirth,
      cnic,
      admissionDate,
      class: Class,
      gender,
      phone,
      address,
    };
    dispatch(updateStudent({ id, student }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (props.update) updateStudentHandler();
    else createStudentHandler();
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(FETCH_CLASSES());
      setClasses(res.data.classes);
    })();
  }, []);

  useEffect(() => {
    if (props.update) {
      (async () => {
        setStdLoading(true);
        const {
          data: { student },
        } = await axios.get(FETCH_STUDENT(id));
        setStdLoading(false);
        setName(student.name);
        setFatherName(student.fatherName);
        setImage(student.image);
        setDateOfBirth(student.dateOfBirth);
        setCnic(student.cnic);
        setAdmissionDate(student.admissionDate);
        setAddress(student.address);
        setPhone(student.phone);
        setGender(student.gender);
        setClass(student.class._id);
      })();
    }
  }, []);

  if (stdLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography align="center" variant="h2">
        {props.update ? "Update" : "Create"} Student
      </Typography>
      <Paper
        component="form"
        className={classNames.form}
        onSubmit={formSubmitHandler}
      >
        <TextField label="Name" value={name} onChange={nameChangeHandler} />
        <TextField
          label="Father Name"
          value={fatherName}
          onChange={fatherNameChangeHandler}
        />
        <input
          hidden
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={imageChangeHandler}
        />
        <Button
          htmlFor="fileInput"
          component="label"
          variant="contained"
          color="secondary"
        >
          Upload Image
        </Button>
        <div className={classNames.imgContainer}>
          <img src={image} />
        </div>
        <TextField
          type="date"
          label="Date of Birth"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={dateOfBirth}
          onChange={dateOfBirthChangeHandler}
        />
        <TextField
          label="CNIC"
          placeholder="xxxxx-xxxxxxx-x"
          value={cnic}
          onChange={cnicChangeHandler}
          inputProps={{ maxLength: "13" }}
        />
        <TextField
          type="date"
          label="Admission Date"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={admissionDate}
          onChange={admissionDateChangeHandler}
        />
        <TextField
          multiline
          label="Address"
          rows={4}
          value={address}
          onChange={addressChangeHandler}
        />
        <TextField
          label="Phone Number"
          placeholder="xxxx-xxxxxxx"
          value={phone}
          onChange={phoneChangeHandler}
          inputProps={{ maxLength: "11" }}
        />
        <TextField
          select
          label="Gender"
          value={gender}
          onChange={genderChangeHandler}
        >
          <MenuItem value="MALE">Male</MenuItem>
          <MenuItem value="FEMALE">Female</MenuItem>
        </TextField>
        <TextField
          select
          label="Class"
          value={Class}
          onChange={classChangeHandler}
        >
          {classes.map((Class) => (
            <MenuItem key={Class._id} value={Class._id}>
              {Class.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={updateStudentLoading || createStudentLoading}
        >
          {props.update ? "Update" : "Create"}
          {(updateStudentLoading || createStudentLoading) && (
            <CircularProgress size={20} />
          )}
        </Button>
      </Paper>
    </Container>
  );
})(true);
