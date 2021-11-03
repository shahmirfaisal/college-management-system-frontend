import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers } from "../../store/slices/teacher";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";

export const Teachers = ({ value, index }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.teacher.teachersLoading);
  const teachers = useSelector((state) => state.teacher.teachers);
  const isLogin = useSelector((state) => state.admin.isLogin);
  const { push } = useHistory();
  const columns = [
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
    dispatch(fetchTeachers());
  }, []);

  return (
    <section hidden={value !== index}>
      {isLogin && (
        <>
          <Button
            onClick={() => push("/create-teacher")}
            color="secondary"
            variant="outlined"
          >
            Create a new Teacher
          </Button>
          <Box marginTop={4}></Box>
        </>
      )}
      <DataGrid
        onRowClick={(params) => {
          push(`/teacher/${params.id}`);
        }}
        autoHeight
        loading={loading}
        columns={columns}
        rows={teachers.map((teacher) => {
          console.log(teacher);
          return {
            ...teacher,
            id: teacher._id,
            age:
              new Date().getFullYear() -
              new Date(teacher.dateOfBirth).getFullYear(),
            class: teacher?.class?.name,
          };
        })}
        pageSize={6}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </section>
  );
};
