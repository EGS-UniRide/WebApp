
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo.js";

const AddUser = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForm = () => {
    if (!nome | !email | !phone | !address) {
      setError("Preencha todos os campos");
      return;
    }

    const addAccount = (nome, email,phone,address) => {
        const accountStorage = JSON.parse(localStorage.getItem("bd"));
    
        const hasEmail = accountStorage !=null ? accountStorage.filter((email) => email.email === email) : null;
        if (hasEmail != null ? hasEmail.length : false) {
          return "Já exite um utilizador com esse email";
        }
    
        let newAccount;
    
        if (accountStorage) {
          newAccount = [...accountStorage, { nome, email,phone,address }];
        } else {
          newAccount = [{ nome, email,phone,address }];
        }
    
        localStorage.setItem("bd", JSON.stringify(newAccount));
    
        return;
      };

    const res = addAccount(nome, email,phone,address);

    if (res) {
      setError(res);
      return;
    }

    alert("Utilizador adicionada com sucesso!");
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
    </>
  );
};

export default AddUser;
