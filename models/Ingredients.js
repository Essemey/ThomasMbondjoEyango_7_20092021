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

    design(listSize, first) {

        const filterBlock = document.querySelector(`#${this.type}`);
        const filterInput = document.querySelector(`#${this.type} .filter_search input`);
        const filterList = document.querySelector(`#${this.type} .filter_list`);


        const isFocused = () => document.activeElement === filterInput ? true : false;

        if (listSize === 0 && isFocused() && first) {

            filterBlock.style.width = "840px";
            return filterList.style.width = "840px";
        }

        if ((listSize <= 1 || listSize <= 3) && isFocused()) {

            filterList.style.width = "170px";
            filterBlock.style.width = "170px";

        } else if ((listSize <= 4 || listSize <= 12) && isFocused()) {

            filterList.style.width = "480px";
            filterBlock.style.width = "480px";

        } else if (listSize > 12 && isFocused()) {

            filterList.style.width = "840px";
            filterBlock.style.width = "840px";
        }
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