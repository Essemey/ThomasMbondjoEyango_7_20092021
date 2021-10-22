
export default class Recipe {

    constructor({ id, name, servings, ingredients, time, description, appliance, ustensils }) {
        this.id = id
        this.name = name
        this.servings = servings
        this.ingredients = ingredients
        this.time = time
        this.description = description
        this.appliance = appliance
        this.ustensils = ustensils
    }


    collect() {

        console.log(this.name)

        return new Set([this.appliance, ...this.ustensils, ...this.ingredients.map(item => item.ingredient), this.name])
    }

    render() {

        return `<article class="recipe">
                    <div class="representation"></div>
                    <div class="infos">
                        <header>
                            <h1>${this.name}</h1>
                            <span class="time"><i class="material-icons">schedule</i>${this.time} min</span>
                        </header>
                        <div class="ingredients_protocol">
                            <ul class="ingredients">
                                ${this.ingredients.map(item =>
            `<li><b>${item.ingredient}: </b>${item.quantity !== undefined ? item.quantity : ''} ${item.unit !== undefined ? item.unit : ''}</li>`
        ).join('')}
                            </ul>
                            <p class="protocol">${this.description}</p>
                        </div>
                    </div>
                </article>`
    }

}