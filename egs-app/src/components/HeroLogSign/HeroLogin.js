import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button"
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo.js";

const HeroLogin = (props) => {
  const { addtrip } = useAuth();
  const navigate = useNavigate();

  const [matricula, setMatricula] = useState("");
  const [nomeMotorista, setMotorista] = useState("");
  const [carModel, setModel] = useState("");
  const [localRecolha, setRecolha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!matricula | !nomeMotorista |!localRecolha |!carModel) {
      setError("Preencha todos os campos");
      return;
    }

    const res = addtrip(matricula, nomeMotorista, localRecolha, carModel, setError);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (props.trigger) ? (
    <>
    <Logo />
    <Link className="logo flex-row" to={"/"}>
            <Logo icon="icon-park-solid:love-and-help" color="black" width="24" height="24" />
    </Link>
    <C.Container>
      <C.Label>Indique os dados da tua viagem</C.Label>
      <C.Content>
        <Input
          type="nomeMotorista"
          placeholder="Digite o seu nome"
          value={nomeMotorista}
          onChange={(e) => [setMotorista(e.target.value), setError("")]}
        />
        <Input
          type="matricula"
          placeholder="Digite a matrícula do veículo"
          value={matricula}
          onChange={(e) => [setMatricula(e.target.value), setError("")]}
        />
        <Input
          type="carModel"
          placeholder="Digite o modelo do veículo"
          value={matricula}
          onChange={(e) => [setModel(e.target.value), setError("")]}
        />
        <Input
          type="localRecolha"
          placeholder="Digite o local de Recolha"
          value={matricula}
          onChange={(e) => [setRecolha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Adicionar" onClick={() => props.setTrigger(false)}/>
        {props.children}
      </C.Content>
    </C.Container>
    </>
  ): "";
  
};

export default HeroLogin;