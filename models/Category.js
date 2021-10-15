

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

        const filterInput = document.querySelector(`#${this.type} .filter_search input`)
        const filterList = document.querySelector(`#${this.type} .filter_list`)
        const arrow = document.querySelector(`#${this.type} .filter_search i`)


        filterInput.addEventListener('focus', () => { //On écoute la sélection de l'input
            filterList.classList.replace('hidden', 'visible')
            arrow.innerHTML = 'expand_less'


            filterInput.addEventListener('input', (e) => { //On écoute les changements sur l'input

                if (!this.results.filteredList.size) {
                    this.filtered = [...this.all].filter(item => item.indexOf(e.target.value) !== -1)
                } else {
                    this.filtered = [...this.collect()].filter(item => item.indexOf(e.target.value) !== -1)
                }

                this.display(this.render(this.filtered))
                this.listenForSelectTag()
            })

            filterList.addEventListener('mouseleave', () => {
                filterList.classList.replace('visible', 'hidden')
                arrow.innerHTML = 'expand_more'
                document.activeElement.blur()
            })


        })
    }

    listenForSelectTag() {
        document.querySelectorAll(`#${this.type} .filter_list li`)
            .forEach(item => item.addEventListener('click', () => {
                this.createTag(item.innerHTML)
            }))
    }

    listenForRemoveTag(tag) {
        document.querySelector(`.tag [data-tag="${tag}"]`).addEventListener('click', (e) => {
            this.removeTag(tag)
        })
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