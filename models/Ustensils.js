import Category from "./Category.js";


export default class Ustensils extends Category {

    constructor() {
        super();
        this.type = "ustensils";
        this.placeholder = "ustensile";
    }

    hydrate(recipes) {
        recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => this.all.add(ustensil.toLowerCase())));
        console.log(this.all);
    }



    collect() {

        const ustensils = new Set();

        this.results.filteredList.forEach(recipe => recipe.ustensils.forEach(ustensil => ustensils.add(ustensil.toLowerCase())));

        return ustensils;
    }



}