import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses } from "../../store/slices/class";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";

export const Classes = ({ value, index }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.class.classesLoading);
  const classes = useSelector((state) => state.class.classes);
  const isLogin = useSelector((state) => state.admin.isLogin);
  const { push } = useHistory();
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "teacher",
      headerName: "Teacher",
      width: 150,
    },
  ];

  useEffect(() => {
    dispatch(fetchClasses());
  }, []);

  return (
    <section hidden={value !== index}>
      {isLogin && (
        <>
          <Button
            onClick={() => push("/create-class")}
            color="secondary"
            variant="outlined"
          >
            Create a new Class
          </Button>
          <Box marginTop={4}></Box>
        </>
      )}
      <DataGrid
        onRowClick={(params) => {
          push(`/class/${params.id}`);
        }}
        autoHeight
        loading={loading}
        columns={columns}
        rows={classes.map((newClass) => {
          return {
            ...newClass,
            id: newClass._id,
            teacher: newClass?.teacher?.name,
          };
        })}
        pageSize={6}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </section>
  );
};
