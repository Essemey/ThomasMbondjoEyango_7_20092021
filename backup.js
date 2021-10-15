//Main

listen() {

    console.log(this.filters)

    document.querySelector('#research_container .main_research input').addEventListener('input', (e) => {
        this.filters.forEach(filter => {

            filter.mainSearch = e.target.value


            if (filter.sortedList.length !== 0 && filter.search !== 0) { //Si on a déja commencé une recherche dans les filtres
                filter.sort(e.target.value, filter.sortedList) //Alors on filtre la liste déja filtée
                if (filter.type === 'ingredients') {
                    console.log('Begin in filter:', filter.sortedList)
                }
                filter.display(filter.render(filter.sortedList))

            } else if (filter.sortedList.length === 0 && filter.search.length !== 0 && filter.mainSearch.length !== 0) {
                filter.sort(filter.mainSearch)
                filter.sort(filter.search, filter.sortedList)
                filter.display(filter.render(filter.sortedList))
                console.log('ici la yes')

            } else { //Sinon on filtre directement sur this.all
                filter.sort(e.target.value)
                if (filter.type === 'ingredients') {
                    console.log('Begin in Main search:', filter.sortedList)
                }
                filter.display(filter.render(filter.sortedList))
            }
        })
    })
}

//Filter

sort(userInput, list) {

    if (!list || this.search.length === 0 || this.mainSearch.length === 0) {
        //Si il n'y a plus de caractères dans le champ des filtres mais qu'il y en a dans le champ main, on filtre all avec la recherche main
        if (this.mainSearch.length !== 0) {
            console.log('la')
            return this.sortedList = [...this.all].filter(item => item.indexOf(this.mainSearch) !== -1)
            //Si il n'y a plus de caractères dans le champ main mais qu'il y en a dans le champ filtre, on filtre all avec la recherche filtre
        } else if (this.search.length !== 0) {
            console.log('ici')
            return this.sortedList = [...this.all].filter(item => item.indexOf(this.search) !== -1)
        }
        this.sortedList = [...this.all].filter(item => item.indexOf(userInput) !== -1) //Utile quand les deux champs sont vides
    } else {
        this.sortedList = [...list].filter(item => item.indexOf(userInput) !== -1)
        console.log('trie sur sortedList')
    }

    if (this.type === 'ingredients') {
        console.log(this.sortedList)
        console.log(userInput.length)
    }
}
////////////////////////////////////////////////////////////////////////////////

activeListeners() {

    const filterInput = document.querySelector(`#${this.type} .filter_search input`)
    const filterList = document.querySelector(`#${this.type} .filter_list`)
    const arrow = document.querySelector(`#${this.type} .filter_search i`)


    filterInput.addEventListener('focus', () => { //On écoute la sélection de l'input
        filterList.classList.replace('hidden', 'visible')
        arrow.innerHTML = 'expand_less'

        filterInput.addEventListener('input', (e) => { //On écoute les changements sur l'input

            this.search = e.target.value
            //Si on a déja une recherche sur le champ main 
            if (this.mainSearch.length !== 0 && this.sortedList.length !== 0) {
                console.log(this.sortedList)
                this.sort(this.search, this.sortedList) //On trie directement sur la liste déja triée en amont
                console.log('already sort')
            } else {
                this.sort(this.search) //On trie la liste des items selon le champs input sur la liste this.all
            }
            this.display(this.render(this.sortedList)) //On actualise le render et l'affiche
        })

        filterInput.addEventListener('focusout', () => {
            filterList.classList.replace('visible', 'hidden')
            arrow.innerHTML = 'expand_more'
        })
    })
}




