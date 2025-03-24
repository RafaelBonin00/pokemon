import requests

def fetch_data(endpoint):
    url = f"https://pokeapi.co/api/v2/pokemon/{endpoint}"
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        return None


pokemon = fetch_data("pikachu")

if pokemon:
    abilities = pokemon["abilities"]
    # Loop para imprimir o nome de cada habilidade
    for ability in abilities:
        pokemon_name = ability["ability"]["name"]
        pokemon_url = ability["ability"]["url"]
        print(pokemon_name)
        
        
        responde = requests.get(pokemon_url).json()
        
        
        for ability_description in responde["flavor_text_entries"]:
            if ability_description["language"]["name"] == "en" and ability_description["version_group"]["name"] == "scarlet-violet":  # Verificando se o idioma é inglês
                print(ability_description["flavor_text"])
        
        

else:
    print("Erro ao buscar")
