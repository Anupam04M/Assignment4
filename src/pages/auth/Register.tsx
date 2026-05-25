import { Box, Button, Card, Container, Typography } from "@mui/material";
// import React from 'react'
import DynamicInput from "../../components/DynamicInput";
import { useNavigate } from "react-router-dom";
import { signupinputfield } from "../../services/json/register.input";
import { useForm } from "react-hook-form";
import type {
  RegisterPayload,
  signupformvalue,
} from "../../typescript/interface/auth.interface";
import { signupSchema } from "../../services/validation/register.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import AuthContext from "../../context/auth/CreateAuthContext";
import { toast } from "sonner";

const Register = () => {
  const authcontext = useContext(AuthContext);
  if (!authcontext) {
    throw new Error("Auth context not provided!!");
  }

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signupformvalue>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      //   role: "user",
    },
  });

  const onSubmit = async (data: RegisterPayload) => {
      const response = await authcontext.registeruser(data);
      if(response.user){
        toast.success(response?.message)
        navigate("/login");
        reset();

      }
      else{
        toast.error(response);
      }
      // console.log("res in register page", response);
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
          Signup
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          {signupinputfield.map((int) => (
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
            <Typography sx={{ color: "red", mb: 2 }}>{authcontext.authData.isError}</Typography>
          )}
          <Button type="submit" variant="contained">
            {authcontext.authData.isLoading ? "Loading..." : "Signup"}
          </Button>
        </Box>
        <Typography sx={{ mt: 2 }}>
          Already have an Account ?{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/login")}
          >
            {" "}
            Login{" "}
          </span>
        </Typography>
      </Card>
    </Container>
  );
};

export default Register;
