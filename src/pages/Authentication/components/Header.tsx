interface HeaderPropsType {
  type: string;
}

function Header(props: HeaderPropsType) {
  const { type } = props;
  let title = "";
  if (type === "register") title = "이메일로 가입하기";
  else if (type === "login") title = "이메일로 시작하기";
  else title = "비밀번호를 입력해주세요.";

  return <h1>{title}</h1>;
}

export default Header;
