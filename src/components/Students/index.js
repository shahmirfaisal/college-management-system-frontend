import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../../store/slices/student";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";

export const Students = ({ value, index }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.student.studentsLoading);
  const isLogin = useSelector((state) => state.admin.isLogin);
  const students = useSelector((state) => state.student.students);
  const { push } = useHistory();
  const columns = [
    {
      field: "rollNumber",
      headerName: "Roll No",
      type: "number",
      width: 150,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "fatherName",
      headerName: "Father Name",
      width: 150,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 100,
    },
    {
      field: "cnic",
      headerName: "CNIC",
      width: 130,
      sortable: false,
    },
    {
      field: "class",
      headerName: "Class",
      width: 130,
    },
    {
      field: "address",
      headerName: "Address",
      width: 130,
      sortable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
      sortable: false,
    },
  ];

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <section hidden={value !== index}>
      {isLogin && (
        <>
          <Button
            onClick={() => push("/create-student")}
            color="secondary"
            variant="outlined"
          >
            Create a new Student
          </Button>
          <Box marginTop={4}></Box>
        </>
      )}
      <DataGrid
        onRowClick={(params) => {
          push(`/student/${params.id}`);
        }}
        autoHeight
        loading={loading}
        columns={columns}
        rows={students.map((student) => {
          return {
            ...student,
            id: student._id,
            age:
              new Date().getFullYear() -
              new Date(student.dateOfBirth).getFullYear(),
            class: student.class.name,
          };
        })}
        pageSize={6}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </section>
  );
};
