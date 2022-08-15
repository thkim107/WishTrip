import styled from "styled-components";
import { useState } from "react";

const StyledInput = styled.div`
  padding: 0.8rem 1.6rem;
  width: 100%;
  background-color: rgb(250 250 250);
  height: 5.6rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: 1rem;

  div {
    font-size: 1.2rem;
    color: rgb(189 189 189);
  }

  input {
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }
`;

interface InputPropsType {
  title: string;
  type: string;
}

function Input(props: InputPropsType) {
  const [input, setInput] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <StyledInput>
      <div>{props.title}</div>
      <input
        onChange={handleChange}
        type={props.type === "password" ? "password" : "email"}
      />
    </StyledInput>
  );
}

export default Input;
