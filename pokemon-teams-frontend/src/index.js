const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pokeExampleArray = [
  {"nickname":"Michelle", "species":"Charmander"},
  {"nickname":"Mick", "species":"Ratata"},
  {"nickname":"Shell", "species":"Sandshrew"},
  {"nickname":"Mick", "species":"Ratata"}]

//GET A RANDOM ONE: pokeExampleArray[Math.floor(Math.random() * pokeExampleArray.length)];

const mainSection = document.querySelector('main')

function index() {
  fetch(TRAINERS_URL).then(resp => resp.json()).then(displayTrainers)
}

function pokemonPerTrainer(pokeArray) {
  return pokeArray.map(pokemon => `<li>${pokemon.nickname} (${pokemon.species})<button data-action='remove-pokemon' class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`).join("")
}

function displayTrainers(data) {
  mainSection.innerHTML = ''
  data.forEach( trainer => {
   mainSection.innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
      <button data-action='add-pokemon' data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>
        ${pokemonPerTrainer(trainer.pokemons)}
      </ul>
    </div>`
  })

  document.querySelectorAll('main div').forEach(trainer => {
    trainer.addEventListener('click', function(e) {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.innerText === "Add Pokemon") {
          if (event.target.parentElement.querySelectorAll('li').length >= 6) {
            return alert(`You can't add any more pokemon!`)
          } else {
            addPokemon(event.target.dataset.trainerId)
          }
        } else if (event.target.innerText === "Release") {
          deletePokemon(event.target.dataset.pokemonId)
        }
      }
    })
  })
}

function addPokemon(id) {
  // const randomNewPoke = pokeExampleArray[Math.floor(Math.random() * pokeExampleArray.length)];
  // randomNewPoke.trainer_id = id
  const postURL = `${TRAINERS_URL}/${id}/pokemons`
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({trainer_id: id})
  }
  fetch(POKEMONS_URL, config).then(index)
}

function deletePokemon(id) {
  const deleteURL = `${POKEMONS_URL}/${id}`
  fetch(deleteURL, {method: 'DELETE'}).then(index)
}

document.addEventListener('DOMContentLoaded', index)
