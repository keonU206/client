import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Customer from "./components/Customer";

const theme = createTheme();

const StyledPaper = styled(Paper)({
  width: "100%",
  marginTop: theme.spacing(3),
  overflowX: "auto",
});

const StyledTable = styled(Table)({
  minWidth: 1080,
});

const StyledProgress = styled(CircularProgress)({
  marginTop: theme.spacing(2),
});

function App() {
  const [customers, setCustomers] = useState([]);

  const clssApi = async () => {
    try {
      const response = await fetch("/api/customers");
      const body = await response.json();
      return body;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    clssApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StyledPaper>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>사진</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              customers.map((customer) => (
                <Customer key={customer.id} {...customer} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress variant="determinate" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledPaper>
    </ThemeProvider>
  );
}

export default App;
