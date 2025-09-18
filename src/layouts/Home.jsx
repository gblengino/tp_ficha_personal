import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () =>{

    const navigate = useNavigate()

    const goForm = ()=>{
        navigate('/form')
    }

    const goFichas = ()=>{
        navigate('/personas')
    }

    return (
        <div>
            <Helmet>
                <title>Inicio</title>
            </Helmet>
            <h2>Home Page</h2>
            <div>
                <button onClick={goFichas}>Ver Fichas</button>
                <button onClick={goForm}>Nueva Ficha</button>
            </div>
        </div>
    )
}

export default Home;