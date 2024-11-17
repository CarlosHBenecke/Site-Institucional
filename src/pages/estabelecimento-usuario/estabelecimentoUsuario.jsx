import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../global.css";
import styles from "./estabelecimentoUsuario.module.css";
import NavBar from "../../components/navbar/NavBar";
import logoQS from "../../assets/logoBranca.svg";
import Footer from "../../components/footer/Footer";
import { Helmet } from 'react-helmet';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import CardAvaliacao from '../../components/cardAvaliacao/CardAvaliacao';
import ModalImage from "react-modal-image";
import Modal from '../../components/modalAvaliacao/modalAvaliacao'; 
import api from "../../api";
import apiBlob from "../../api-blob";
import GoogleMapReact from "google-map-react";
import { toast } from 'react-toastify';
import { decodeToken } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function MapComponent({ postalCode, number }) {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  
    useEffect(() => {
      const fetchCoordinates = async () => {
        try {
          const address = `${postalCode}, ${number}`;
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                address,
                key: "AIzaSyBfK8M_o3m3AH-NrY2KVjhSSZQD5lgly-I", // Substitua pela sua chave de API do Google Maps
              },
            }
          );
          const { results } = response.data;
          if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            setCoordinates({ lat, lng });
          } else {
            console.error("Endereço não encontrado");
          }
        } catch (error) {
          console.error("Erro ao buscar coordenadas:", error);
        }
      };
  
      if (postalCode && number) {
        fetchCoordinates();
      }
    }, [postalCode, number]);
  
    const renderMarkers = (map, maps) => {
      if (coordinates.lat && coordinates.lng) {
        const marker = new maps.Marker({
          position: { lat: coordinates.lat, lng: coordinates.lng },
          map,
          title: "Localização",
          clickable: true,
        });
        marker.addListener("click", () => {
          const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
          window.open(url, "_blank");
        });
        return marker;
      }
    };
  
    return (
      <div style={{ height: "400px", width: "100%" }}>
        {coordinates.lat && coordinates.lng ? (
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBfK8M_o3m3AH-NrY2KVjhSSZQD5lgly-I" }} // Substitua pela sua chave de API do Google Maps
            defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
            defaultZoom={15}
            options={{
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true, // Adiciona o controle de tela cheia
              zoomControl: true, // Adiciona os controles de zoom
              controlSize: 30, // Ajusta o tamanho dos controles
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          ></GoogleMapReact>
        ) : (
          <p>Carregando mapa...</p>
        )}
      </div>
    );
}
function EstabelecimentoUsuario() {
    const token = sessionStorage.getItem("qabToken");
    const { id } = useParams();
    const [fantasyName, setFantasyName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [phone, setPhone] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [complement, setComplement] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [openAt, setOpenAt] = useState("");
    const [closeAt, setCloseAt] = useState("");
    const [description, setDescription] = useState("");
    // Novos estados para informações adicionais
    const [tv, setTv] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [acessibilidade, setAcessibilidade] = useState(false);
    const [estacionamento, setEstacionamento] = useState(false);
    const [imageUrlsMenu, setImageUrlsMenu] = useState([]);
    const [imageUrlsGallery, setImageUrlsGallery] = useState([]);
    const [mediaAvaliacoes, setMediaAvaliacoes] = useState(0);
    const [categorias, setCategorias] = useState([]);

    useEffect(()=>{
        
        api.get(`establishments/${id}`).then((response) => {
            const { data } = response;
            const {
                fantasyName
            } = data;
            setFantasyName(fantasyName);
            setPhone(formatPhone(data.information.phone));
            setFacebookUrl(data.information.facebookUrl);
            setInstagramUrl(data.information.instagramUrl);
            setTv(data.information.hasTv);
            setWifi(data.information.hasWifi);
            setAcessibilidade(data.information.hasAccessibility);
            setDescription(data.information.description);
            setEstacionamento(data.information.hasParking);
            setCategorias(data.categories);
            if(data.information.openAt[0] < 10) {
                setOpenAt("0" + data.information.openAt[0] + ":" + data.information.openAt[1] + "0");
            } else {
                setOpenAt(data.information.openAt[0] + ":" + data.information.openAt[1] + "0");
            }
            if(data.information.closeAt[0] < 10) {
                setCloseAt("0" + data.information.closeAt[0] + ":" + data.information.closeAt[1] + "0");
            } else {
                setCloseAt(data.information.closeAt[0] + ":" + data.information.closeAt[1] + "0");
            }    
        }) 
        .catch((error) => {
            console.log("Erro ao buscar informações gerais do estabelecimento:", error);
        });
        api.get(`/address/establishment/${id}`).then((response) => {
            const data  = response.data[0];
            setPostalCode(data.postalCode);
            setStreet(data.street);
            setNumber(data.number);
            setNeighborhood(data.neighborhood);
            setComplement(data.complement);
            setCity(data.city);
            setState(data.state);
        }) 
        .catch((error) => {
            console.log("Erro ao buscar endereço do estabelecimento:", error);
        });
            
        apiBlob.get(`/establishments/${id}`).then((response) => {
            const { data } = response;
            const backgroundImage = data.find(image => image.establishmentCategory === 'BACKGROUND');
            const profileImage = data.find(image => image.establishmentCategory === 'PROFILE');
            const imgsMenu = [];
            const imgsGallery = [];
            data.forEach((d) => {
                if(d.establishmentCategory === "MENU") {
                    imgsMenu.push(d.imgUrl)
                } else if(d.establishmentCategory === "GALLERY") {
                    imgsGallery.push(d.imgUrl);
                }
            });
            setImageUrlsGallery(imgsGallery);
            setImageUrlsMenu(imgsMenu);
            if (backgroundImage) {
                setBackgroundImage(backgroundImage.imgUrl);
            } else {
                setBackgroundImage('defaultBackgroundImage.jpg'); // Use uma imagem padrão se não encontrar a imagem de fundo
            }

            if (profileImage) {
                setProfileImage(profileImage.imgUrl);
            } else {
                setProfileImage('defaultLogoImage.jpg'); // Use uma imagem padrão se não encontrar a imagem de logo
            }
        })
        .catch((error) => {
            console.log("Erro ao buscar as imagens do estabelecimento:", error);
            setBackgroundImage('defaultBackgroundImage.jpg'); // Use uma imagem padrão em caso de erro
            setProfileImage('defaultLogoImage.jpg'); // Use uma imagem padrão em caso de erro
        });
}, [id]);
    const formatAddress = () => {
        return `${street}, ${number}${complement ? `, ${complement}` : ''}, ${neighborhood} - ${city} - ${state}`;
    };
    const renderFacilities = () => {
        const facilities = [];
        if (estacionamento) facilities.push('Estacionamento');
        if (wifi) facilities.push('Wi-Fi');
        if (tv) facilities.push('TV');
        if (acessibilidade) facilities.push('Acessibilidade');
        return facilities.join(' - ');
    };
    const formatPhone = (phone) => {
        if (!phone) return '';
        
        const phoneString = phone.toString().replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      
        if (phoneString.length === 10) {
          return `(${phoneString.slice(0, 2)}) ${phoneString.slice(2, 6)}-${phoneString.slice(6)}`;
        } else if (phoneString.length === 11) {
          return `(${phoneString.slice(0, 2)}) ${phoneString.slice(2, 7)}-${phoneString.slice(7)}`;
        } else {
          return phone; // Retorna o número original se não tiver 10 ou 11 dígitos
        }
    };
    const favoritar = () => {
        if(!validarToken()) {
            toast.error("Para avaliar precisa autenticar-se.");
        } else {
            const payloadToken = decodeToken(token);
            const reqBody = {
                establishmentId: id,
                userId: payloadToken.userId,
                interactionType: "FAVORITE",
                message: "",
                rate: 0
            }
            let isValid = true;
            api.get("/establishments/" + id).then(async (res) => {
                const relationships = res.data.relationships;
                
                if(relationships === null) {
                    const response = await api.put("/establishments/relationship", reqBody);
                    if(response.status === 200) {
                        toast.success("Avaliado com sucesso!")
                    }
                } else {
                    relationships.forEach(rl => {
                        if(rl.interactionType === "FAVORITE" && rl.userId === reqBody.userId && rl.establishmentId === id) {
                            console.log(rl);
                            isValid = false;
                            return;
                        }
                    });
                    if(isValid) {
                        const response = await api.put("/establishments/relationship", reqBody);
                        if(response.status === 200) {
                            toast.success("Favoritado com sucesso!")
                        }
                    } else {
                        toast.warn("Você já favoritou o estabelecimento");
                    }
                }
            });
        }
    }

    const validarToken = () => {
        if(token === undefined || token === "" || token === null) {
            toast.error("Para avaliar precisa autenticar-se.");
            return false;
        }
        return true;
    }

    const Categorias = () => {
        const musics = categorias.filter(cat => cat.categoryType === 1).map(cat => cat.name);
        const foods = categorias.filter(cat => cat.categoryType === 2).map(cat => cat.name);
        const drinks = categorias.filter(cat => cat.categoryType === 3).map(cat => cat.name);
      
        return (
          <div className={styles["category-cards"]}>
            <div className={styles["card"]}>
                <h2 style={{fontWeight: "bold", textAlign: "left"}}>Músicas 🎵</h2>
              {musics.map(name => (
                <p className={styles.description} key={name}>{name}</p>
              ))}
            </div>
            <div className={styles["card"]}>
                <h2 style={{fontWeight: "bold", textAlign: "left"}}>Comidas 😋</h2>
              {foods.map(name => (
                <p className={styles.description} key={name}>{name}</p>
              ))}
            </div>
            <div className={styles["card"]}>
                <h2 style={{fontWeight: "bold", textAlign: "left"}}>Bebidas 🍷</h2>
              {drinks.map(name => (
                <p className={styles.description} key={name}>{name}</p>
              ))}
            </div>
          </div>
        );
      };

    const Avaliacao = () => {
        const { id } = useParams();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedRating, setSelectedRating] = useState(0);
        const [comment, setComment] = useState('');
        const [avaliacoes, setAvaliacoes] = useState([
        ]);
        const [currentIndex, setCurrentIndex] = useState(0);
        useEffect(() => {
            let avali = []
            api.get("/establishments/" + id).then(res => {
                if(res.data.relationships !== null) {
                    let soma = 0.0;
                    for(let i = 0; i < res.data.relationships.length; i++) {
                        const rl = res.data.relationships[i];
                        if(rl.interactionType === "COMMENT"){
                            avali.push(rl)
                            soma += rl.rate;
                        }
                    }
                    setAvaliacoes(avali);
                    setMediaAvaliacoes(soma / avali.length);
                } else {
                    setAvaliacoes(null);
                    setMediaAvaliacoes(0.0);
                }
            })
        }, [id]);
        const handleStarClick = (rating) => {
            setSelectedRating(rating);
            setIsModalOpen(true);
        };

        const handleModalClose = () => {
            setIsModalOpen(false);
        };

        const handleCommentChange = (e) => {
            setComment(e.target.value);
        };

        const handleSubmit = async () => {
            const payloadToken = decodeToken(token);
            const reqBody = {
                establishmentId: id,
                userId: payloadToken.userId,
                interactionType: "COMMENT",
                message: comment,
                rate: selectedRating
            }
    
            setIsModalOpen(false);
            let isValid = true;
            api.get("/establishments/" + id).then(async (res) => {
                const relationships = res.data.relationships;
                
                if(relationships === null) {
                    const response = await api.put("/establishments/relationship", reqBody);
                    if(response.status === 200) {
                        toast.success("Avaliado com sucesso!")
                    }
                } else {
                    relationships.forEach(rl => {
                        if(rl.userId === reqBody.userId && rl.establishmentId === id && rl.interactionType === "COMMENT") {
                            isValid = false;
                            return;
                        }
                    });
                    if(isValid) {
                        const response = await api.put("/establishments/relationship", reqBody);
                        if(response.status === 200) {
                            toast.success("Avaliado com sucesso!")
                        }
                    } else {
                        toast.warn("Você já avaliou o estabelecimento");
                    }
                }
            })
            
        };
        
        const handlePrev = () => {
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        };

        const handleNext = () => {
            if (currentIndex < avaliacoes.length - 3) {
                setCurrentIndex(currentIndex + 1);
            }
        };
        const HandleRelationships = () => {
            if(avaliacoes != null) {
                return avaliacoes.slice(currentIndex, currentIndex + 3).map((avaliacao, index) => (
                    <CardAvaliacao
                        userId={avaliacao.userId}
                        comentario={avaliacao.message}
                        rating={avaliacao.rate}
                    />
                ));
            } else {
                return <p>Sem avaliações</p>
            }
        };

        return (
            <div className={styles.avaliacao}>
                <div className={styles.secoes2}>AVALIAÇÕES</div>
                <div className="rating">Avaliar:
                    {[1, 2, 3, 4, 5].map((star) => (
                        <React.Fragment key={star}>
                            <input
                                type="radio"
                                id={`star${star}`}
                                name="rating"
                                value={star}
                                className="mask mask-star-2"
                                onClick={() => handleStarClick(star)}
                            />
                            <label htmlFor={`star${star}`} title={`${star} estrelas`}></label>
                        </React.Fragment>
                    ))}
                </div>
                <div className={styles.cardContainer}>
                    <HandleRelationships />
                </div>
                <div className={styles.navigationButtons}>
                    <button onClick={handlePrev} disabled={currentIndex === 0}>&lt;</button>
                    <button onClick={handleNext} disabled={avaliacoes != null && currentIndex >= avaliacoes.length - 3}>&gt;</button>
                </div>
                {isModalOpen && validarToken() && (
                    <Modal
                        rating={selectedRating}
                        comment={comment}
                        onClose={handleModalClose}
                        onCommentChange={handleCommentChange}
                        onSubmit={handleSubmit}
                        setSelectedRating={setSelectedRating} // Passando a função setSelectedRating para o Modal
                    />
                )}
            </div>
        );
    };
    const ShowStarsAvaliacoes = () => {
        const stars = [];
        for(let i = 0; i < Math.floor(mediaAvaliacoes); i++) {
            stars.push(<FontAwesomeIcon icon={faStar} />);  
        }
        return stars;
    }
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Modak&display=swap" />
            </Helmet>
            <div className={styles.container}>
                <NavBar logoInicio={logoQS} />
                <div className={styles['background-image']}>
                <img src={backgroundImage} alt={`Foto do estabelecimento`} className={styles.responsiveImage} />
                </div>                
                <div className={styles.logoContainer}>
                <img src={profileImage} alt="Cliente Logo" className={styles.clientLogo} />
                </div>
                <div className={styles["background-imageEstab"]}>
                    <div className={styles["container1"]}>
                        <div className={styles.header}>
                            <div className={styles.nomeEstab}>{fantasyName}</div>
                            <div className={styles.menu}>
                                <a href={facebookUrl} target='_blank' rel='noreferrer' external><FaFacebook className={styles.midias} /></a>
                                <a href={instagramUrl} target='_blank' rel='noreferrer' external><FaInstagram className={styles.midias} /></a>
                            </div>
                            <div className={styles["rating"]}>
                                <ShowStarsAvaliacoes /> ({mediaAvaliacoes.toFixed(2)})
                            </div>
                        </div>
                        <div className={styles["main-content"]}>
                        </div>
                        <div className={styles.locationDistance}>
                            <p>{neighborhood}, {city}</p>
                        </div>
                        <div className={styles.flexContainer}>
                            <div className={styles.favoritar}>
                                <div>
                                    <button type="button" className={styles.buttonFav} onClick={favoritar}>
                                        Favoritar
                                    </button>
                                </div>
                            </div>
                            <div className={styles.facilidades}>
                            {renderFacilities()}
                            </div>
                        </div>
                        <div className={styles.divisor}>____________________________________________________________________________________________________________</div>
                        <div className={styles.divisor2}>__________</div>
                        <div className={styles.flexContainer2}>
                            <div className={styles.secoes}>SOBRE NÓS</div>
                        </div>
                        <div className={styles.description}>{description}</div>
                        <div className={styles.divisor}>____________________________________________________________________________________________________________</div>
                        <div className={styles.divisor2}>__________</div>
                        <div className={styles.flexContainer3}>
                            <div className={styles.secoes}>O QUE TEMOS? 🤔</div>
                            <Categorias />
                        </div>
                        <div className={styles.divisor}>____________________________________________________________________________________________________________</div>
                        <div className={styles.divisor2}>__________</div>
                        <div className={styles.flexContainer2}>
                            <Avaliacao />
                        </div>
                        <div className={styles.divisor}>____________________________________________________________________________________________________________</div>
                        <div className={styles.divisor2}>__________</div>
                        <div className={styles.flexContainer2}>
                            <div className={styles.secoes}>SAIBA MAIS</div>
                        </div>
                        <div className={styles.saibaMais}>
                        <p><strong>ENDEREÇO:</strong> {formatAddress()}</p>
                            <div className={styles.mapa}>
                            <MapComponent postalCode={postalCode} number={number} />
                            </div>
                            <p><strong>FUNCIONAMENTO:</strong>  {`${openAt} - ${closeAt}`}</p>
                            <p><strong>CONTATO: </strong>{phone}</p>
                        </div>
                        <div className={styles.divisor}>____________________________________________________________________________________________________________</div>
                        <div className={styles.divisor2}>__________</div>
                        <div className={styles.flexContainer2}>
                            <div className={styles.secoes}>MENU</div>
                        </div>
                        <div className={styles.galleryContainer}>
                            {imageUrlsMenu.map((url, index) => (
                                <div key={index} className={styles.imageWrapper}>
                                    <ModalImage
                                        small={url}
                                        large={url}
                                        alt={`Imagem ${index + 1}`}
                                        className={styles.roundedImage}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={styles.divisor}>____________________________________________________________________________________________________________</div>
                        <div className={styles.divisor2}>__________</div>
                        <div className={styles.flexContainer2}>
                            <div className={styles.secoes}>GALERIA</div>
                        </div>
                        <div className={styles.galleryContainer}>
                            {imageUrlsGallery.map((url, index) => (
                                <div key={index} className={styles.imageWrapper}>
                                    <ModalImage
                                        small={url}
                                        large={url}
                                        alt={`Imagem ${index + 1}`}
                                        className={styles.roundedImage}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default EstabelecimentoUsuario;
