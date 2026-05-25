import React, { useContext } from "react";
import AuthContext from "../../context/auth/CreateAuthContext";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import DynamicInput from "../../components/DynamicInput";
import { logininputfield } from "../../services/json/login.input";
import { useForm } from "react-hook-form";
import type {
  Loginformvalue,
  LoginPayload,
} from "../../typescript/interface/auth.interface";
import { loginSchema } from "../../services/validation/login.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const authcontext = useContext(AuthContext);
  if (!authcontext) {
    throw new Error("Auth Context Doesn't Provided");
  }
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Loginformvalue>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      //   role: "user",
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    const response = await authcontext.loginuser(data);
    console.log("res in login page", response);
    if (response.user) {
      toast.success(response?.message);
     if(response.user.role === "admin"){
       navigate("/admin/dashboard");
      reset();
     }else{
      navigate("/")
     }
    } else {
      toast.error(response);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: 400, padding: 4 }}>
        <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          {logininputfield.map((int) => (
            <DynamicInput
              key={int.name}
              name={int.name}
              label={int.label}
              type={int.type}
              required={int.required}
              register={register}
              errors={errors}
            />
          ))}
          {authcontext.authData.isError && (
            <Typography sx={{ color: "red", mb: 2 }}>
              {authcontext.authData.isError}
            </Typography>
          )}
          <Button type="submit" variant="contained"  >
            {authcontext.authData.isLoading ? "loading..." : "Login"}
          </Button>
        </Box>
        <Typography sx={{ marginTop: "20px" }}>
          Create an Account{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/register")}
          >
            {" "}
            Signup{" "}
          </span>
        </Typography>
      </Card>
    </Container>
  );
};

export default Login;
