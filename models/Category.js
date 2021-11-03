

export default class Category {

    constructor() {
        this.all = new Set();
        this.tags = new Set();
        this.type = "";
        this.filtered = [];
        this.results;
    }

    createTag(tag) {
        const size = this.tags.size;
        this.tags.add(tag);

        if (this.tags.size !== size) { //Si le tag n'était pas déja présent
            this.displayTag(tag);
            this.listenForRemoveTag(tag);
        }

        this.results.filter();
    }


    display(item) {
        document.querySelector(`#${this.type} .filter_list`).innerHTML = item ?? this.render();
    }

    displayTag(tag) {
        document.querySelector(`#tags .${this.type}`).insertAdjacentHTML("beforeend", this.renderTag(tag));
    }

    getResults(results) {
        this.results = results;
    }


    listenInput() {

        const filterBlock = document.querySelector(`#${this.type}`);
        const filterInput = document.querySelector(`#${this.type} .filter_search input`);
        const filterList = document.querySelector(`#${this.type} .filter_list`);
        const arrow = document.querySelector(`#${this.type} .filter_search i`);


        filterInput.addEventListener("focus", () => { //On écoute la sélection de l'input
            filterList.classList.replace("hidden", "visible");
            arrow.innerHTML = "expand_less";
            const placeholder = filterInput.placeholder;
            const fontSize = filterInput.style.fontSize;
            const opacity = filterInput.style.opacity;

            filterInput.placeholder = `Rechercher un ${this.placeholder}`;
            filterInput.style.fontSize = "16px";
            filterInput.style.opacity = "0.5";

            this.design();


            filterInput.addEventListener("input", (e) => { //On écoute les changements sur l'input

                if (!this.results.filteredList.size) {
                    this.filtered = [...this.all].filter(item => item.indexOf(e.target.value) !== -1);
                } else {
                    this.filtered = [...this.collect()].filter(item => item.indexOf(e.target.value) !== -1);
                }

                this.design();
                this.display(this.render(this.filtered));
                this.listenForSelectTag();

            });

            this.resize((controller) => {
                filterList.classList.replace("visible", "hidden");
                arrow.innerHTML = "expand_more";
                filterInput.placeholder = placeholder;
                filterInput.style.fontSize = fontSize;
                filterInput.style.opacity = opacity;
                filterBlock.style.width = "170px";
                filterList.style.height = "auto";
                filterInput.blur()
                controller.abort();
            })

            const controller = new AbortController();
            document.addEventListener("click", (e) => {
                if (!filterList.contains(e.target) && !filterInput.contains(e.target)) {
                    filterList.classList.replace("visible", "hidden");
                    arrow.innerHTML = "expand_more";
                    filterInput.placeholder = placeholder;
                    filterInput.style.fontSize = fontSize;
                    filterInput.style.opacity = opacity;
                    filterBlock.style.width = "170px";
                    controller.abort();
                }
            }, { signal: controller.signal });
        });
    }

    listenForRemoveTag(tag) {
        document.querySelector(`.tag [data-tag="${tag}"]`).addEventListener("click", () => {
            this.removeTag(tag);
        });
    }


    listenForSelectTag() {
        document.querySelectorAll(`#${this.type} .filter_list li`)
            .forEach(item => item.addEventListener("click", () => {
                this.createTag(item.innerHTML);
            }));
    }


    removeTag(tag) {
        document.querySelector(`.${this.type} [data-id="${tag}"]`).remove(); //On retire le tag du DOM
        this.tags.delete(tag); //On retire le tag du tableau
        this.results.filter();
    }



    render(list) {
        return !list
            ? [...this.all].map(item => `<li title="${item}">${item}</li>`).join("")
            : [...list].map(item => `<li title="${item}">${item}</li>`).join("");
    }

    renderTag(tag) {
        return (
            `<div class="tag" data-id="${tag}">
                ${tag}<span data-tag="${tag}" data-category="${this.type}" class="material-icons remove">highlight_off</span>
            </div>`);
    }


