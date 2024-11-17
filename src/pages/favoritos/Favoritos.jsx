import NavBar from "../../components/navbar/NavBar";
import logo from "../../assets/logoBranca.svg";
import styles from "./Favoritos.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import { decodeToken, summarizeDescription } from "../../utils";
import { useEffect, useState } from "react";
import apiBlob from "../../api-blob";

const Favoritos = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("qabToken");
    const [resultados, setResultados] = useState([]);
    if (token === null) {
        toast.warn("Faça o login para ver os favoritos.");
        navigate("/");
    }

    const payloadToken = decodeToken(token);
    const userId = payloadToken.userId;

    useEffect(() => {
        api.get(`/establishments/favorites/${userId}`)
        .then((response) => {
            const establishments = response.data;
            const imageRequests = establishments.map(establishment =>
            apiBlob.get(`/establishments/${establishment.id}`)
                .then((response) => {
                    const { data } = response;
                    const profileImage = data.find(image => image.establishmentCategory === 'PROFILE');
                    return {
                    ...establishment,
                    imageUrl: profileImage ? profileImage.imgUrl : 'defaultLogoImage.jpg'
                    };
                })
                .catch(() => {
                    return {
                    ...establishment,
                    imageUrl: 'defaultLogoImage.jpg'
                    };
                })
            );

            Promise.all(imageRequests)
            .then(completeResults => { 
                setResultados(completeResults);
            })
            .catch(() => {
                toast.error("Ocorreu um erro ao carregar algumas imagens, mas os dados foram carregados.");
            });
        })
        .catch(() => {
            toast.error("Ocorreu um erro ao carregar os dados, por favor, tente novamente.");
        });
    }, [userId]);

    const desfavoritar = (establishmentId) => {
        const data = {
            userId,
            establishmentId
        }
        api.delete(`/users/unfavorite`, { data: data })
            .then(res => {
                if(res.status === 204) {
                    toast.success("Desfavoritado com sucesso!")
                } else {
                    toast.error("Tente novamente!");
                }
            }).catch(err => {
                console.log(err);
            });
    }

    const RenderResults = () => {
        if(resultados.length === 0) {
            return <p>Nenhum favoritado :(</p>
        }
        return resultados.map((resultado, index) => (
            <div key={index} className={styles["card"]}>
                <div className={styles["informations"]}>
                    <div className={styles["informations-header"]}>
                        <img src={resultado.imageUrl} alt={`Logo ${resultado.fantasyName}`} className={styles["informations-img"]}/>
                        <p className={styles["informations-title"]}>
                            {resultado.fantasyName}
                            <div className={styles["informations-buttons"]}>
                                <Link className={styles["informations-button"]} to={`/estabelecimento-usuario/${resultado.id}`}>VISITAR</Link>
                                <button className={styles["informations-button"]} onClick={() => desfavoritar(resultado.id)}>DESFAVORITAR</button>
                            </div>
                        </p>
                        
                    </div>
                    <div className={styles["informations-description"]}>
                        <p>{summarizeDescription(resultado.information.description, 100)}</p>
                    </div>
                </div>
            </div>
        ));
    } 

    return (
        <>
            <NavBar logoInicio={logo} />
            <div className={styles["background-image"]}>
                <div className={styles["cards-container"]}>
                    <RenderResults />
                </div>
            </div>
        </>
    );
}



export default Favoritos;
