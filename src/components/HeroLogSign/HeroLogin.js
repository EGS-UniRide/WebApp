import React, { useState, createContext } from "react";
import Input from "../Input";
import Button from "../Button"
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo.js";
import HeroSign from "../HeroSignUp/HeroSign";

export const AuthContext = createContext({});

const HeroLogin = () => {
  // const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState();
  
  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  const signin = (email, password) => {
    let usersStorage = localStorage.getItem("users_bd") ? JSON.parse(localStorage.getItem("users_bd")) : [];

    const hasUser = usersStorage != null ? usersStorage.filter((user) => user.email === email) : null;

    if (hasUser != null ? hasUser.length : false) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return "olá" % email;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  return (
    <>
      <Logo />
      <Link className="logo flex-row" to={"/"}>
        <Logo icon="icon-park-solid:love-and-help" color="black" width="24" height="24" />
      </Link>
      <C.Container>
        <C.Label>LOGIN</C.Label>
        <C.Content>
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Entrar" onClick={handleLogin} />
          <C.LabelSignup>
            Não tem uma conta?
            <C.Strong>
              <Link to="/SignUp">&nbsp;Registre-se</Link>
            </C.Strong>
          </C.LabelSignup>
        </C.Content>
      </C.Container>
    </>
  );

};

export default HeroLogin;