    sort(element, list) {

        const filtered = new Set();

        if (!list) {
            //this.results.recipes.forEach(recipe => [...recipe.terms].find(item => item.toLowerCase().indexOf(element) !== -1) && filtered.add(recipe));
            this.results.recipes.forEach(recipe =>
                recipe.terms.forEach(item => item.toLowerCase().indexOf(element) !== -1 && filtered.add(recipe)));
        } else {
            list.forEach(recipe => recipe.terms.forEach(item =>
                item.toLowerCase().indexOf(element) !== -1 && filtered.add(recipe)));
        }


        return filtered;
    }

    resize(action) {
        const controller = new AbortController();
        window.addEventListener('resize', () => action(controller), { signal: controller.signal });
    }


    design() {

        const filterBlock = document.querySelector(`#${this.type}`);
        const filterInput = document.querySelector(`#${this.type} .filter_search input`);
        const filterList = document.querySelector(`#${this.type} .filter_list`);

        const viewportWidth = document.documentElement.clientWidth
        const isFocused = () => document.activeElement === filterInput ? true : false;

        if (this.type === 'ingredients') {
            if (viewportWidth >= 1440 && isFocused()) {

                filterBlock.style.width = "840px";
                filterList.style.width = "840px";
                filterList.style.height = "auto";
                return filterList.style.overflow = "hidden";
            }

            if (viewportWidth > 1008 && viewportWidth < 1440 && isFocused()) {

                filterBlock.style.width = "405px";
                filterList.style.width = "405px";
                filterList.style.height = "300px";
                return filterList.style.overflowY = "scroll";
            }


            if (viewportWidth > 980 && viewportWidth < 1008 && isFocused()) {

                filterBlock.style.width = "500px";
                filterList.style.width = "500px";
                filterList.style.height = "300px";
                return filterList.style.overflowY = "scroll";
            }


            if (viewportWidth > 840 && viewportWidth < 980 && isFocused()) {

                filterBlock.style.width = "360px";
                filterList.style.width = "360px";
                filterList.style.height = "315px";
                return filterList.style.overflowY = "scroll";
            }

            if (viewportWidth > 703 && viewportWidth < 840 && isFocused()) {

                filterBlock.style.width = "240px";
                filterList.style.width = "240px";
                filterList.style.height = "315px";
                return filterList.style.overflowY = "scroll";
            }

            if (viewportWidth > 480 && viewportWidth < 703 && isFocused()) {

                filterBlock.style.width = "80vw";
                filterList.style.width = "80vw";
                filterList.style.height = "315px";
                return filterList.style.overflowY = "scroll";
            }

            if (viewportWidth < 480 && isFocused()) {

                console.log(window.innerWidth)
                filterBlock.style.width = "71vw";
                filterList.style.width = "71vw";
                filterList.style.height = "315px";
                return filterList.style.overflowY = "scroll";
            }
        }

        if (viewportWidth > 1080 && isFocused()) {
            filterBlock.style.width = "480px";
            filterList.style.width = "480px";
            filterList.style.height = "auto";
            return filterList.style.overflow = "hidden";
        }

        if (viewportWidth > 810 && viewportWidth < 1080 && isFocused()) {
            filterBlock.style.width = "330px";
            filterList.style.width = "330px";
            filterList.style.height = "auto";
            return filterList.style.overflow = "hidden";
        }

        if (viewportWidth > 704 && viewportWidth < 810 && isFocused()) {
            filterBlock.style.width = "240px";
            filterList.style.width = "240px";
            filterList.style.height = "300px";
            return filterList.style.overflowY = "scroll";
        }

        if (viewportWidth > 470 && viewportWidth < 704 && isFocused()) {
            filterBlock.style.width = "80vw";
            filterList.style.width = "80vw";
            filterList.style.height = "auto";
            return filterList.style.overflowY = "hidden";
        }

        if (viewportWidth < 470 && isFocused()) {
            filterBlock.style.width = "70vw";
            filterList.style.width = "70vw";
            filterList.style.height = "300px";
            return filterList.style.overflowY = "scroll";
        }
    }


}