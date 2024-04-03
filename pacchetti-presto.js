
//navbar da desktop
let navbar = document.querySelector(".navbar");
let navbar_icon = document.querySelector("#navbar_icon");


var w = window.innerWidth; //catturati la larghezza del dispositivo

window.addEventListener("scroll", ()=>{
console.log(window.scrollY);
})


window.addEventListener("scroll", ()=>{
    if (w>=992) {
        if (window.scrollY >= 100 && window.scrollY < 385) {
            navbar.classList.add("navbar_scrolled");
            navbar_icon.classList.remove("scrolled_navbar_icon");
            navbar.classList.remove("navbar-dark");
        } else if (window.scrollY >= 385) {
            navbar.classList.add("navbar_scrolled_more");
            navbar_icon.classList.add("scrolled_navbar_icon");
            navbar.classList.remove("navbar_scrolled");
        } else {
            navbar.classList.remove("navbar_scrolled");
            navbar.classList.remove("navbar_scrolled_more");
            navbar_icon.classList.remove("scrolled_navbar_icon");
            navbar.classList.add("navbar-dark");
        }
    } else {
        if (window.scrollY >= 363) {
            navbar.classList.remove("navbar-dark");
            navbar.classList.add("navbar_scrolled_more");
            navbar_icon.classList.add("scrolled_navbar_icon");
            navbar.classList.remove("navbar_scrolled");
        } else {
            navbar.classList.remove("navbar-dark");
            navbar.classList.remove("navbar_scrolled");
            navbar.classList.remove("navbar_scrolled_more");
            navbar_icon.classList.remove("scrolled_navbar_icon");
        }
    }

    })

//navbar da desktop

//navbar da mobile
let navbarToggledMy = document.querySelector("#navbar_toggled_my");
let navbarTogglerId = document.querySelector("#navbar_toggler_id");
let filtriPacchetti = document.querySelector("#filtriPacchetti");


let checkAriaExpanded = false;
function toggleMobileNavColor() {
    if (checkAriaExpanded == false) {
        navbarToggledMy.classList.add("navbar_mobile_toggled");        
        checkAriaExpanded = true;
    } else {
        checkAriaExpanded = false;
        navbarToggledMy.classList.remove("navbar_mobile_toggled");
    }
}

navbarTogglerId.addEventListener("click", ()=>{
    
    toggleMobileNavColor();
})

//navbar da mobile




