const key = "942938c7c43b7c09b975e3c456ce8323";

function dataOnScreen(data) {
    document.querySelector(".city").innerHTML = "Tempo em " + data.name;
    document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
    document.querySelector(".text-prev").innerHTML = data.weather[0].description;
    document.querySelector(".humidity").innerHTML = "Umidade: " + data.main.humidity + "%";
    document.querySelector(".img-prev").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    
    const windKmh = (data.wind.speed * 3.6).toFixed(2); // Duas casas decimais
    document.querySelector(".wind").innerHTML = "Vento: " + windKmh + "km/h";
    console.log(data);
}

// Função para extrair informações de uma entrada como "Salto, SP"
function extrairInformacoes(entrada) {
    const partes = entrada.split(',').map(item => item.trim());
    
    let cidade = '';
    let estado = '';
    let pais = '';
    
    if (partes.length >= 1) {
        cidade = partes[0];
    }
    
    if (partes.length >= 2) {
        estado = partes[1];
    }
    
    if (partes.length >= 3) {
        pais = partes[2];
    }
    
    return {
        cidade,
        estado,
        pais
    };
}

async function searchCity(city, estado, pais) {
    const formattedCity = encodeURIComponent(`${city},${estado},${pais}`); // Formata a pesquisa
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${key}&lang=pt_br&units=metric`)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
        });

    if (data) {
        dataOnScreen(data);
    }
}

function clickOnButton() {
    const entradaUsuario = document.querySelector(".input-city").value;
    const informacoes = extrairInformacoes(entradaUsuario);
    
    const cidade = informacoes.cidade;
    const estado = informacoes.estado;
    const pais = informacoes.pais;
    
    // Agora você pode usar cidade, estado e país na pesquisa
    searchCity(cidade, estado, pais);
}

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", clickOnButton);
