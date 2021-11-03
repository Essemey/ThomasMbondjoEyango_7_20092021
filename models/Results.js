import Recipe from "./Recipe.js";

export default class Results {

    constructor() {
        this.recipes = [];
        this.categories = [];
        this.filteredList = new Set();
        this.start = false;
        this.search = "";
    }



    actualize() {
        let html = "";
        this.filteredList.forEach(recipe => html += recipe.render());

        document.querySelector("main").innerHTML = this.filteredList.size ? html : "<p>Aucune correspondance...</p>";
    }

    actualizeFilters() {
        this.categories.forEach(category => {
            category.design();
            category.display(category.render(category.collect()));
            category.listenForSelectTag();
        });
    }

    addFilters(filters) {
        filters.forEach(filter => this.categories.push(filter));
    }

    display() {

        let html = "";
        this.recipes.forEach(recipe => html += recipe.render());

        document.querySelector("main").innerHTML = html;
    }

    filter() {

        if (!this.getAllTags().length) { //Si il n'y a plus du tout de tags

            if (!this.search.length) {

                this.filteredList = new Set(this.recipes); //On affiche toutes les recettes
                this.actualize();
                return this.actualizeFilters();
            }

        }

        let filtered;

        this.getAllTags().forEach((tag, index) => {
            if (index === 0) {
                console.log("1");

                filtered = this.categories.find(category => category.type === tag.type).sort(tag.content); //On trie d'abord sur results.recipes puis

            } else {
                console.log("here 2");
                filtered = this.categories.find(category => category.type === tag.type).sort(tag.content, filtered);
                //sur le retour du premier trie et ainsi de suite
            }
        });

        if (this.search.length && this.start) {
            return this.sort(this.search, filtered);
        }

        this.filteredList = filtered;
        this.actualize();
        this.actualizeFilters();
    }

    getAllTags() {

        const tags = [];

        this.categories.forEach(category => {
            category.tags.forEach(tag => tags.push({ content: tag, type: category.type }));
        });

        return tags;
    }

    hydrate(recipes) {
        this.recipes = recipes.map(recipe => new Recipe(recipe));
    }

    keepTagsFilteredList(list, filtered) {
        const prevFiltered = list;      //On enregistre la liste des recettes filtrées par les tags
        this.filteredList = new Set(filtered); //On met à jour le contenu avec la nouvelle liste filtrée
        this.actualize();
        this.actualizeFilters();
        return this.filteredList = new Set(prevFiltered); /*Ensuite pour les prochaines recherches on filtre sur la liste filtrée des tags
        , pas sur celle filtrée précédemment pour etre sur de prendre en compte tous les critères*/
    }

    listenForMainSearch() {

        document.querySelector("#research_container .main_research input").addEventListener("input", (e) => {
            if (e.target.value.length >= 3 || this.start) {
                this.search = e.target.value;
                this.start = true;
                //Si on a pas de tags on filtre sur this.recipes sinon on filtre sur la liste déja filtrée
                !this.getAllTags().length ? this.sort(this.search) : this.sort(this.search, this.filteredList);
            }
        });
    }


    sort(userInput, list) {

        const userInputLow = userInput.toLowerCase();
        const filtered = [];

        if (!this.search.length) this.start = false;

        if (!list) {  //Si il n'y a pas de liste on filtre sur toutes les recettes

            console.time("v1");

            this.recipes.forEach(recipe => recipe.name.toLowerCase().indexOf(userInputLow) !== -1 && filtered.push(recipe));//Title

            this.categories.forEach(category => {
                filtered.push(...category.sort(userInputLow));
            });

            console.timeEnd("v1");

            this.filteredList = new Set(filtered);
            this.actualizeFilters();
            return this.actualize();
        }

        // Si on a une liste on filtre sur cette liste de recettes

        console.time("v1bis");
        list.forEach(recipe => recipe.name.toLowerCase().indexOf(userInputLow) !== -1 && filtered.push(recipe));//Title

        this.categories.forEach(category => {
            filtered.push(...category.sort(userInputLow, list));
        });
        console.timeEnd("v1bis");

        this.keepTagsFilteredList(list, filtered);

    }

}