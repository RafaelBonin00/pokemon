document.getElementById("fetchButton").addEventListener("click", fetchPokemon);
document.getElementById("showAbilitiesButton").addEventListener("click", showAbilities);

let pokemonDataGlobal = {};  // Variável global para armazenar os dados do Pokémon

function fetchPokemon() {
  const pokemonData_div = document.getElementById("pokemonData");
  pokemonData_div.style.display = "flex";
  const pokemonData_div_hab_btn = document.getElementById("showAbilitiesButton");
  pokemonData_div_hab_btn.style.display = "flex";

  const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
  if (!pokemonName) {
    alert("Por favor, insira um nome de Pokémon.");
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokémon não encontrado!");
      }
      return response.json();
    })
    .then(data => {
      pokemonDataGlobal = data;  // Salva os dados do Pokémon na variável global
      const pokemonData = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}" />
        <p><strong>National N°:</strong> ${(data.id)}</p>
        <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
        <p><strong>Altura:</strong> ${(data.height / 10).toFixed(2)} metros</p>
        <p><strong>Peso:</strong> ${(data.weight / 10).toFixed(2)} quilos</p>
      `;
      document.getElementById("pokemonData").innerHTML = pokemonData;
    })
    .catch(error => {
      document.getElementById("pokemonData").innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}

// Função para mostrar as habilidades do Pokémon
function showAbilities() {
  const abilities = pokemonDataGlobal.abilities;

  if (!abilities) {
      document.getElementById("pokemonAbilities").innerHTML = "<p>Habilidades não encontradas.</p>";
      return;
  }

  // Função para obter a descrição da habilidade usando o URL
  const getAbilityDescription = async (url) => {
      try {
          const response = await fetch(url);
          const data = await response.json();

          // Encontrar a descrição em inglês e da versão "scarlet-violet"
          const flavorTextEntry = data.flavor_text_entries.find(
              entry => entry.language.name === 'en' && entry.version_group.name === 'scarlet-violet'
          );

          return flavorTextEntry ? flavorTextEntry.flavor_text : "Descrição não disponível.";
      } catch (error) {
          return "Erro ao buscar descrição.";
      }
  };

  // Criar uma lista de promessas para buscar a descrição de todas as habilidades
  const abilityDescriptionsPromises = abilities.map(async (ability) => {
      const description = await getAbilityDescription(ability.ability.url);
      return `<strong>${ability.ability.name}:</strong> ${description}`;
  });

  // Espera todas as promessas serem resolvidas antes de atualizar o HTML
  Promise.all(abilityDescriptionsPromises)
      .then(descriptions => {
          document.getElementById("pokemonAbilities").innerHTML = `
              <h3>Habilidades:</h3>
              <ul>
                  ${descriptions.map(description => `<li>${description}</li>`).join('')}
              </ul>
          `;
      });
}

  
  
