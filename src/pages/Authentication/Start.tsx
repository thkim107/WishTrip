import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledStart = styled.div`
  padding: 8rem 2.4rem;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 3.2rem;
  }

  button {
    width: 100%;
    height: 5.6rem;
    background-color: rgb(14, 182, 254);
    border-radius: 1.6rem;
    font-size: 1.6rem;
    color: white;
    font-weight: bold;
    border: none;
    margin-bottom: 1rem;
  }
`;

function Start() {
  const navigate = useNavigate();

  const handleClick = (type: string) => {
    navigate("./Authentication", { state: { type } });
  };
  return (
    <StyledStart>
      <h1>위시트립</h1>
      <button onClick={() => handleClick("register")}>이메일로 가입하기</button>
      <button onClick={() => handleClick("login")}>이메일로 시작하기</button>
    </StyledStart>
  );
}

export default Start;
