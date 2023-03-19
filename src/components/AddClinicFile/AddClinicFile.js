
 import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo.js";

const AddClinicFile = () => {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [sexo, setSexo] = useState("");
  const [nrFT, setNrFT] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForm = () => {
    if (!nome | !especie | !sexo | !nrFT) {
      setError("Preencha todos os campos");
      return;
    }

    const addClinicFile = (nome, especie,sexo,nrFT) => {
        const cfStorage = JSON.parse(localStorage.getItem("cf_bd"));
    
        const hasCF = cfStorage !=null ? cfStorage.filter((cf) => cf.nrFT === nrFT) : null;
        if (hasCF != null ? hasCF.length : false) {
          return "Já exite uma ficha clínica com esse número";
        }

        if (cfStorage != null ? cfStorage.length:false) {
            if (cfStorage.length > 1) {
                return "Só pode ter duas fichas clínicas associadas à sua conta";
            }
        }
    
        let newCF;
    
        if (cfStorage) {
            newCF = [...cfStorage, { nome, especie,sexo,nrFT }];
        } else {
            newCF = [{ nome, especie,sexo,nrFT }];
        }
    
        localStorage.setItem("cf_bd", JSON.stringify(newCF));
    
        return;
      };

    const res = addClinicFile(nome, especie,sexo,nrFT);

    if (res) {
      setError(res);
      return;
    }

    alert("Ficha clínica adicionada com sucesso!");
    navigate("/userProfile");
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
        <C.Label>Adicionar Ficha Médica</C.Label>
        <C.Content>
          <Input
            type="string"
            placeholder="Digite o nome do animal"
            value={nome}
            onChange={(e) => [setNome(e.target.value), setError("")]}
          />
          <Input
            type="string"
            placeholder="Digite a espécie do animal"
            value={especie}
            onChange={(e) => [setEspecie(e.target.value), setError("")]}
          />
          <Input
            type="string"
            placeholder="Digite o sexo do animal"
            value={sexo}
            onChange={(e) => [setSexo(e.target.value), setError("")]}
          />
          <Input
            type="string"
            placeholder="Digite o número de ficha técnica"
            value={nrFT}
            onChange={(e) => [setNrFT(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Adicionar" onClick={handleForm} />
            <C.Strong>
              <Link to="/userProfile">&nbsp;Cancelar</Link>
            </C.Strong>
        </C.Content>
      </C.Container>
    </>
  );
};

export default AddClinicFile;
