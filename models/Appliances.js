import Category from "./Category.js";


export default class Appliances extends Category {

    constructor() {
        super()
        this.type = "appliances"
        this.placeholder = "appareil"
    }


    design(listSize, first) {

        const filterBlock = document.querySelector(`#${this.type}`)
        const filterInput = document.querySelector(`#${this.type} .filter_search input`)
        const filterList = document.querySelector(`#${this.type} .filter_list`)

        // if (document.activeElement === filterInput) filterBlock.style.width = '480px'

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