import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import instance from "../../../modules/api";

const StyledButton = styled.button`
  height: 5.6rem;
  background-color: rgb(14 182 254);
  position: absolute;
  border: none;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
`;

interface ButtonPropsType {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

function Button(props: ButtonPropsType) {
  const { type, setType } = props;
  const navigate = useNavigate();

  //Mutations
  const mutation = useMutation((url: string) => {
    if (url === "login")
      return instance.post(`/login`, { username: "test", password: "test" });
    else return instance.post(`/register`, {});
  });

  const handleClick = () => {
    if (type === "login") {
      setType("password");
    } else if (type === "password") {
      mutation.mutate("login");
      navigate("../Home");
    } else {
      mutation.mutate("register");
      navigate("../Home");
    }
  };

  if (mutation.isLoading) return <div>Loading...</div>;
  return <StyledButton onClick={handleClick}>다음</StyledButton>;
}

export default Button;
