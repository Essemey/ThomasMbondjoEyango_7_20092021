import Category from "./Category.js";


export default class Ingredients extends Category {

    constructor() {
        super();
        this.type = "ingredients";
        this.placeholder = "ingrédient";
    }



    hydrate(recipes) {
        const ingredientList = [];
        recipes.map(recipe => recipe.ingredients.map(ingredient => ingredientList.push(ingredient)));

        ingredientList.forEach(item => this.all.add(item.ingredient.toLowerCase()));

    }


    collect() {

        const ingredientArray = [];
        const ingredients = new Set();

        this.results.filteredList.forEach(recipe => recipe.ingredients.forEach(ingredient => ingredientArray.push(ingredient)));
        ingredientArray.forEach(item => ingredients.add(item.ingredient.toLowerCase()));

        return ingredients;
    }


    sort(element, list) {

        const filtered = new Set();

        //console.log(element);

        if (!list) {
            this.results.recipes.forEach(recipe =>
                recipe.ingredients.forEach(item => item.ingredient.toLowerCase().indexOf(element) !== -1 && filtered.add(recipe)));
        } else {
            list.forEach(recipe => recipe.ingredients.forEach(item =>
                item.ingredient.toLowerCase().indexOf(element) !== -1 && filtered.add(recipe)));
        }

        //console.log(filtered);

        return filtered;
    }

}