import getPokemonOptions , { getPokemons, getPokemonName } from "@/helpers/getPokemonOptions"

describe( 'getPokemonOptions', () => {

    test('debe de regresar un arreglo de numeros', () =>{
        const pokemons = getPokemons()
        
        expect( pokemons.length ).toBe(650)
        expect( pokemons[0] ).toBe(1)
        expect( pokemons[500] ).toBe(501)
        expect( pokemons[649] ).toBe(650)
    })

    test('debe de retornar un arreglo de 4 elementos con sus nombres de pokemons', async () =>{
        const pokemons = getPokemons()
        const mixedPokemons = (pokemons.sort(() => Math.random() - 0.5)).splice(0,4)
        
        const [pokemon1, pokemon2, pokemon3, pokemon4] = await getPokemonName(mixedPokemons)
        
        expect( pokemon1.name ).not.toBeNull()
        expect( pokemon2.name ).not.toBeNull()
        expect( pokemon3.name ).not.toBeNull()
        expect( pokemon4.name ).not.toBeNull()
    })

    test('debe de retornar un arreglo mezclado', async () =>{
        // const pokemons = getPokemons()
        const pokemons = await getPokemonOptions()
      
        expect( pokemons.length).toBe(4)
        expect( pokemons ).toEqual([
            {
                name: expect.any(String),
                id: expect.any(Number)
            },
            {
                name: expect.any(String),
                id: expect.any(Number)
            },
            {
                name: expect.any(String),
                id: expect.any(Number)
            },
            {
                name: expect.any(String),
                id: expect.any(Number)
            }
        ])
    })
})