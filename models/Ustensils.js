import Category from "./Category.js";


export default class Ustensils extends Category {

    constructor() {
        super()
        this.type = "ustensils"
    }

    hydrate(recipes) {
        recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => this.all.add(ustensil.toLowerCase())));
        console.log(this.all)
    }

    collect() {

        const ustensils = new Set();

        this.results.filteredList.forEach(recipe => recipe.ustensils.forEach(ustensil => ustensils.add(ustensil.toLowerCase())));

        return ustensils
    }

    sort(element, list) {

        const filtered = new Set()

        if (!list) {
            this.results.recipes.forEach(recipe => recipe.ustensils
                .forEach(ustensil => ustensil.toLowerCase().indexOf(element) !== -1 && filtered.add(recipe)))
        } else {
            list.forEach(recipe => recipe.ustensils
                .forEach(ustensil => ustensil.toLowerCase().indexOf(element) !== -1 && filtered.add(recipe)))
        }

        return filtered
    }

}