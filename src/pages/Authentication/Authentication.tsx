import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";

const StyledContainer = styled.div`
  padding: 2.4rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

function Authentication() {
  const { type } = useLocation().state as { type: string };
  const [types, setTypes] = useState<string>(type);
  return (
    <StyledContainer>
      <Header type={types} />
      {types === "register" && (
        <>
          <Input title="이메일" type="email" />
          <Input title="비밀번호" type="password" />
          <Input title="닉네임" type="text" />
          <Input title="이름" type="text" />
        </>
      )}
      {types === "login" && <Input title="이메일" type="email" />}
      {types === "password" && <Input title="비밀번호" type="password" />}
      <Button type={types} setType={setTypes} />
    </StyledContainer>
  );
}

export default Authentication;
