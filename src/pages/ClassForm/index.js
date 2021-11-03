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
import { FETCH_TEACHERS, FETCH_CLASS } from "../../api/endpoints";
import { withAuth } from "../../hoc/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { createClass, updateClass } from "../../store/slices/class";
import { useParams } from "react-router-dom";

export const ClassForm = withAuth((props) => {
  const classNames = useStyles();
  const [name, setName] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const createClassLoading = useSelector(
    (state) => state.class.createClassLoading
  );
  const updateClassLoading = useSelector((state) => {
    console.log(state);
    return state.class.updateClassLoading;
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const [classLoading, setClassLoading] = useState(false);

  const nameChangeHandler = (e) => setName(e.target.value);
  const teacherChangeHandler = (e) => setTeacher(e.target.value);

  const createClassHandler = (e) => {
    const data = {
      name,
      teacher,
    };
    dispatch(createClass(data));
  };

  const updateClassHandler = (e) => {
    const Class = {
      name,
      teacher,
    };
    dispatch(updateClass({ id, class: Class }));
    console.log(updateClassLoading);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (props.update) updateClassHandler();
    else createClassHandler();
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(FETCH_TEACHERS());
      setTeachers(res.data.teachers);
    })();
  }, []);

  useEffect(() => {
    if (props.update) {
      (async () => {
        setClassLoading(true);
        const { data } = await axios.get(FETCH_CLASS(id));
        setClassLoading(false);
        console.log(data);
        setName(data.class.name);
        setTeacher(data.class.teacher?._id);
      })();
    }
  }, []);

  if (classLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography align="center" variant="h2">
        {props.update ? "Update" : "Create"} Class
      </Typography>
      <Paper
        component="form"
        className={classNames.form}
        onSubmit={formSubmitHandler}
      >
        <TextField label="Name" value={name} onChange={nameChangeHandler} />
        <TextField
          select
          label="Teacher"
          value={teacher}
          onChange={teacherChangeHandler}
        >
          <MenuItem value={null}>No Teacher</MenuItem>
          {teachers.map((teacher) => (
            <MenuItem key={teacher._id} value={teacher._id}>
              {teacher.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={updateClassLoading || createClassLoading}
        >
          {props.update ? "Update" : "Create"}
          {(updateClassLoading || createClassLoading) && (
            <CircularProgress size={20} />
          )}
        </Button>
      </Paper>
    </Container>
  );
})(true);
