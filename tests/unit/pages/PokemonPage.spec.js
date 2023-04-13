import { shallowMount  } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage"
import { pokemons } from "../mocks/pokemons.mock";

describe('PokemonPage Component', () =>{

    let wrapper

    beforeEach( () =>{
        wrapper = shallowMount( PokemonPage )
    })

    test('debe de hacer match con el snapshot', () =>{
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de llamar mixPokemonArray al montar', () =>{
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods,'mixPokemonArray' )
        const wrapper = shallowMount( PokemonPage )

        expect( mixPokemonArraySpy ).toHaveBeenCalled()
    })


    test('debe de hacer el snapshot cuando cargan los pokemons', ()=>{
        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                    life: 4,
                    score: 0,
                    finalScore: ""
                }
            },
        } )

        expect( wrapper.html()).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de PokemonPicture y PokemonOption', ()=>{
        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                    life: 4,
                    score: 0,
                    finalScore: ""
                }
            },
        } )
        const PokemonPicture = wrapper.find('pokemon-picture-stub')
        const PokemonOption = wrapper.find('pokemon-options-stub')
        
        expect( PokemonPicture.exists() ).toBe(true)
        expect( PokemonOption.exists() ).toBe(true)
        expect( PokemonPicture.attributes().pokemonid).toEqual("4")
        expect( PokemonOption.attributes().pokemons).toBeDefined()
    })


    test('pruebas con checkAnswer', async()=>{
        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                    life: 4,
                    score: 0,
                    finalScore: ""
                }
            },
        } )

        await wrapper.vm.checkAnswer(4)
        expect( wrapper.find('h3').exists() ).toBeTruthy()
        console.log( wrapper.find('h3').text() )
        expect( wrapper.vm.showPokemon ).toBeTruthy()
        expect( wrapper.find('h3').text() ).toBe(`Correcto era ${pokemons[0].name}!!`)

        await wrapper.vm.checkAnswer(10)
        expect( wrapper.vm.message ).toBe(`Incorrecto era ${pokemons[0].name} te quedan ${3} vidas!!`)

    })
})