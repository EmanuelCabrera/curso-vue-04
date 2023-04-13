import { shallowMount  } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions"
import { pokemons } from "../mocks/pokemons.mock"

describe('PokemonOptions Component', () =>{
    
    let wrapper
    beforeEach(() =>{
        wrapper = shallowMount(PokemonOptions, {
           props:{
               pokemons
           }
       })
    })

    test('debe de hacer match con el snapshot', () =>{

        expect( wrapper.html() ).toMatchSnapshot()
    })
    
    
    test(' debe de mostrar las 4 opciones correctamente', () =>{

        const liTags = wrapper.findAll('li')
        expect( liTags.length ).toBe(4)
        expect( liTags[0].text() ).toBe('charmander')
        expect( liTags[1].text() ).toBe('charmeleon')
        expect( liTags[2].text() ).toBe('charizard')
        expect( liTags[3].text() ).toBe('squirtle')

    })

    test(' debe emitir "selection" con sus respectivos valores', () =>{

        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')

        expect( wrapper.emitted('selection').length ).toBe(4)
        expect( wrapper.emitted('selection')[0] ).toEqual([4])
        expect( wrapper.emitted('selection')[1] ).toEqual([5])
        expect( wrapper.emitted('selection')[2] ).toEqual([6])
        expect( wrapper.emitted('selection')[3] ).toEqual([7])
    })
})