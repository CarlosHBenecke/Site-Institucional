import axios from "axios";

async function validateCNPJ(cpnj) {
    const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cpnj}`);
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

function cnpjMask(value) {
    return value
        .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
        .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
}

function removeCnpjMask(value) {
    return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
}

function decodeToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const meses = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    return `${dia} de ${mes} de ${ano}`;
};

function summarizeDescription(description, max) {
    const maxLength = max;
    if (description.length <= maxLength) {
        return description;
    }
    return description.slice(0, maxLength) + "...";
}

export { validateCNPJ, cnpjMask, removeCnpjMask, decodeToken, formatarData, summarizeDescription };