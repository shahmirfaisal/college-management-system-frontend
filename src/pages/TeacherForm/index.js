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
import { useStyles } from "../StudentForm/style";
import axios from "axios";
import { FETCH_CLASSES, FETCH_TEACHER } from "../../api/endpoints";
import { withAuth } from "../../hoc/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { createTeacher, updateTeacher } from "../../store/slices/teacher";
import { useParams } from "react-router-dom";

export const TeacherForm = withAuth((props) => {
  const classNames = useStyles();
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [image, setImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cnic, setCnic] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [classes, setClasses] = useState([]);
  const [Class, setClass] = useState("");
  const createTeacherLoading = useSelector(
    (state) => state.teacher.createTeacherLoading
  );
  const updateTeacherLoading = useSelector(
    (state) => state.teacher.updateTeacherLoading
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const [teacherLoading, setTeacherLoading] = useState(false);

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
  const joinDateChangeHandler = (e) => setJoinDate(e.target.value);
  const addressChangeHandler = (e) => setAddress(e.target.value);
  const phoneChangeHandler = (e) => setPhone(e.target.value);
  const genderChangeHandler = (e) => setGender(e.target.value);
  const classChangeHandler = (e) => {
    console.log(e.target.value);
    setClass(e.target.value);
  };

  const createTeacherHandler = (e) => {
    const data = {
      name,
      fatherName,
      image,
      dateOfBirth,
      cnic,
      joinDate,
      class: Class,
      gender,
      phone,
      address,
    };
    dispatch(createTeacher(data));
  };

  const updateTeacherHandler = (e) => {
    const teacher = {
      name,
      fatherName,
      image,
      dateOfBirth,
      cnic,
      joinDate,
      class: Class,
      gender,
      phone,
      address,
    };
    dispatch(updateTeacher({ id, teacher }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (props.update) updateTeacherHandler();
    else createTeacherHandler();
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
        setTeacherLoading(true);
        const {
          data: { teacher },
        } = await axios.get(FETCH_TEACHER(id));
        setTeacherLoading(false);
        setName(teacher.name);
        setFatherName(teacher.fatherName);
        setImage(teacher.image);
        setDateOfBirth(teacher.dateOfBirth);
        setCnic(teacher.cnic);
        setJoinDate(teacher.joinDate);
        setAddress(teacher.address);
        setPhone(teacher.phone);
        setGender(teacher.gender);
        setClass(teacher.class._id);
      })();
    }
  }, []);

  if (teacherLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography align="center" variant="h2">
        {props.update ? "Update" : "Create"} Teacher
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
          value={joinDate}
          onChange={joinDateChangeHandler}
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
          disabled={updateTeacherLoading || createTeacherLoading}
        >
          {props.update ? "Update" : "Create"}
          {(updateTeacherLoading || createTeacherLoading) && (
            <CircularProgress size={20} />
          )}
        </Button>
      </Paper>
    </Container>
  );
})(true);
