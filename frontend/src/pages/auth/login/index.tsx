import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useLoginMutation } from "../../../gql";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const { data, errors } = await login({
      variables: {
        email,
      },
    });
    setLoading(false);

    if (errors) {
      setErrors(errors[0].message);
      return;
    }

    if (data?.login) {
      navigate("/");
      return;
    }

    // handle generic error
    setErrors("Something went wrong. Please try again.");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" textAlign="center" sx={{ mb: 4 }}>
              Login
            </Typography>

            <TextField
              label="email"
              sx={{ mb: 4 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors}
              helperText={errors}
            />

            <LoadingButton
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLogin}
              loading={loading}
            >
              <span>Login</span>
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
