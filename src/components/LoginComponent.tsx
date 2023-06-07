import { SyntheticEvent, useState } from "react";
import { AuthService } from "../services/AuthService";
import { Navigate } from "react-router-dom";

type LoginProps = {
  authService: AuthService;
  setUserNameCb: (userName: string) => void;
};

// Login component consists of 2 important properties:
// 1. authentication service that it will use in order to check if the credentials are all right
// 2. A callback function called 'setUserNameCb'that will send back the value of the username to the outer application so child components can send data to parent components
export default function LoginComponent({ authService, setUserNameCb }: LoginProps) {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // error message in case if something is wrong
  const [errorMessage, setErrorMessage] = useState<string>("");
  // loginSuccess in order to trigger a redirect to another part of our application in case the login is success
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (userName && password) {
      const loginResponse = await authService.login(userName, password);
      const userName2 = authService.getUserName();
      if (userName2) {
        setUserNameCb(userName2);
      }

      if (loginResponse) {
        setLoginSuccess(true);
      } else {
        setErrorMessage("Invalid Credentials");
      }
    } else {
      setErrorMessage("UserName and password required!");
    }
  };

  function renderLoginResult() {
    if (errorMessage) {
      return <label>{errorMessage}</label>;
    }
  }

  return (
    <div role="main">
      {loginSuccess && <Navigate to="/profile" replace={true} />}
      <h2>Please login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Username</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
      <br />
      {renderLoginResult()}
    </div>
  );
}