

export default class Category {

    constructor() {
        this.all = new Set()
        this.tags = new Set()
        this.type = ''
        this.filtered = []
        this.results
    }

    createTag(tag) {
        const size = this.tags.size
        this.tags.add(tag)

        if (this.tags.size !== size) { //Si le tag n'était pas déja présent
            this.displayTag(tag)
            this.listenForRemoveTag(tag)
        }

        this.results.filter()
    }


    display(item) {
        document.querySelector(`#${this.type} .filter_list`).innerHTML = item ?? this.render()
    }

    displayTag(tag) {
        document.querySelector(`#tags .${this.type}`).insertAdjacentHTML('beforeend', this.renderTag(tag))
    }

    getResults(results) {
        this.results = results
    }


    listenInput() {

        const filterBlock = document.querySelector(`#${this.type}`)
        const filterInput = document.querySelector(`#${this.type} .filter_search input`)
        const filterList = document.querySelector(`#${this.type} .filter_list`)
        const arrow = document.querySelector(`#${this.type} .filter_search i`)


        filterInput.addEventListener('focus', () => { //On écoute la sélection de l'input
            filterList.classList.replace('hidden', 'visible')
            arrow.innerHTML = 'expand_less'
            const placeholder = filterInput.placeholder
            const fontSize = filterInput.style.fontSize
            const opacity = filterInput.style.opacity

            filterInput.placeholder = `Rechercher un ${this.placeholder}`
            filterInput.style.fontSize = '16px'
            filterInput.style.opacity = '0.5'

            this.design(this.filtered.length, true)


            filterInput.addEventListener('input', (e) => { //On écoute les changements sur l'input

                if (!this.results.filteredList.size) {
                    this.filtered = [...this.all].filter(item => item.indexOf(e.target.value) !== -1)
                } else {
                    this.filtered = [...this.collect()].filter(item => item.indexOf(e.target.value) !== -1)
                }

                this.design(this.filtered.length)
                this.display(this.render(this.filtered))
                this.listenForSelectTag()

            })

            const controller = new AbortController();
            document.addEventListener('click', (e) => {
                if (!filterList.contains(e.target) && !filterInput.contains(e.target)) {
                    filterList.classList.replace('visible', 'hidden')
                    arrow.innerHTML = 'expand_more'
                    filterInput.placeholder = placeholder
                    filterInput.style.fontSize = fontSize
                    filterInput.style.opacity = opacity
                    filterBlock.style.width = '170px'
                    controller.abort();
                }
            }, { signal: controller.signal })
        })
    }

    listenForRemoveTag(tag) {
        document.querySelector(`.tag [data-tag="${tag}"]`).addEventListener('click', (e) => {
            this.removeTag(tag)
        })
    }


    listenForSelectTag() {
        document.querySelectorAll(`#${this.type} .filter_list li`)
            .forEach(item => item.addEventListener('click', () => {
                this.createTag(item.innerHTML)
            }))
    }


    removeTag(tag) {
        document.querySelector(`.${this.type} [data-id="${tag}"]`).remove() //On retire le tag du DOM
        this.tags.delete(tag) //On retire le tag du tableau
        this.results.filter()
    }



    render(list) {
        return !list
            ? [...this.all].map(item => `<li title="${item}">${item}</li>`).join('')
            : [...list].map(item => `<li title="${item}">${item}</li>`).join('')
    }

    renderTag(tag) {
        return (
            `<div class="tag" data-id="${tag}">
                ${tag}<span data-tag="${tag}" data-category="${this.type}" class="material-icons remove">highlight_off</span>
            </div>`)
    }






}