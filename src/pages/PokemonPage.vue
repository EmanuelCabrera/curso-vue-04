<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Qui&eacute;n es este pok&eacute;mon?</h1>  

    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>

    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer"/>
    
    <template v-if="showAnswer">
      <h3>{{message}}</h3>
      <h3>{{finalScore}}</h3>
      <button v-if="life > 0"  class="btn btn-success" @click="next">Continuar</button>
      <button v-else class="btn btn-danger" @click="reset">Reiniciar</button>     
    </template>

  </div>

</template>

<script>

import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
  components: { 
    PokemonOptions, 
    PokemonPicture 
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      life: 4,
      score: 0,
      finalScore: ""
    }
  },

  methods: {
    async mixPokemonArray() {
     
        this.pokemonArr =  await getPokemonOptions()

        const rndInt = Math.floor( Math.random() * 4)

        this.pokemon = this.pokemonArr[ rndInt ]
    },

    checkAnswer(selectedId){

      this.showAnswer = true
      this.showPokemon = true
      if (this.pokemon.id === selectedId) {
          this.message = `Correcto era ${this.pokemon.name}!!`
          this.score += 1
      }else{
          this.life -= 1   
          this.message = this.life > 0 ? `Incorrecto era ${this.pokemon.name} te quedan ${this.life} vidas!!` : `Incorrecto era ${this.pokemon.name}, perdiste todas las vidas!!!`
          this.finalScore =  this.life === 0 ? `Puntuación final ${this.score}!!!` : ""
      }

    },

    next(){
        this.pokemonArr = []
        this.pokemon = null
        this.showPokemon = false
        this.showAnswer = false
        this.mixPokemonArray()
    },
    reset(){
      this.pokemonArr = []
      this.pokemon = null
      this.showPokemon = false
      this.showAnswer = false
      this.life = 4
      this.score = 0
      this.mixPokemonArray()
    }
    
  },  

  mounted() {
    this.mixPokemonArray()
  },


}
</script>
