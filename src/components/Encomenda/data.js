import aquario from "../../assests/aquario.png"
import coleira from "../../assests/coleira.png"
import shampo from "../../assests/shampo.png"
import jaula from "../../assests/jaula.png"
import rato from "../../assests/rato.png"
import comida from "../../assests/comida.png"

const list=[
    {
        id: 1,
        title: "Aquario",
        category:"Acessorios",
        especie:"Peixes",
        price: 25,
        img: aquario,
        amount: 1
    },
    {
        id: 2,
        title: "Coleira para gato",
        category:"Acessorios",
        especie:"Gato",
        price: 10,
        img: coleira,
        amount: 1
    },
    {
        id: 4,
        title: "Shampo de cão",
        category:"Higiene",
        especie:"Cao",
        price: 15,
        img: shampo,
        amount: 1
    },
    {
        id: 5,
        title: "Jaula para passaros",
        category:"Acessorios",
        especie:"Voadores",
        price: 30,
        img: jaula,
        amount: 1
    },
    {
        id: 6,
        title: "Comida para rato",
        category:"Comida",
        especie:"Roedores",
        price: 5,
        img: rato, 
        amount: 1
    },
    {
        id: 7,
        title: "Comida para cão",
        category:"Comida",
        especie:"Cao",
        price: 10,
        img: comida,
        amount: 1
    }
    
]
export default list;