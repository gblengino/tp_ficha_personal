import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Tarjeta from "../components/Tarjeta";

const Form = ()=>{
    const navigate = useNavigate()

    const goHome = ()=>{
        navigate('/')
    }

    const goPersonas = ()=>{
        navigate('/personas')
    }

    return(
        <div>
            <Helmet>
                <title>Cargar Persona</title>
            </Helmet>
            <h2>Ficha Personal</h2>
            <Tarjeta/>
            <button onClick={goPersonas}>Ver Fichas</button>
            <button onClick={goHome}>Volver a Home</button>
        </div>
    )
}

export default Form;