import styled from "styled-components";

import Heading from "../ui/Heading.jsx";
import Logo from "../ui/Logo.jsx";
import HowToUse from "../ui/HowToUse.jsx";

import LoginForm from "../features/authentication/LoginForm.jsx";

//= Styles ==============================
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

//= Component ===========================
function Login() {
  return (
    <>
      <HowToUse />
      <LoginLayout>
        <Logo size="large" />
        <Heading as="h4">Log in into your account</Heading>
        <LoginForm />
      </LoginLayout>
    </>
  );
}

export default Login;
