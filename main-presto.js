
//navbar da desktop

let navbar = document.querySelector(".navbar");
let navbar_icon = document.querySelector("#navbar_icon");

var w = window.innerWidth; //catturati la larghezza del dispositivo

window.addEventListener("scroll", ()=>{
    if (w>=992) {
        if (window.scrollY >= 100 && window.scrollY < 523) {
            navbar.classList.add("navbar_scrolled");
            navbar_icon.classList.remove("scrolled_navbar_icon");
        } else if (window.scrollY >= 523) {
            navbar.classList.add("navbar_scrolled_more");
            navbar_icon.classList.add("scrolled_navbar_icon");
            navbar.classList.remove("navbar_scrolled");
        } else {
            navbar.classList.remove("navbar_scrolled");
            navbar.classList.remove("navbar_scrolled_more");
            navbar_icon.classList.remove("scrolled_navbar_icon");
        }
    } else {
        if (window.scrollY >= 480) {
            navbar.classList.add("navbar_scrolled_more");
            navbar_icon.classList.add("scrolled_navbar_icon");
            navbar.classList.remove("navbar_scrolled");
        } else {
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


//animazioni tasti



let btn_abbonati = document.querySelector("#btn_abbonati");
let btn_articoli = document.querySelector("#btn_articoli");
let btn_fan = document.querySelector("#btn_fan");


function myInterval(varId, n, speed) {
    let counter=0;
    
    let interval = setInterval(() => {
        if (counter <= n) {
            varId.innerHTML =counter;
            counter++;
        } else {
            clearInterval(interval);
        }    
    }, speed);
}



// function scrollButtons() {
    //     let check=0; //quante volte ha fatto partire le funzioni, ha fatto rollare i numeri nei tasti
    
    //     window.addEventListener("scroll", ()=>{
        //         if (window.scrollY > 400 && check==0) { //deve far partire le funzioni una volta sola
        //          myInterval(btn_abbonati, 300, 8);
        //          myInterval(btn_articoli, 900, 3);
        //          myInterval(btn_fan, 2000, 1);
        //             check++;
        //         } 
        //     })
        // }
        // scrollButtons();
        
        
        // STESSA COSA DI SOPRA MA FATTA CON INTERSECTIONOBSERVER
        let check=false; //quante volte ha fatto partire le funzioni myInterval, ha fatto rollare i numeri nei tasti
        let intersect = new IntersectionObserver ((entries)=> {
            entries.forEach( (entry)=>{
                if (entry.isIntersecting && check==false){
                    myInterval(btn_abbonati, 300, 8);
                    myInterval(btn_articoli, 900, 3);
                    myInterval(btn_fan, 2000, 1);
                    check=true;
                } 
            } )
        })
        
        intersect.observe(btn_abbonati);

        // sintassi::::
        // let intersect2 = new IntersectionObserver ((entries)=>{
        //     entries.forEach((entry)=>{
        //         cosa vuoi che succeda
        //     })
        // } )

        // intersect2.observe(IDdaOsservare)
//animazioni tasti



let arrayPacchetti =[
    {citta: "New York", costo: 550, quantePersone: 2, quanteNotti: 6, lastMinute: true},
    {citta: "Londra", costo: 350, quantePersone: 2, quanteNotti: 5, lastMinute: true},
    {citta: "Tokyo", costo: 1000, quantePersone: 2, quanteNotti: 6, lastMinute: false},
    {citta: "Pechino", costo: 700, quantePersone: 1, quanteNotti: 5, lastMinute: false},
    {citta: "Monaco di Baviera", costo: 300, quantePersone: 2, quanteNotti: 3, lastMinute: true}
];

let cardsWrapper = document.querySelector("#cardsWrapper");

arrayPacchetti.forEach( (pacchetto, i)=> {
    if (i>arrayPacchetti.length-5) {
        let card= document.createElement("div");
        card.classList.add("col-10", "col-md-6",  "col-lg-3" , "d-flex", "justify-content-center");
        card.innerHTML =`<div class="card my-5 position-relative " style="width: 18rem;">
                            ${pacchetto.lastMinute ? `<span class="position-absolute z-1 top-0 start-50 translate-middle badge rounded-pill bg_colorAcc">
                                LAST MINUTE!
                            </span>` : ""}
                            <div class="overflow-hidden">
                                <img src="https://picsum.photos/200" class="my_card_img card-img-top" alt="...">
                            </div>
                            <div class="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 class="card-title h4 mb-3">${pacchetto.citta} </h5>
                                    <div class="card_info">
                                        <p class="card-text mb-2 text-start">Quante persone: ${pacchetto.quantePersone}</p>
                                        <p class="card-text mb-2 text-start">Quante notti: ${pacchetto.quanteNotti}</p>
                                        <p class="card-text mb-2 text-start">Costo: <span class="costo">${pacchetto.costo}</span></p>
                                    </div>
                                </div>
                                <div class="mt-3 d-flex justify-content-between">
                                    <i class="my_heart bi bi-heart fs-4"></i>
                                    <a href="#" class="py-2 px-3  btn-accent">Scopri!</a>
                                </div>
                            </div>
                        </div>`
        cardsWrapper.appendChild(card);
    }
})


// js del carosello di swiper 

const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto", //se da mobile, metti una slide per view !!!!
    spaceBetween: 30,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
});


fetch("./recensioni.json").then( (response)=> response.json()).then( (data)=> { 
    
    let swiperWrapper =document.querySelector("#swiperWrapper");

    function createReceStars(quanteStelle) { //dato un  numero di stelle, mi stampa quelle stelle gialle e la differenza di 5-quelle, stelle vuote
        let receStars = [];
        let stringaStellaPiena=`<i class="bi bi-star-fill text_colorAcc"></i>`;
        let stringaStellaVuota= `<i class="bi bi-star text_colorAcc"></i>`;
        for (let i = 0; i < quanteStelle; i++) {
            receStars.push(stringaStellaPiena);
        }
        for (let i = 0; i < (5 - quanteStelle); i++) {
            receStars.push(stringaStellaVuota);
        }
        return receStars.join("");
    }
    

    function createRecensioni(array) {

        swiperWrapper.innerHTML="";
        
        array.forEach( rece=>{
       
            let starsRece = createReceStars(rece.votoRecensione);
            let mySwiperCard =document.createElement("div");
            mySwiperCard.classList.add("swiper-slide", "rounded-2", "border", "d-flex", "flex-column", "align-items-center", "justify-content-between", "p-3");
            mySwiperCard.innerHTML= `<div>
                                        <h3>${rece.titoloRecensione}</h3>
                                        <h5>${rece.nomeRecensore}</h5>
                                    </div>
                                    <div class="pt-3 d-flex flex-column justify-content-between h-100 card_info p-3">
                                        <p class="p-3 my-auto ">
                                        ${rece.corpoRecensione}
                                        </p>
                                        <div>
                                        ${starsRece}
                                        </div>
                                    </div>`;
            swiperWrapper.appendChild(mySwiperCard);
            // console.log(rece);
        } )

    }

    createRecensioni(data);









}) //fine fetch recensioni

