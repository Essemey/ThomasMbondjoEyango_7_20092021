import Category from "./Category.js";


export default class Appliances extends Category {

    constructor() {
        super()
        this.type = "appliances"
    }

    hydrate(recipes) {
        recipes.forEach(recipe => this.all.add(recipe.appliance.toLowerCase()))
        console.log(this.all)
    }

    collect() {

        const appliances = new Set();

        this.results.filteredList.forEach(recipe => appliances.add(recipe.appliance.toLowerCase()))

        return appliances
    }

    sort(element, list) {

        const filtered = new Set()

        if (!list) {
            this.results.recipes.forEach(recipe => recipe.appliance.toLowerCase().indexOf(element) !== -1 && filtered.add(recipe))
        } else {
            list.forEach(recipe => recipe.appliance.toLowerCase().indexOf(element) !== -1 && filtered.add(recipe))
        }

        return filtered
    }

}