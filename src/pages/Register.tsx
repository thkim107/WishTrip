import axios from "axios";
import { useState } from "react";

function Register() {
  const [username, setUserName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "username":
        setUserName(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://pwnhyo.kr:9999/register", {
        username,
        name,
        email,
        password,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        throw err;
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="button">
        <button type="submit">Register</button>
      </div>
    </form>
  );
}

export default Register;
