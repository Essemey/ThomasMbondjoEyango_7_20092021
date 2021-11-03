import Category from "./Category.js";


export default class Appliances extends Category {

    constructor() {
        super();
        this.type = "appliances";
        this.placeholder = "appareil";
    }



    hydrate(recipes) {
        recipes.forEach(recipe => this.all.add(recipe.appliance.toLowerCase()));
        console.log(this.all);
    }

    collect() {

        const appliances = new Set();

        this.results.filteredList.forEach(recipe => appliances.add(recipe.appliance.toLowerCase()));

        return appliances;
    }


}