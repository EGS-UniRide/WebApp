import React from "react";
import "./encomendasection.css";

import dropdown from "../../assests/dropdown.png"
import icon from "../../assests/icon.png"
import "./DropDown.css"
import { useState,useEffect } from "react";
import list from "./data";
import Cards from "./card";


const EncomendaAction = ({handleClick}) => {
  const[isActive,setIsActive]=useState(false)
  const[isActive2,setIsActive2]=useState(false)
  const[data,setData]=useState(list)

  const filterResult=(catItem)=>{
    const result=list.filter(curData => (curData.category===catItem || curData.especie===catItem) )
    console.log(result);
    setData(result)
  }


  return (
    <>
    <div className="content">
        <section>
            <a className="aa" href="/encomenda"> Loja online</a>
        </section>
       
    
        <div className="dropdowns">
            <div className="filtro">Filtros <img src={icon} height="20" width="20"className="filtroo"></img></div>
        <div className="dropdown" >
                <div className="dropdown-btn" onClick={(d) => setIsActive(!isActive)}> Categorias <img src={dropdown} height="11" width="12" /></div>
                {isActive && (
                <div className="dropdown-content">
                    <div className="dropdown-item" onClick={()=>filterResult('Acessorios')}>
                        Acessórios
                    </div>
                    <div className="dropdown-item" onClick={()=>filterResult('Comida')}>
                        Alimento
                    </div>
                    <div className="dropdown-item" onClick={()=>filterResult('Higiene')}>
                        Cuidado
                    </div>
                </div>
                )}
                
            </div>

        <div className="dropdown" style={isActive ?({margin:'150px auto',position: 'relative'}) : ({})}>
            <div className="dropdown-btn" onClick={() => setIsActive2(!isActive2)}> Espécie <img src={dropdown} height="11" width="12" /></div>
            {isActive2 && (
            <div className="dropdown-content">
                <div className="dropdown-item" onClick={()=>filterResult('Cao')}>
                    Cão
                </div>
                <div className="dropdown-item" onClick={()=>filterResult('Gato')}>
                    Gato
                </div>
                <div className="dropdown-item" onClick={()=>filterResult('Peixes')}>
                    Repteis/Peixes 
                </div>
                <div className="dropdown-item" onClick={()=>filterResult('Voadores')}>
                    Pássaros 
                </div>
                <div className="dropdown-item" onClick={()=>filterResult('Roedores')}>
                    Roedores 
                </div>
            </div>
            )}
            
        </div>
      </div>
      <section>
            {data.map((item)=>(

                <Cards key={item.id} item={item} handleClick={handleClick}  />
            ))}
     </section>

    </div>
    </>

  );
}

export default EncomendaAction;