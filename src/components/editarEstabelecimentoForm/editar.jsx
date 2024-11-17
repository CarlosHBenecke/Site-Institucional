import api from "../../api";
import { toast } from 'react-toastify';
import styles from "./form.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";

const musics = ['Rock', 'Sertanejo', 'Indie', 'Rap', 'Funk', 'Metal'];
const foods = ['Brasileira', 'Boteco', 'Japonesa', 'Mexicana', 'Churrasco', 'Hamburguer'];
const drinks = ['Cerveja', 'Vinho', 'Chopp', 'Whisky', 'Gim', 'Caipirinha', 'Drinks'];
let addressId = "";
function Editar({idEmpresa}) {
    const navigate = useNavigate();
    const id = idEmpresa;
    const [phone, setPhone] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [telegramUrl, setTelegramUrl] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [complement, setComplement] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [openAtTime, setOpenAt] = useState({ hour: 0, minute: 0 });
    const [closeAtTime, setCloseAt] = useState({ hour: 0, minute: 0 });
    
    // Novos estados para informações adicionais
    const [tv, setTv] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [acessibilidade, setAcessibilidade] = useState(false);
    const [estacionamento, setEstacionamento] = useState(false);

    const [selectedMusics, setSelectedMusics] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [selectedDrinks, setSelectedDrinks] = useState([]);

    useEffect(() => {
        api.get(`/establishments/${id}`).then((response) => {
            const { data } = response;
            setPhone(data.information.phone);
            setDescription(data.information.description);
            setOpenAt({ hour: data.information.openAt[0], minute: 0});
            setCloseAt({ hour: data.information.closeAt[0], minute: 0})
            setFacebookUrl(data.information.facebookUrl);
            setInstagramUrl(data.information.instagramUrl);
            setTelegramUrl(data.information.telegramUrl);
            setAcessibilidade(data.information.hasAccessibility);
            setEstacionamento(data.information.hasParking);
            setTv(data.information.hasTv);
            setWifi(data.information.hasWifi);
            
            const musicCategories = data.categories.filter(cat => cat.categoryType === 1).map(cat => cat.name);
            const foodCategories = data.categories.filter(cat => cat.categoryType === 2).map(cat => cat.name);
            const drinkCategories = data.categories.filter(cat => cat.categoryType === 3).map(cat => cat.name);
            setSelectedMusics(musicCategories);
            setSelectedFoods(foodCategories);
            setSelectedDrinks(drinkCategories);
        })
        .catch((error) => {
            console.log("Erro ao buscar os detalhes do estabelecimento:", error);
        })

        api.get(`/address/establishment/${id}`).then(res => {
            const data  = res.data[0];
            addressId = data.id;
            setPostalCode(data.postalCode);
            setStreet(data.street);
            setNumber(data.number);
            setNeighborhood(data.neighborhood);
            setComplement(data.complement);
            setCity(data.city);
            setState(data.state);
        })
    }, [id]);

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };

    const handlePostalCodeChange = async (event) => {
        const cep = event.target.value.replace('-', ''); // Remover o hífen
        setPostalCode(cep);
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const data = response.data;
                if (!data.erro) {
                    setStreet(data.logradouro || "");
                    setNeighborhood(data.bairro || "");
                    setCity(data.localidade || "");
                    setState(data.uf || "");
                } else {
                    toast.warn('CEP não encontrado');
                }
            } catch (error) {
                console.log("Error: " + error)
            }
        }
    };

    const handleTimeChange = (event, timeType) => {
        const hour = event.target.value;
        if (timeType === "openAt") {
            setOpenAt({ hour, minute: 0 });
        } else {
            setCloseAt({ hour, minute: 0 });
        }
    };

    const handleCheckboxChange = (event, setStateFunction) => {
        setStateFunction(event.target.checked);
    };

    const handleSave = async () => {
        const categories = [
            ...selectedDrinks.map((item) => ({ categoryType: 3, category: drinks.indexOf(item) + 1 })),
            ...selectedFoods.map((item) => ({ categoryType: 2, category: foods.indexOf(item) + 1 })),
            ...selectedMusics.map((item) => ({ categoryType: 1, category: musics.indexOf(item) + 1 }))
        ];
        try {
            await api.put(`/address/${addressId}`, {
                street,
                number,
                postalCode,
                neighborhood,
                complement,
                state,
                city
            });
        } catch (error) {
            console.error('Erro ao atualizar endereço:', error);
        }

        try {
            await api.put('/informations/establishment', {
                hasParking: estacionamento,
                hasAccessibility: acessibilidade,
                hasTv: tv,
                hasWifi: wifi,
                openAt: {
                    hour: openAtTime.hour,
                    minute: 0
                },
                closeAt: {
                    hour: closeAtTime.hour,
                    minute: 0
                },
                phone,
                facebookUrl,
                instagramUrl,
                telegramUrl,
                establishmentId: id,
                description
            });

            // Update categories
            await api.put('/establishments/categories', {
                establishmentId: id,
                categories
            });

            toast.success('Dados editados com sucesso!');
            navigate("/estabelecimento-dono/" + id);
        } catch (error) {
            toast.error('Erro ao salvar as informações. Por favor, tente novamente.');
            console.error('Erro ao salvar as informações:', error);
        }
    };

    const handleCancel = () => {
        navigate("/estabelecimento");
    };

    return (
        <>
            <form action="post" className={styles.container}>
                <div>
                    <div className={styles["secao-direita-editar"]}>
                        <form>
                            <span className={styles["titulo"]}>Editar suas informações:</span>
                            <input
                                type="text"
                                value={description}
                                placeholder="Descrição"
                                onChange={(e) => handleInputChange(e, setDescription)}
                                required
                            />
                            <InputMask
                                mask="(99) 99999-9999"
                                value={phone}
                                placeholder="Telefone"
                                onChange={(e) => handleInputChange(e, setPhone)}
                                required
                            />
                            <InputMask
                                mask="99999-999"
                                value={postalCode}
                                placeholder="CEP"
                                onChange={handlePostalCodeChange}
                                required
                            />
                            <input
                                type="text"
                                value={street}
                                placeholder="Rua"
                                onChange={(e) => handleInputChange(e, setStreet)}
                                required
                            />
                            <input
                                type="text"
                                value={number}
                                placeholder="Número"
                                onChange={(e) => handleInputChange(e, setNumber)}
                                required
                            />
                            <input
                                type="text"
                                value={neighborhood}
                                placeholder="Bairro"
                                onChange={(e) => handleInputChange(e, setNeighborhood)}
                                required
                            />
                            <input
                                type="text"
                                value={complement}
                                placeholder="Complemento"
                                onChange={(e) => handleInputChange(e, setComplement)}
                                required
                            />
                            <input
                                type="text"
                                value={city}
                                placeholder="Cidade"
                                onChange={(e) => handleInputChange(e, setCity)}
                                required
                            />
                            <input
                                type="text"
                                value={state}
                                placeholder="Estado"
                                onChange={(e) => handleInputChange(e, setState)}
                                required
                            />
                            <div className={styles.timeContainer}>
                                <label>
                                    Abre às:
                                    <input
                                        type="number"
                                        value={openAtTime.hour}
                                        onChange={(e) => handleTimeChange(e, "openAt")}
                                        required
                                    />
                                </label>
                                <label>
                                    Fecha às:
                                    <input
                                        type="number"
                                        value={closeAtTime.hour}
                                        onChange={(e) => handleTimeChange(e, "closeAt")}
                                        required
                                    />
                                </label>
                            </div>
                            <input
                                type="text"
                                value={facebookUrl}
                                placeholder="Facebook"
                                onChange={(e) => handleInputChange(e, setFacebookUrl)}
                                required
                            />
                            <input
                                type="text"
                                value={instagramUrl}
                                placeholder="Instagram URL"
                                onChange={(e) => handleInputChange(e, setInstagramUrl)}
                                required
                            />
                            <input
                                type="text"
                                value={telegramUrl}
                                placeholder="Site Oficial"
                                onChange={(e) => handleInputChange(e, setTelegramUrl)}
                                required
                            />
                            <h3>Informações adicionais</h3>
                            <div className={styles.checkboxContainer}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={tv}
                                        onChange={(e) => handleCheckboxChange(e, setTv)}
                                    />
                                    TV
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={wifi}
                                        onChange={(e) => handleCheckboxChange(e, setWifi)}
                                    />
                                    WiFi
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={acessibilidade}
                                        onChange={(e) => handleCheckboxChange(e, setAcessibilidade)}
                                    />
                                    Acessibilidade
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={estacionamento}
                                        onChange={(e) => handleCheckboxChange(e, setEstacionamento)}
                                    />
                                    Estacionamento
                                </label>
                            </div>
                            <div>
                                <h3>Selecione as categorias de Músicas</h3>
                                <div className={styles.option_box}>
                                    <Multiselect
                                        isObject={false}
                                        onRemove={(selectedList, removedItem) => setSelectedMusics(selectedList)}
                                        onSelect={(selectedList, selectedItem) => setSelectedMusics(selectedList)}
                                        options={musics}
                                        selectedValues={selectedMusics}
                                        className={styles["multiselect-container"]}
                                        placeholder="Escolha suas músicas"
                                    />
                                </div>
                            </div>
                            <div>
                                <h3>Selecione as categorias de Comida</h3>
                                <div className={styles.option_box}>
                                    <Multiselect
                                        isObject={false}
                                        onRemove={(selectedList, removedItem) => setSelectedFoods(selectedList)}
                                        onSelect={(selectedList, selectedItem) => setSelectedFoods(selectedList)}
                                        options={foods}
                                        selectedValues={selectedFoods}
                                        className={styles["multiselect-container"]}
                                        placeholder="Escolha suas comidas"
                                    />
                                </div>
                            </div>
                            <div>
                                <h3>Selecione as categorias de Bebida</h3>
                                <div  className={styles.option_box}>
                                    <Multiselect
                                        isObject={false}
                                        onRemove={(selectedList, removedItem) => setSelectedDrinks(selectedList)}
                                        onSelect={(selectedList, selectedItem) => setSelectedDrinks(selectedList)}
                                        options={drinks}
                                        selectedValues={selectedDrinks}
                                        className={styles["multiselect-container"]}
                                        placeholder="Escolha suas bebidas"
                                    />
                                </div>
                            </div>
                            <div className={styles["buttons-container-editar"]}>
                                <button type="button" onClick={handleSave}>
                                    Salvar
                                </button>
                                <button type="button" onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Editar;
