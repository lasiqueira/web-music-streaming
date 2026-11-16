import { Link } from "react-router";
import AuthForm, { Field } from "./AuthForm";
import { useSessionStore } from "../stores/sessionStore";

export default function Signup() {
  const signup = useSessionStore((state) => state.signup);

  return (
    <AuthForm
      title="Sign up"
      submitLabel="Create account"
      onSubmit={({ email, username, password, passwordConfirmation }) =>
        signup(email, username, password, passwordConfirmation)
      }
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Username" name="username" autoComplete="username" />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        hint="At least 8 characters."
      />
      <Field label="Password confirmation" name="passwordConfirmation" type="password" autoComplete="new-password" />
    </AuthForm>
  );
}
