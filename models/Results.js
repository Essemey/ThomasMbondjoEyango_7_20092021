import Recipe from './Recipe.js'

export default class Results {

    constructor(filters) {
        this.recipes = []
        this.categories = []
        this.filteredList = new Set()
        this.start = false
        this.search = ''
    }

    addFilters(filters) {
        filters.forEach(filter => this.categories.push(filter))
    }

    actualize() {
        let html = ``
        this.filteredList.forEach(recipe => html += recipe.render())

        document.querySelector('main').innerHTML = this.filteredList.size ? html : '<p>Aucune correspondance...</p>'
    }

    actualizeFilters() {
        this.categories.forEach(category => {
            category.display(category.render(category.collect()))
            category.listenForSelectTag()
        })
    }

    getAllTags() {

        const tags = []

        this.categories.forEach(category => {
            category.tags.forEach(tag => tags.push({ content: tag, type: category.type }))
        })

        return tags
    }


    display() {

        let html = ``
        this.recipes.forEach(recipe => html += recipe.render())

        document.querySelector('main').innerHTML = html
    }

    filter() {

        if (!this.getAllTags().length) { //Si il n'y a plus du tout de tags

            if (!this.search.length) {

                this.filteredList = new Set(this.recipes) //On affiche toutes les recettes
                this.actualize()
                return this.actualizeFilters()
            }


        }

        let filtered;

        this.getAllTags().forEach((tag, index) => {
            if (index === 0) {
                console.log('1')

                filtered = this.categories.find(category => category.type === tag.type).sort(tag.content) //On trie d'abord sur results.recipes puis

            } else {
                console.log('here 2')
                filtered = this.categories.find(category => category.type === tag.type).sort(tag.content, filtered)
                //sur le retour du premier trie et ainsi de suite
            }
        })

        if (this.search.length && this.start) {
            console.log('here')
            this.sort(this.search, filtered)
            this.actualize()
            return this.actualizeFilters()
        }

        console.log('suite...')
        console.log(filtered)

        this.filteredList = filtered
        this.actualize()
        this.actualizeFilters()
    }





    hydrate(recipes) {
        this.recipes = recipes.map(recipe => new Recipe(recipe))
    }

    listenForMainSearch() {

        document.querySelector('#research_container .main_research input').addEventListener('input', (e) => {
            if (e.target.value.length >= 3 || this.start) {
                this.search = e.target.value
                this.start = true
                //Si on a pas de tags on filtre sur this.recipes sinon on filtre sur la liste déja filtrée
                const sort = !this.getAllTags().length ? this.sort(this.search) : this.sort(this.search, this.filteredList)
                if (sort !== 'back') {
                    this.actualizeFilters()
                    this.actualize()
                }
            }
        })
    }


    sort(userInput, list) {

        const userInputLow = userInput.toLowerCase()
        const filtered = []

        if (!this.search.length) this.start = false

        if (!list) {

            console.log('pas de liste')

            this.recipes.forEach(recipe => recipe.name.toLowerCase().indexOf(userInputLow) !== -1 && filtered.push(recipe))//Title

            this.categories.forEach(category => {
                filtered.push(...category.sort(userInputLow))
            })

            return this.filteredList = new Set(filtered)
        }


        console.log('liste fournit')

        list.forEach(recipe => recipe.name.toLowerCase().indexOf(userInputLow) !== -1 && filtered.push(recipe))//Title

        this.categories.forEach(category => {
            filtered.push(...category.sort(userInputLow, list))
        })

        if (!filtered.length) { //Si on ne trouve aucune occurence on garde la liste filtrée précédente
            const prevFiltered = this.filteredList
            this.filteredList = new Set(filtered)
            this.actualize()
            this.actualizeFilters()
            this.filteredList = new Set(prevFiltered)
            return 'back'
        }

        this.filteredList = new Set(filtered)


    }

}