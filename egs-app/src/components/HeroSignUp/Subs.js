import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import "./Subs.css";
import Modal from "./Modal.js";
import Logo from "../Logo.js";

const Signup = () => {

    
    return (
        <>
        <Logo />
        <Link className="logo flex-row" to={"/"}>
            <Logo icon="icon-park-solid:love-and-help" color="black" width="24" height="24" />
        </Link>
        <div className="wrapper">
        <div className="price">
            <div className="container">
                <div className="section-header">
                    <h2>Subscrição PETLINK</h2>
                    <p>Aderindo à nossa subscrição terá acesso à nossa loja de produtos e consultas online e ao domicílio para os seus amiguinhos a qualquer hora</p>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="price-item">
                            <div className="price-header">
                                <div className="price-icon">
                                </div>
                                <div className="price-title">
                                    <h2>Mensal</h2>
                                </div>
                                <div className="price-pricing">
                                    <h2><small></small>15€</h2>
                                </div>
                            </div>
                            <div className="price-body">
                                <div className="price-des">
                                    <ul>
                                        <li>Acesso à Loja</li>
                                        <li>1 Ração mensal grátis</li>
                                        <li>Cupões de desconto na Loja</li>
                                        <li>Consultas Online 24h/dia</li>
                                        <li>1 Consulta ao domicílio por mês</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="price-footer">
                                <Modal/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="price-item">
                            <div className="price-header">
                                <div className="price-title">
                                    <h2>Anual</h2>
                                </div>
                                <div className="price-pricing">
                                    <h2><small></small>150€</h2>
                                </div>
                            </div>
                            <div className="price-body">
                                <div className="price-des">
                                    <ul>
                                        <li>2 Meses de graça!</li>
                                        <li>Acesso à Loja</li>
                                        <li>1 Ração mensal grátis</li>
                                        <li>Cupões de desconto na Loja</li>
                                        <li>Consultas Online 24h/dia</li>
                                        <li>1 Consulta ao domicílio por mês</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="price-footer">
                                <Modal/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    );
  };
  
  export default Signup;