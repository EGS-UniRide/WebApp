import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo.js";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const { signup } = useAuth();

  const handleSignup = () => {
    if (!email || !emailConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(email, senha); // Pass the correct password argument 'senha'

    if (res === true) {
      alert("Usuário cadastrado com sucesso!");
      navigate("/Subs");
    }
    else{
      // console.log("ERROR")
      // console.log(res)
      setError(res);
    }
  };

  const signup = (email, password) => {
    // console.log("INSIDE SIGN UP AFTER CLICK")
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser =
      usersStorage != null
        ? usersStorage.filter((user) => user.email === email)
        : null;

    if (hasUser != null ? hasUser.length : false) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return true; // Return the signup function itself instead of empty string
  };

  return (
    <>
      <Logo />
      <Link className="logo flex-row" to={"/"}>
        <Logo
          icon="icon-park-solid:love-and-help"
          color="black"
          width="24"
          height="24"
        />
      </Link>
      <C.Container>
        <C.Label>SIGN UP</C.Label>
        <C.Content>
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="email"
            placeholder="Confirme seu E-mail"
            value={emailConf}
            onChange={(e) => [setEmailConf(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Inscrever-se" onClick={handleSignup} />
          <C.LabelSignin>
            Já tem uma conta?
            <C.Strong>
              <Link to="/LogSign">&nbsp;Entre</Link>
            </C.Strong>
          </C.LabelSignin>
        </C.Content>
      </C.Container>
    </>
  );
};

export default Signup;
