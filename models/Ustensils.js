import Category from "./Category.js";


export default class Ustensils extends Category {

    constructor() {
        super()
        this.type = "ustensils"
        this.placeholder = "ustensile"
    }

    hydrate(recipes) {
        recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => this.all.add(ustensil.toLowerCase())));
        console.log(this.all)
    }

    design(listSize, first) {

        const filterBlock = document.querySelector(`#${this.type}`)
        const filterInput = document.querySelector(`#${this.type} .filter_search input`)
        const filterList = document.querySelector(`#${this.type} .filter_list`)


        const isFocused = () => document.activeElement === filterInput ? true : false

        if (listSize === 0 && isFocused() && first) {
            filterBlock.style.width = '480px'
            return filterList.style.width = '480px'
        }

        if (listSize <= 1 || listSize <= 3 && isFocused()) {
            filterList.style.width = '170px'
            filterBlock.style.width = '170px'
        }

        if (listSize > 3 && isFocused()) {
            filterList.style.width = '480px'
            filterBlock.style.width = '480px'
        }
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