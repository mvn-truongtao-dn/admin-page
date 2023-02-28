import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { getSession, signIn } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

type Props = {};

export default function Login({}: Props) {
  const email = useRef<any>("");
  const password = useRef<any>("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      {/* <Grid container spacing={4}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}> */}
      <Stack
        component="form"
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          id="email"
          label="email"
          onChange={(e) => (email.current = e.target.value)}
        />
        <TextField
          fullWidth
          id="password fullwidth"
          label="password"
          //   type="password"
          onChange={(e) => (password.current = e.target.value)}
        />
      </Stack>
      <Button
        variant="contained"
        onClick={() =>
          signIn("credentials", {
            email: email.current,
            password: password.current,
          })
        }
      >
        Login
      </Button>
      {/* </Grid>
      </Grid> */}
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }
  return {
    props: {},
  };
}
