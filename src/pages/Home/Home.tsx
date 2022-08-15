import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHome = styled.div`
  display: flex;
  padding: 2.4rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-around;
`;

const StyledButton = styled(Link)`
  height: 8rem;
  background-color: rgb(14, 182, 254);
  width: 8rem;
  display: block;
  color: white;
  font-size: 3rem;
  text-decoration: none;
  text-align: center;
  line-height: 7.5rem;
  border-radius: 2rem;
`;

function Home() {
  return (
    <StyledHome>
      <StyledButton to="Home">POST</StyledButton>
      <StyledButton to="/AR">AR</StyledButton>
    </StyledHome>
  );
}

export default Home;
