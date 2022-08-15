import axios from "axios";
import { useState } from "react";

function Login() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "username":
        setUserName(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://pwnhyo.kr:9999/login", { username, password })
      .then((res) => console.log(res))
      .catch((err) => {
        throw err;
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={handleChange} />
      </div>
      <div className="button">
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;
