import NavBar from "../../components/navbar/NavBar";
import styles from "./UsuarioFinal.module.css";
import cervejinha from "../../assets/breja-removebg-preview.png";
import logo from "../../assets/logoBranca.svg";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import { toast } from "react-toastify";
import api from "../../api";
import apiBlob from "../../api-blob";
import { summarizeDescription } from "../../utils";

function Usuario() {
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [resultados, setResultados] = useState([]);

    const buscarDados = useCallback(() => {
        api.get("/relationship/establishments/top-3")
            .then((response) => {
                const establishments = response.data;
    
                const completeRequests = establishments.map(establishment => {
                    const id = establishment[0];
    
                    // Fetch profile image
                    const imageRequest = apiBlob.get(`/establishments/${id}`)
                        .then((response) => {
                            const { data } = response;
                            const profileImage = data.find(image => image.establishmentCategory === 'PROFILE');
                            return {
                                ...establishment,
                                imageUrl: profileImage ? profileImage.imgUrl : 'defaultLogoImage.jpg'
                            };
                        })
                        .catch(() => ({
                            ...establishment,
                            imageUrl: 'defaultLogoImage.jpg'
                        }));
    
                    // Fetch description and fantasy name
                    const infoRequest = api.get(`/establishments/${id}`)
                        .then((response) => {
                            const { information, fantasyName } = response.data;
                            return {
                                id,
                                description: information.description || '',
                                fantasyName: fantasyName || '',
                            };
                        })
                        .catch(() => ({
                            id,
                            description: '',
                            fantasyName: '',
                        }));
    
                    // Combine results
                    return Promise.all([imageRequest, infoRequest])
                        .then(([imageData, infoData]) => ({
                            ...imageData,
                            description: infoData.description,
                            fantasyName: infoData.fantasyName,
                        }));
                });
    
                Promise.all(completeRequests)
                    .then(completeResults => {
                        setResultados(completeResults);
                    })
                    .catch(() => {
                        toast.error("Ocorreu um erro ao carregar algumas informações, mas os dados foram carregados.");
                    });
            })
            .catch(() => {
                toast.error("Ocorreu um erro ao carregar os dados, por favor, tente novamente.");
            });
    }, []);
    
    useEffect(() => {
        buscarDados();
    }, [buscarDados]);

    const openModal = (text) => {
        setModalText(text);
        setModalIsOpen(true);
    };
  
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        navigate('/home-estabelecimento');

        setTimeout(() => {
            var secao = document.getElementById(sectionId);
            if (secao) {
                secao.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const scrollBack = (sectionId) => {
        navigate('/');

        setTimeout(() => {
            var secao = document.getElementById(sectionId);
            if (secao) {
                secao.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const scrollListagem = (sectionId) => {
        navigate('/listagem');
        setTimeout(() => {
            var secao = document.getElementById(sectionId);
            if (secao) {
                secao.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };
  
    const goToTela2 = () => {
      scrollListagem('/listagem');
    };

    const Bares = () => {
        const sendTo = (establishmentId) => {
            navigate(`/estabelecimento-usuario/${establishmentId}`);
        }
        return (
            <>
                {resultados.map((bar, index) => (
                    <div className={styles["bares-box"]} key={index}>
                        <div style={{
                                backgroundImage: `url(${bar.imageUrl})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "100%",
                                height: "100%",
                                borderRadius: "30px 30px 0px 0px"
                        }}></div>
                        <div className={styles["bares-info"]}>
                            <h3>{bar.fantasyName}</h3>
                            <span>{summarizeDescription(bar.description, 50)}</span>
                            <button onClick={() => sendTo(bar[0])} className={styles["botao-vermais"]} type="button">VER MAIS</button>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            <Modal isOpen={modalIsOpen} onClose={closeModal} modalText={modalText}/>
            <NavBar logoInicio={logo}/>
            <div className={styles["container-fullpage"]}>
                <section className={styles["sessao"]} id="inicio">
                    <div className={styles["container"]}>
                        <div className={styles["pesquisa"]}>
                            <div className={styles["container-inicial"]}>
                                <div className={styles["pesquisa-titulo"]}>QUAL A BOA </div>
                                <div className={styles["pesquisa-interrogacao"]}>?</div>
                                <span className={styles["subtitulo"]}>ENCONTRE QUAL É A SUA BOA</span>
                            </div>
                            <img src={cervejinha} alt="Cervejinha" className={styles["cervejinha"]} />
                        </div>
                        <div className={styles["container-input"]}>
                            <button type="button" onClick={goToTela2} className={styles["botao-principal"]}>PESQUISAR</button>
                        </div>
                    </div>
                </section>
               <section className={styles["sessao"]} id="cidades"> 
                </section>
                <section className={styles["sessao"]} id="bares">
                    <div className={styles["bares"]}>
                        <div className={styles["linha"]}></div>
                        <h1>BARES MAIS BEM AVALIADOS</h1>
                        <div className={styles["bares-containers"]}>
                            <Bares />
                        </div>
                    </div>
                </section>
                <section className={styles["sessao"]} id="sugestoes">
                    <div className={styles["cidades-procuradas"]}>
                        <div className={styles["linha"]}></div>
                        <h1>SUGESTÕES DO MÊS</h1>
                        <div className={styles["sugestoes-containers"]}>
                            <div className={styles["sugestoes-box"]}>
                                <div className={styles["sugestoes-img-entradas"]}></div>
                                <div className={styles["sugestoes-info"]}>
                                    <div className={styles["sugestoes-info-txt"]}>
                                        <h3>ENTRADINHAS</h3>
                                        <span>Comece a noite com aperitivos incríveis.</span>
                                    </div>
                                    <div className={styles["sugestoes-info-btn"]}>
                                        <button onClick={() => openModal('As entradinhas, também conhecidas como petiscos ou aperitivos, são pequenas porções de alimentos servidas antes do prato principal em muitos restaurantes e bares')} className={styles["botao-visitar"]} type="cadastrar">VER MAIS</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["sugestoes-box"]}>
                                <div className={styles["sugestoes-img-bolinhos"]}></div>
                                <div className={styles["sugestoes-info"]}>
                                    <div className={styles["sugestoes-info-txt"]}>
                                        <h3>BOLINHO DE FEIJOADA</h3>
                                        <span>Bolinhos caseiros fetos com a feijoada mais famosa de SP.</span>
                                    </div>
                                    <div className={styles["sugestoes-info-btn"]}>
                                        <button onClick={() => openModal('O bolinho de feijoada é uma versão empanada e frita do clássico prato brasileiro, feijoada')} className={styles["botao-visitar"]} type="cadastrar">VER MAIS</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["sugestoes-box"]}>
                                <div className={styles["sugestoes-img-drinks"]}></div>
                                <div className={styles["sugestoes-info"]}>
                                    <div className={styles["sugestoes-info-txt"]}>
                                        <h3>DRINKS SAZONAIS</h3>
                                        <span>Drinks feitos com as melhores frutas da estação.</span>
                                    </div>
                                    <div className={styles["sugestoes-info-btn"]}>
                                        <button onClick={() => openModal('Os drinks sazonais são coquetéis criados com ingredientes frescos e sazonais, que refletem as características e sabores das estações do ano')} className={styles["botao-visitar"]} type="cadastrar">VER MAIS</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["sugestoes-box"]}>
                                <div className={styles["sugestoes-img-cerveja"]}></div>
                                <div className={styles["sugestoes-info"]}>
                                    <div className={styles["sugestoes-info-txt"]}>
                                        <h3>4 TONS DE CERVEJA</h3>
                                        <span>Degustação de todas as cervejas da casa.</span>
                                    </div>
                                    <div className={styles["sugestoes-info-btn"]}>
                                        <button onClick={() => openModal('4 tons de cerveja refere-se a uma degustação que oferece uma variedade de cervejas diferentes, representando uma gama de estilos e sabores')} className={styles["botao-visitar"]} type="cadastrar">VER MAIS</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles["sessao"]} id="boa">
                    <div className={styles["cidades-procuradas"]}>
                        <div className={styles["linha"]}></div>
                        <h1>QUAL A SUA BOA?</h1>
                        <div className={styles["boa-containers"]}>
                            <div className={styles["boa-bloco"]}>
                                <div className={styles["boa-foto1"]}>
                                </div>
                                <div className={styles["boa-box"]}>
                                    <div className={styles["boa-txt1"]}>
                                        <h3>DONO DO ESTABELECIMENTO</h3>
                                        <h6>$$ GRATUITO</h6>

                                        <span>
                                            Com o você pode cadastrar seu estabelecimento,
                                             ser avaliado, impulsionar seu negócio e deixa-lo com a sua cara!
                                        </span>
                                        <button className={styles["botao-visitar"]} type="cadastrar" to="outra-pagina" smooth={true} onClick={() => scrollToSection('inicio')}>SAIBA MAIS</button>
                                    </div>

                                </div>
                            </div>
                            <div className={styles["boa-bloco"]}>
                                <div className={styles["boa-box"]}> 
                                    <div className={styles["boa-txt2"]}>
                                        <h3>ROLEZEIRO ATUALIZADO</h3>
                                        <h6>$$ GRATUITO</h6>

                                        <span>
                                            E você que busca um rolê inesquecível pode procurar o melhor lugar através
                                            do nosso app, basta filtrar de acordo com a sua preferência
                                        </span>
                                        <button className={styles["botao-visitar"]} type="cadastrar" to="outra-pagina" smooth={true} onClick={() => scrollBack('inicio')}>SAIBA MAIS</button>
                                    </div>
                                </div>
                                <div className={styles["boa-foto2"]}>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    );
}

export default Usuario;