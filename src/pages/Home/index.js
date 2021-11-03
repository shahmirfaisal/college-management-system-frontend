import { useState } from "react";
import { Tabs, Tab, Paper, Container, Box } from "@material-ui/core";
import { Students } from "../../components/Students/";
import { Teachers } from "../../components/Teachers/";
import { Classes } from "../../components/Classes/";

export const Home = () => {
  const [value, setValue] = useState(0);
  const tabChangeHandler = (event, newValue) => setValue(newValue);

  return (
    <Container>
      <Paper>
        <Tabs variant="fullWidth" value={value} onChange={tabChangeHandler}>
          <Tab label="Students" />
          <Tab label="Teachers" />
          <Tab label="Classes" />
        </Tabs>
      </Paper>

      <Box marginBottom={4}></Box>

      <Students value={value} index={0} />
      <Teachers value={value} index={1} />
      <Classes value={value} index={2} />
    </Container>
  );
};
