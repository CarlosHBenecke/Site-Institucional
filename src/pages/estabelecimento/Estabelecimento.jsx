import "./Estabelecimento.module.css";
import "../../global.css";


function Estabelecimento() {

    const logoUri = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNPmPtfVWMOWLdOc4lOKWahW2ZMwKi4gpGcQi6iVhGdw&s"
    return (
        <div className="container">
            <div className="banner">
                
            </div>
            <div className="apresentacao">
                <img src={logoUri} className="logo-estabelecimento" alt="Logo Estabelecimento" />
                <div className="conteudo">
                    <h2 className="nome-estabelecimento">BEER4U</h2>
                    <div className="redes">
                        {/* <Link to="#" >
                            <img src="../../assets/Facebook.svg" alt="Facebook do estabelecimento" />
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Estabelecimento;