fetch("./pacchetti.json").then( (response)=> response.json()).then( (data)=> { 
    
    // CONTENITORE E COSTRUTTORE TUTTI I PACCHETTI 
    let pacchettiWrapper = document.querySelector("#pacchettiWrapper");
    
    function createPacchetti(array) {
        
        pacchettiWrapper.innerHTML="";
        
        array.forEach(pacchett => {
            let pacchetto=document.createElement("div");
            pacchetto.classList.add("col-12", "col-md-6","col-lg-4", "d-flex", "justify-content-center");
            pacchetto.innerHTML =`<div class="card my-5 position-relative " style="width: 18rem;">
            ${pacchett.lastMinute ? `<span class="position-absolute z-1 top-0 start-50 translate-middle badge rounded-pill bg_colorAcc">
            LAST MINUTE!
            </span>` : ""}
            <div class="overflow-hidden">
            <img src="https://picsum.photos/200" class="my_card_img card-img-top" alt="...">
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
            <div>
            <h5 class="card-title h4 mb-3">${pacchett.citta} </h5>
            <div class="card_info p-3 p-md-2">
            <p class="card-text mb-2 text-start">Quante persone: ${pacchett.quantePersone}</p>
            <p class="card-text mb-2 text-start">Quante notti: ${pacchett.quanteNotti}</p>
            <p class="card-text mb-2 text-start">Costo: <span class="costo">${pacchett.costo}</span></p>
            </div>
            </div>
            <div class="mt-3 d-flex justify-content-between">
            <i class="my_heart bi bi-heart fs-4"></i>
            <a href="#" class="btn btn-accent">Scopri!</a>
            </div>
            </div>
            </div>`
            pacchettiWrapper.appendChild(pacchetto);
            
        });
        
    }
    createPacchetti(data);   
    // FINE CONTENITORE E COSTRUTTORE TUTTI I FILTRI  


    // SEZIONE FILTRO QUANTE NOTTI  (<=2, 3, 4, 5+)

    //arrays in cui distribuire pacchetti in base a quante notti
    let nottiWrapper= document.querySelector("#nottiWrapper");
    
    let dueNotti=[]
    let treNotti=[]
    let quattroNotti=[]
    let cinqueOPiuNotti=[]

    function popolaArrayFiltroNotti(array) {
        
        array.forEach(pacchett => {
            if (pacchett.quanteNotti >0 && pacchett.quanteNotti<=2) {
                dueNotti.push(pacchett);
            } else if (pacchett.quanteNotti==3){
                treNotti.push(pacchett);
            } else if (pacchett.quanteNotti==4){
                quattroNotti.push(pacchett);
            } else {
                cinqueOPiuNotti.push(pacchett);
            }
        });
    }
    popolaArrayFiltroNotti(data);



    //crea i radio buttons nell'html (potevi farlo direttamente nell'html visto che non sono dinamici e astratti)
    function createNottiRadioButtons() {

        let buttonDueNotti=document.createElement("div");
        buttonDueNotti.classList.add("form-check");
        buttonDueNotti.innerHTML=  `<input class="form-check-input" type="radio" name="flexRadioDefault" id="idDueNotti">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Fino a 2 notti
                                    </label>
                                `
        nottiWrapper.appendChild(buttonDueNotti);

        let buttonTreNotti=document.createElement("div");
        buttonTreNotti.classList.add("form-check");
        buttonTreNotti.innerHTML=  `<input class="form-check-input" type="radio" name="flexRadioDefault" id="idTreNotti">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        3 notti
                                    </label>
                                `
        nottiWrapper.appendChild(buttonTreNotti);

        let buttonQuattroNotti=document.createElement("div");
        buttonQuattroNotti.classList.add("form-check");
        buttonQuattroNotti.innerHTML=  `<input class="form-check-input" type="radio" name="flexRadioDefault" id="idQuattroNotti">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        4 notti
                                    </label>
                                `
        nottiWrapper.appendChild(buttonQuattroNotti);

        let buttonCinqueOPiuNotti=document.createElement("div");
        buttonCinqueOPiuNotti.classList.add("form-check");
        buttonCinqueOPiuNotti.innerHTML=  `<input class="form-check-input" type="radio" name="flexRadioDefault" id="idCinqueOPiuNotti">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        5 o più notti
                                    </label>
                                `
        nottiWrapper.appendChild(buttonCinqueOPiuNotti);
    }
    createNottiRadioButtons();
    
    //funzione che effettivamente filtra i pacchetti e stampa solo quelli filtrati
    let tuttiButtonsFiltriNotti = document.querySelectorAll(".form-check-input"); 
    let variabileNotti =0;

    function quanteNotti() {
    
        tuttiButtonsFiltriNotti.forEach( (tasto)=>{
            tasto.addEventListener("click", ()=>{
                if (tasto.id == "idDueNotti") {
                    variabileNotti = 2;
                    comboFilter();
                } else if (tasto.id == "idTreNotti") {
                    variabileNotti = 3;
                    comboFilter();
                } else if (tasto.id == "idQuattroNotti") {
                        variabileNotti = 4;
                    comboFilter();
                } else if (tasto.id == "idCinqueOPiuNotti") {
                        variabileNotti = 5;
                    comboFilter();
                } else {
                        variabileNotti = 0;
                    comboFilter();
                }
            } )
        })
        
    }
    quanteNotti()

    function filterByNotti(a) {
        if(a==2){
            return dueNotti;
        } else if (a ==3){
            return treNotti;
        } else if (a ==4){
            return quattroNotti;
        } else if (a ==5){
            return cinqueOPiuNotti;
        } else {
            return data;
        }
    }

        // FINE SEZIONE FILTRO QUANTE NOTTI  (<=2, 3, 4, 5+)


    // SEZIONE FILTRO COSTI
    let costo_input = document.querySelector("#costo_input");
    let current_value = document.querySelector("#current_value");

    //trova current max e min prices e impostali come attributi di costo_input
    function setRangeBarPrices(array) {
        let prezzi = array.map( (pacchett)=>pacchett.costo )
        let max = Math.max(...prezzi);       
        let min = Math.min(...prezzi);   
        costo_input.max = max;
        costo_input.min = min;
        costo_input.value = max;

    }
    setRangeBarPrices(data);

    //filtra in base ai prezzi 
    function filterByCosto(array) {
        let filteredByCosto = array.filter( (array) => array.costo<=costo_input.value );
        current_value.innerHTML=`${costo_input.value} €`;
        return filteredByCosto;
    }
    
    
    costo_input.addEventListener("input", ()=>{
        comboFilter();

    })
    // FINE SEZIONE FILTRO COSTI

    // SEZIONE FILTRO PER NOME

    let destinazione_input = document.querySelector("#destinazione_input");
    
    //filtra in base al nome
    function filterByName(array) {
        let filteredByName = array.filter( (el)=> el.citta.toLowerCase().includes(destinazione_input.value.toLowerCase()) );
        return filteredByName;
    }

    destinazione_input.addEventListener( "input", ()=>{
        comboFilter();

    } )

    // FINE SEZIONE FILTRO PER NOME

    // SEZIONE FILTRO COMBO
    
    function comboFilter() {
        let filteredByNotti = filterByNotti(variabileNotti);
        let filteredByCosto = filterByCosto(filteredByNotti);
        let filteredByName = filterByName(filteredByCosto);
        createPacchetti(filteredByName);
    }
    
        // FINE SEZIONE FILTRO COMBO



    
    // fine fetch 
} )