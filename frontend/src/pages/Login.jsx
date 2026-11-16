import { Link } from "react-router";
import AuthForm, { Field } from "./AuthForm";
import { useSessionStore } from "../stores/sessionStore";

export default function Login() {
  const login = useSessionStore((state) => state.login);

  return (
    <AuthForm
      title="Sign in"
      submitLabel="Sign in"
      onSubmit={({ email, password }) => login(email, password)}
      footer={
        <>
          New here? <Link to="/signup">Create an account</Link>
        </>
      }
    >
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Password" name="password" type="password" autoComplete="current-password" />
    </AuthForm>
  );
}
