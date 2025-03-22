document.getElementById("fetchButton").addEventListener("click", fetchPokemon);

function fetchPokemon() {
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
      const pokemonData = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}" />
        <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
        <p><strong>Altura:</strong> ${data.height} decímetros</p>
        <p><strong>Peso:</strong> ${data.weight} hectogramas</p>
      `;
      document.getElementById("pokemonData").innerHTML = pokemonData;
    })
    .catch(error => {
      document.getElementById("pokemonData").innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}
