import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputIcon from "@mui/icons-material/Input";
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useMyAccountsQuery } from "../../../gql";

export const Accounts: React.FC = () => {
  const { data, loading } = useMyAccountsQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ paddingX: [1, 3] }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 1 }}>
        <Link underline="hover" color="inherit" to="/" component={RouterLink}>
          Home
        </Link>
        <Typography color="text.primary">Accounts</Typography>
      </Breadcrumbs>

      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h5">Accounts</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.me?.accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <Link component={RouterLink} to={`${account.id}`}>
                      {account.name}
                      <small> ({account.id})</small>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {Intl.NumberFormat("EN-US", {
                      style: "currency",
                      currency: account.currency,
                    }).format(account.balance)}
                  </TableCell>
                  <TableCell align="right">{account.active}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup variant="contained" size="small">
                      <Button>
                        <Tooltip title="Input transactions">
                          <InputIcon />
                        </Tooltip>
                      </Button>
                      <Button color="secondary">
                        <Tooltip title="Edit">
                          <EditIcon />
                        </Tooltip>
                      </Button>
                      <Button color="error">
                        <Tooltip title="Delete">
                          <DeleteIcon />
                        </Tooltip>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              )) || "No accounts found"}
            </TableBody>
          </Table>
        </TableContainer>

        <Box marginTop={2}>
          <Button variant="contained">Create Account</Button>
        </Box>
      </Paper>
    </Box>
  );
};
