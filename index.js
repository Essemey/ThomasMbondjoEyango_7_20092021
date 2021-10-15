import Appliances from './models/Appliances.js'
import Ingredients from './models/Ingredients.js'
import Results from './models/Results.js'
import Ustensils from './models/Ustensils.js'

const ingredients = new Ingredients()
const appliances = new Appliances()
const ustensils = new Ustensils()

const filters = [ingredients, appliances, ustensils]


const results = new Results()


fetch('recipes.json')
    .then(res => res.json())
    .then(recipes => {

        results.hydrate(recipes)
        results.addFilters(filters)
        results.display()
        results.listenForMainSearch()

        filters.forEach(filter => {
            filter.hydrate(results.recipes)
            filter.getResults(results)
            filter.display()
            filter.listenInput()
            filter.listenForSelectTag()
        })



    })