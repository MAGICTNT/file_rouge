
const body = document.querySelector("body");
let i;


// ==================== Thème Sombre ====================

// ----- Charger Thème déjà stocké au démaragge -----

let theme = localStorage.getItem("theme") || "light"; // theme = "light" si rien n'est encore stocké
body.classList.add(theme); // Charger thème au démarrage


// ----- Changer Thème au clic -----

/**
 * Changer thème
 */
function changeTheme() {
    body.classList.remove(theme);

    theme = (theme === "dark") ? "light" : "dark"; // Condition ternaire
    body.classList.add(theme);
    localStorage.setItem("theme", theme);
}


const btnDark = document.getElementById("btn_dark");
if (btnDark) {
    btnDark.addEventListener("click", changeTheme); // Change le thème au clic
}


// ==================== Menu Burger ====================

const openMenuburger = document.getElementById("open_menuburger");
const myOverlay = document.getElementById("my_overlay");

function functBurger() {
    if (body.classList.contains("menu-active")) {
        body.classList.remove("menu-active");
    }
    else {
        body.classList.add("menu-active");
    }

    // body.classList.contains("menu-active") ? body.classList.remove("menu-active") : body.classList.add("menu-active"); // Condition ternaire, pareil que ci-dessus
}

if (openMenuburger) {
    openMenuburger.addEventListener("click", functBurger);
}

if (myOverlay) {
    // Fermer en cliquant partout ailleurs :
    body.addEventListener("click", function (e) {
        if (e.target === myOverlay) {
            body.classList.remove("menu-active");
        }
    });
}



// ==================== Sous-menu actif (mobile) ====================

// Sur mobile, au lieu de hover pour faire apparaitre le sous-menu, on va utiliser le clic. Au clic, on ajoute une class :

function activeSubMenu() {

    if (this.parentNode.parentNode.classList.contains("active")) {
        this.parentNode.parentNode.classList.remove("active");
    }
    else {
        this.parentNode.parentNode.classList.add("active");
    }

}

// document.querySelector(".open-submenu").addEventListener("click", activeSubMenu); // Si un seul

const openSubmenus = document.querySelectorAll(".open-submenu");
for (i = 0; i < openSubmenus.length; i++) {
    openSubmenus[i].addEventListener("click", activeSubMenu);
}



// ==================== Connexion Modal ====================

const connectModal = document.getElementById("connect-modal");

const openConnect = document.querySelectorAll(".open-connect");
const closeConnect = document.querySelector(".close-connect");

if (connectModal) { // <- Une condition qui ne sert qu'à vérifier que ces éléments sont présents sur une page (sinon le script bloque les pages où il n'y a pas ces éléments)

    // On fait une boucle parce qu'il y a plusieurs boutons "Ouvrir"
    for (i = 0; i < openConnect.length; i++) {
        openConnect[i].addEventListener("click", function () {
            body.classList.add("modal-connect-actif");
        });
    }

    closeConnect.addEventListener("click", function () {
        body.classList.remove("modal-connect-actif");
    });

    // Fermer en cliquant partout ailleurs :
    body.addEventListener("click", function (e) {
        if (e.target === connectModal) {
            body.classList.remove("modal-connect-actif");
        }
    });
}



// ==================== Search ====================

const searchContainer = document.querySelector(".search-container");

const search = document.getElementById("search");
const closeSearch = document.querySelector(".close-search");

if (searchContainer) {

    search.addEventListener("click", function () {
        body.classList.add("popup-search-actif");
        document.getElementById("recherche").focus(); // Focus sur ce champ dès l'ouverture du modal
    });

    closeSearch.addEventListener("click", function () {
        body.classList.remove("popup-search-actif");
    });

    // Fermer en cliquant partout ailleurs :
    body.addEventListener("click", function (e) {
        if (e.target === searchContainer) {
            body.classList.remove("popup-search-actif");
        }
    });

}



// ==================== Bouton Menu PKMN : ====================

const btnMenuPkmn = document.getElementById("btn_pkmn_menu");
if (btnMenuPkmn) {

    btnMenuPkmn.addEventListener("click", function () {
        body.classList.add("menu-pkmn-active");
    });

    const closeMenuPkmn = document.getElementById("close_menu_pkmn");
    closeMenuPkmn.addEventListener("click", function () {
        body.classList.remove("menu-pkmn-active");
    });

}



// ==================== Menu scroll & To Top ====================

const toTop = document.querySelector(".totop");

if (toTop) {

    // let lastScrollTop = 0;
    let st;

    function buttonTop() {

        // st = document.documentElement.scrollTop || window.pageYOffset; // window.pageYOffset c'est pour la compatibilité IE/Edge
        st = document.documentElement.scrollTop || document.body.scrollTop; // document.body.scrollTop c'est aussi pour la compatibilité IE/Edge

        // console.log(st);

        // ----- Menu scroll -----

        // if ((st > lastScrollTop) || (st < 400)) {
        //     document.querySelector(".header").classList.remove("fixed"); // Scroll vers le bas de page ou scrollTop<400
        // }
        // else {
        //     document.querySelector(".header").classList.add("fixed"); // Scroll vers le haut de page
        // }
        // lastScrollTop = st;
        
        // ----- Bouton To Top -----

        if (st >= 500) {
            toTop.classList.add("block");
        }
        else {
            toTop.classList.remove("block");
        }

        if (btnMenuPkmn) { /* Seulement pour les pages où btnMenuPkmn existe, sinon erreur */
            if (st > 90) {
                btnMenuPkmn.classList.add("menu-float");
            }
            else {
                btnMenuPkmn.classList.remove("menu-float");
            }
        }

    }

    // window.addEventListener("scroll", buttonTop); // window.addEventListener() ne marche pas sur Safari
    document.addEventListener("scroll", buttonTop);


    // ----- To Top -----

    toTop.addEventListener("click", function () {
        window.scrollTo(0, 0); // Retour en haut (mettre scroll-behavior:smooth dans le css pour un défilement doux). Pour aller en bas : window.scrollTo(0, document.body.scrollHeight);
        // document.documentElement.scrollTop = 0; // Retour en haut (autre méthode)
    });

}



// ==================== Image modal ====================

const containerImgModal = document.getElementById("container_img_modal");
const imgOpenModal = document.querySelectorAll(".img-open-modal img");
const imgCloseModal = document.getElementById("img_close_modal");

function openImgModal() {
    containerImgModal.style.display = "block";

    // console.log(this.src)
    document.getElementById("img_modal").src = this.src.replace("-min",""); // Recup src de l'image cliquée et l'insère dans id="img_modal". On enlève les éventuels "-min" pour l'image agrandie
    document.getElementById("img_modal_legend").innerHTML = this.alt; // Recup alt de l'image cliquée et l'insère dans id="img_modal_legend"
}

function closeImgModal() {
    containerImgModal.style.display = "none";
}

// ----- Ouvrir modal -----
if (imgOpenModal) { /* On vérifie que imgOpenModal existe, sinon bug sur les pages où il n'existe pas */
    for (i = 0; i < imgOpenModal.length; i++) {
        imgOpenModal[i].addEventListener("click", openImgModal);
    }
}

// ----- Fermer modal -----
if (imgCloseModal) {
    imgCloseModal.addEventListener("click", closeImgModal);
}

// ----- Fermer modal en cliquant partout ailleurs -----
if (containerImgModal) {
    body.addEventListener("click", function (e) {
        if (e.target === containerImgModal) {
            containerImgModal.style.display = "none";
        }
    });
}


// ==================== Editer commentaire ====================

const commentEdit = document.querySelectorAll(".comment_edit");

if (commentEdit) {
    for (i = 0; i < commentEdit.length; i++) {
        commentEdit[i].addEventListener("click", function () {
            this.parentNode.parentNode.parentNode.classList.add("show");
        });
    }
}


// ==================== Confirmation suppression ====================

const confirmDelete = document.querySelectorAll(".confirm_delete");

if (confirmDelete) {
    for (i = 0; i < confirmDelete.length; i++) {
        confirmDelete[i].addEventListener("click", function (e) {
            if (window.confirm('Voulez-vous vraiment supprimer ?')) {
                return true;
            }
            else {
                e.preventDefault();
                return false;
            }
        });
    }
}


// ==================== Profil ====================

const profilDrop = document.getElementById("profil-drop");
const profilOverlay = document.querySelector(".profil-overlay"); // Une div invisible qui nous sert à fermer le profil quand on clique dessus

if (profilDrop) {
    // ----- Ouvrir/Fermer profil -----
    profilDrop.addEventListener("click", function () {
        // this.parentNode.classList.toggle("open"); // toggle réunit add et remove

        if (this.parentNode.classList.contains("open")) {
            this.parentNode.classList.remove("open");
        }
        else {
            this.parentNode.classList.add("open");
        }
    });

    // ----- fermer le profil en cliquant ailleurs -----
    profilOverlay.addEventListener("click", function () {
        this.parentNode.classList.remove("open");
    });
    
}


// ==================== Accordion ====================

const accordion = document.getElementsByClassName("accordion");

if (accordion) {
    for (i = 0; i < accordion.length; i++) {

        accordion[i].addEventListener("click", function () {

            this.classList.toggle("active");

            let panel = this.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            }
            else {
                panel.style.maxHeight = panel.scrollHeight + "px"; // scrollHeight est une mesure de la hauteur du contenu d'un élément qui inclut le contenu débordant et non visible à l'écran
            }

        });

    }
}


// ==================== Spoiler ====================

const spoil = document.getElementsByClassName("spoil");
if (spoil) {

    for (i = 0; i < spoil.length; i++) {

        spoil[i].innerHTML = '<div class="hidden">' + spoil[i].innerHTML + '</div><div class="spoil-clic">Voir spoil</div>';


        spoil[i].addEventListener("click", function () {

            if (this.classList.contains("show")) {
                this.classList.remove("show");

                this.querySelector(".spoil-clic").innerHTML = 'Voir spoil';
            }
            else {
                this.classList.add("show");

                this.querySelector(".spoil-clic").innerHTML = '';
            }

        });

    }

}

/*
Pour utiliser ce script, mettre ceci dans le html :
<div class="spoil">Spoil ici</div>

Dans le css :
.hidden {display: none;}
.show .hidden {display: block;}
*/



// ==================== Changer bloc (Sondage) ====================

const blockChangeItem = document.querySelectorAll(".block-change > div");
const change = document.querySelectorAll(".change");

if (blockChangeItem) {
    for (i = 0; i < change.length; i++) {
        change[i].addEventListener("click", function () {
            blockChangeItem[0].classList.toggle("active");
            blockChangeItem[1].classList.toggle("active");
        });
    }
}


// ==================== Afficher plus de texte ====================

const showMores = document.querySelectorAll(".show-more");

if (showMores) { /* On vérifie que les class="show-more" existent, sinon bug si elles ne sont pas sur cette page */

    function seeMore() {

        if (this.parentNode.classList.contains("less")) {
            this.parentNode.classList.remove("less");
            this.innerHTML = "Afficher -";
        }
        else {
            this.parentNode.classList.add("less");
            this.innerHTML = "Afficher +";
        }

    }


    for (i = 0; i < showMores.length; i++) {

        /* Des div sont automatiquement ajoutées autour des blocs avec la class="show-more" :

        Avant :
        <div class="show-more">Texte long très long... ... ...</div>

        Après :
        <div class="show-more less">
            <div class="semi-hidden">
                Texte très long ... ... ... caché ! 
            </div>
            <div class="opacity-progress"></div>
            <div class="show-more-btn" style="display: inline-block;">Afficher +</div>
        </div>

        Cela permet de faciliter le travail des rédacteurs, ils ont juste à mettre une class="show-more" sur les longs paragraphes qu'ils veulent cacher

        */
        showMores[i].innerHTML = '<div class="semi-hidden">' + showMores[i].innerHTML + '</div><div class="opacity-progress"></div><div class="show-more-btn">Afficher +</div>';

        let heightshowMores =  showMores[i].clientHeight; // Connaitre hauteur : clientHeight ou offsetHeight
        // console.log(heightshowMores);

        // let textMoreBtns =  showMores[i].parentNode.querySelectorAll(".show-more-btn")[0]; // Marche aussi
        let textMoreBtns = document.querySelectorAll(".show-more-btn")[i];

        let semiHidden = document.querySelectorAll(".semi-hidden");


        // Par défaut, les textes ne sont pas cachés. On caché les textes avec hauteur > 200px
        if (heightshowMores > 200) {
            semiHidden[i].parentNode.classList.add("less");
            textMoreBtns.style.display = "inline-block"; // Le bouton doit apparaître en permanent si clientHeight > 200. Il n'est donc pas possible de jouer avec la class="less" sur le parent
            textMoreBtns.addEventListener("click", seeMore);
        }

    }

}

/*
Pour utiliser ce script, mettre ceci dans le html :
<div class="show-more">Très long text... ... ...</div>

Dans le css :
.show-more-btn {display: none;}
.semi-hidden {overflow-y: hidden; height: 100%;}
.less .semi-hidden {height: 200px;}
.opacity-progress {display: none;}
.less .opacity-progress {
    display: block;
    height: 200px;
    margin-top: -200px;
    background: linear-gradient(-180deg, rgba(255,255,255,0), rgba(255,255,255,1));
    position: relative;
}
*/


// ==================== Lazy Load ====================

var io = new IntersectionObserver(function (entries) {
    return entries.forEach(function (entry) {
        // Définir la source de l'image uniquement quand elle est dans la fenêtre :
        if (entry.isIntersecting) {
            // console.log(
            //     entry.target.innerText + " devient visible : " + entry.isIntersecting
            // )
    
            var lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src; // Définition de la source d'image à partir de données
            lazyImage.style.opacity = 1; // Pour la transition. Par défaut, opacity 0 dans le css
            io.unobserve(lazyImage); // Lorsque l'image est chargée, nous n'avons plus besoin de l'observer
        }
    });
});
  
document.querySelectorAll('.lazyload').forEach(function (element) {
    return io.observe(element);
});


// ========== Pagination : Limite (nombre d'articles à afficher) ==========

const pageLimit = document.getElementById("page_limit");

if (pageLimit) {
    pageLimit.addEventListener("change", function () {
        pageLimit.submit();
    });
}


// ==================== Convertisseur Euro-Yen ====================

const converter = document.getElementById("converter");

if (converter) {

    let result;
    let taux = Number(document.getElementById("taux").textContent); // Récup nombre dans un span ou div. On utilise Number(), car la result récupérée est de type chaîne et non de type number
    

    function convert() {

        let source = this.id;
        if (source === "yen") {
            cible = "euro";
            result = Math.round(100 * parseFloat(converter.elements[source].value) / taux) / 100;
        }
        else {
            cible = "yen";
            result = Math.round(100 * parseFloat(converter.elements[source].value) * taux) / 100;
        }

        if (isNaN(result)) {
            return false; // Evite le message NaN si on écrit n'importe quoi
        }

        converter.elements[cible].value = result; // Résultat

    }

    document.getElementById("yen").addEventListener("input", convert);
    document.getElementById("euro").addEventListener("input", convert);
    
}


// ========== Input type file : Upload fichier par glisser-déposer ==========

const imgInputFile = document.getElementById("img");
const imgInputFileContainer = document.getElementById("img_container");

if (imgInputFileContainer) {

    imgInputFileContainer.addEventListener("dragover", function (e) {
        e.preventDefault(); // Annule l'interdiction de "drop"
    });

    imgInputFileContainer.addEventListener("drop", function (e) {

        e.preventDefault();
        let file = e.dataTransfer.files; // dataTransfer contient les données glissées au cours d'un glisser-déposer. Avec eslint, utilisez ça : const { files } = e.dataTransfer;
        // console.log(file); // file[0].name permet d'obtenir le nom du fichier. file[0].size le poids
        imgInputFile.files = file; // Pour que l'upload marche ensuite en php

    });

}


// ========== Input type file images supplémentaires : ==========

function getExtension(filename) { /* Extension avec le point */
    return filename.slice(filename.lastIndexOf('.')); // slice(): Extrait une section d'une chaine. Ici, extrait à partir du dernier index de "."
}

function delExtension(filename) {
    return filename.slice(0, filename.lastIndexOf('.'));
}

function slugify(str) { /* Slugify en JS */
    str = str.trim(); // trim (Effacer espaces avant et après)
    str = str.toLowerCase(); // Tout en minuscule. Sait aussi mettre À et É en minuscules

    // Remplace accents
    const accents  = "àáâäāçéèêëîïìíôöòóōûùúü";
    const noAccent = "aaaaaceeeeiiiiooooouuuu";
    for (idx = 0; idx < accents.length; idx++) { /* Attention : si vous faites appel à la fonction slugify dans une boucle for, utilisez une autre lettre comme variable dans une boucle for */
        str = str.replace(new RegExp(accents.charAt(idx), 'g'), noAccent.charAt(idx));
    }

    str = str.replace(/[^a-z0-9 -]/g, '-') // Remplace caractères invalides par -
        .replace(/\s+/g, '-') // Remplace espace par -
        .replace(/-+/g, '-') // Remplacer multiples - par un -
        .replace(/^-+/, '') // Enlève éventuel - au début
        .replace(/-+$/, '');  // Enlève éventuel - à la fin
    
    return str;
}

const texte = document.getElementById("texte");
const inputFile = document.getElementById("images");
const inputFileContainer = document.getElementById("images_container"); // Le glisser-déposer ne marche que sur un parent
const uploadinfos = document.getElementById("uploadinfos");
let filename, filenameNoExt, filenameExt;

if (inputFile) { /* On vérifie qu'il existe */

    // ---------- Ajout fichier ----------

    inputFile.addEventListener("change", function() {

        files = inputFile.files;
        // console.log(files); // C'est un objet qui est retourné. Dans console.log, on constate que pour afficher le nom du fichier, c'est : files[0].name

        uploadinfos.innerText = ""; // Pour effacer le message "Aucun fichier selectionné". Bizarrement il n'est pas effacé tout seul

        if (files.length > 1) {
            // uploadinfos.innerText = files.length+" fichiers selectionnés"; // Si on ne veut pas afficher la liste des noms de fichiers
            for (i = 0; i < files.length; i++) {

                filename = files[i].name;
                filenameNoExt = delExtension(filename);
                filenameExt = getExtension(filename);

                uploadinfos.innerText += "["+filename+"] ";

                texte.value += '<img src="img/'+slugify(filenameNoExt)+filenameExt+'" alt="">'; // Ajout du code html de l'image dans textarea

            }
        }
        else {
            filename = files[0].name;
            filenameNoExt = delExtension(filename);
            filenameExt = getExtension(filename);

            uploadinfos.innerText = files[0].name;

            texte.value += '<img src="img/'+slugify(filenameNoExt)+filenameExt+'" alt="">'; // Ajout du code html de l'image dans textarea

        }

    });

    // ---------- Ajout fichier par glisser-déposer ----------

    inputFileContainer.addEventListener("dragover", function (e) {
        e.preventDefault(); // Annule l'interdiction de "drop"
    });

    inputFileContainer.addEventListener("drop", function (e) {

        e.preventDefault();
        files = e.dataTransfer.files; // Attention : pour le "drop", on met obligatoirement dans la variable "files", sinon l'upload ne marche pas. Avec eslint/grunt, utilisez ça : const { files } = e.dataTransfer;
        // console.log(files);

        uploadinfos.innerText = ""; // Pour effacer le message "Aucun fichier selectionné". Bizarrement il n'est pas effacé tout seul

        if (files.length > 1) {
            // uploadinfos.innerText = files.length+" fichiers selectionnés"; // Si on ne veut pas afficher la liste des noms de fichiers
            for (i = 0; i < files.length; i++) {

                filename = files[i].name;
                filenameNoExt = delExtension(filename);
                filenameExt = getExtension(filename);

                uploadinfos.innerText += "["+filename+"] ";

                texte.value += '<img src="img/'+slugify(filenameNoExt)+filenameExt+'" alt="">'; // Ajout du code html de l'image dans textarea

            }
        }
        else {
            filename = files[0].name;
            filenameNoExt = delExtension(filename);
            filenameExt = getExtension(filename);

            uploadinfos.innerText = files[0].name;

            texte.value += '<img src="img/'+slugify(filenameNoExt)+filenameExt+'" alt="">'; // Ajout du code html de l'image dans textarea

        }

        inputFile.files = files; // Pour que l'upload marche ensuite en php

    });


}


// ========== Checkbox : Tout Cocher/Décocher (Admin) ==========

const check = document.querySelectorAll(".check");
const checkall = document.getElementById("checkall");

// function cocherTout() {
//     if (checkall.checked) {
//         for (i = 0; i < check.length; i++)  {
//             check[i].checked = true; // Cocher
//         }
//     }
//     else {
//         for (i = 0; i < check.length; i++)  {
//             check[i].checked = false; // Décocher
//         }
//     }
// }

// Même chose que ci-dessus avec condition ternaire :
function cocherTout() {
    for (i = 0; i < check.length; i++)  {
        checkall.checked ? check[i].checked = true : check[i].checked = false;
    }
}

if (checkall) {
    checkall.addEventListener("click", cocherTout);
}


// ========== Auto-remplissage (Admin) ==========

// ----- Textes -----

const nom = document.getElementById("nom");
const nom_eng = document.getElementById("nom_eng");

function autofill() {
    if (nom_eng.value !== "") {
        document.getElementById("title").value = nom.value+" ("+nom_eng.value+") Strat - Stratégie et Moveset";
    }
    else {
        document.getElementById("title").value = nom.value+" Strat - Stratégie et Moveset";
    }


    if (nom_eng.value !== "") {
        document.getElementById("h1").value = nom.value+" ("+nom_eng.value+") - Stratégie";
    }
    else {
        document.getElementById("h1").value = nom.value+" - Stratégie";
    }

    document.getElementById("h2").value = nom.value+" Strat";
}

if (nom && nom_eng) {
    nom.addEventListener("keyup", autofill);
    nom_eng.addEventListener("keyup", autofill);
}

// ----- Selects (Nature - EV) -----

const nature1 = document.getElementById("nature1");
let ev1 = document.getElementById("ev1");
let ev2 = document.getElementById("ev2");
let ev3 = document.getElementById("ev3");
let ev4 = document.getElementById("ev4");
let ev5 = document.getElementById("ev5");
let ev6 = document.getElementById("ev6");
let objet = document.getElementById("objet");

function autoEV() {
    ev1.value = ev2.value = ev3.value = ev4.value = ev5.value = ev6.value = ""; // On commence par tout vider

    if ((nature1.value === "Assuré") || (nature1.value === "Malin") || (nature1.value === "Relax")) { /* Si la valeur sélectionnée est Assuré, Malin ou Relax */
        ev1.value = 252;
        ev3.value = 252;
        ev5.value = 4;
        if (objet.value === "") {objet.value = "Restes";} /* On remplit le champ Objet seulement si on n'a pas encore mis d'objet */
    }
    if ((nature1.value === "Calme") || (nature1.value === "Prudent")) {
        ev1.value = 252;
        ev5.value = 252;
        ev3.value = 4;
        if (objet.value === "") {objet.value = "Restes";}
    }
    if ((nature1.value === "Jovial") || (nature1.value === "Rigide") || (nature1.value === "Pressé") || (nature1.value === "Naïf")) {
        ev2.value = 252;
        ev6.value = 252;
        ev1.value = 4;
        if (objet.value === "") {objet.value = "Orbe Vie";}
    }
    if ((nature1.value === "Timide") || (nature1.value === "Modeste")) {
        ev4.value = 252;
        ev6.value = 252;
        ev1.value = 4;
        if (objet.value === "") {objet.value = "Orbe Vie";}
    }
    if (nature1.value === "Brave") {
        ev1.value = 252;
        ev2.value = 252;
        ev5.value = 4;
        if (objet.value === "") {objet.value = "Restes";}
    }
}

if (nature1) {
    nature1.addEventListener("change", autoEV); // En cas de sélection dans select
}


// ========== Ajout Nouveaux Champs attaques optionnelles (Admin) ==========

const selectAddField = document.querySelectorAll(".select-add-field select");

if (document.querySelector(".select-add-field")) {
    // Ajout nouveau champ si un champ est rempli :
    for (i = 0; i < selectAddField.length-1; i++) { /* On met length-1 pour éviter de cibler le dernier select */
        selectAddField[i].addEventListener("change", function() {
            if (this.value !== "") {
                this.parentElement.nextElementSibling.style.display = "inline-block"; /* parentElement c'est pareil que parentNode */
            }
        });
    }

    const attaque5 = document.getElementById("attaque5");
    const attaque6 = document.getElementById("attaque6");
    const attaque7 = document.getElementById("attaque7");
    // Au chargement, si ces cases sont déjà remplies (utile en cas d'erreur d'envoi de formulaire) :
    if (attaque5.value !== "") {
        attaque5.parentElement.style.display = "inline-block";
    }
    if (attaque6.value !== "") {
        attaque6.parentElement.style.display = "inline-block";
    }
    if (attaque7.value !== "") {
        attaque7.parentElement.style.display = "inline-block";
    }
}


// ========== BBCode ==========

let allText, startSelect, endSelect, before, after, selection, codeOut;

class BBCode {

    /**
    * @param {HTMLElement} element
    */
    constructor (element) {
        this.element = element;

        /* --- Appel aux fonctions au chargement --- */

        this.clic(); // Ecouteurs d'événements sur les boutons
    }

    /* Dans une class, il n'y aura pas de conflit si on utilise un nom de méthode (fonction) déjà utilisé dans une autre class */


    /* ----- Ajouts ----- */

    // <h1> ou <div class=""></div>
    addBBCode(tag, param) {
        codeOut = this.element.querySelector('.code-out');
        allText = codeOut.value;
        
        startSelect = codeOut.selectionStart; // selectionStart() sélectionne le début
        endSelect = codeOut.selectionEnd;
        
        before = allText.substring(0, startSelect); // substring() affiche de l'indice début à l'indice fin. Exemple : str.substring(1, 3); // Affiche entre index 1 et 3
        selection = allText.substring(startSelect, endSelect);
        after = allText.substring(endSelect, allText.length);

        if (tag === 'div' && param === null) { /* Exemple : <div><div></div></div> */
            codeOut.value = before + '<' + tag + '>\n  <div>' + selection + '</div>\n  <div></div>\n</' + tag + '>' + after;
        }
        else if (tag === 'ul' && param === null) { /* Exemple : <ul><li></li></ul> */
            codeOut.value = before + '<' + tag + '>\n  <li>' + selection + '</li>\n</' + tag + '>' + after;
        }
        else if (param === null) { /* Exemple: <strong></strong> ou <h1></h1> */
            codeOut.value = before + '<' + tag + '>' + selection + '</' + tag + '>' + after;
        }
        else { /* Exemple: <div class="b"></div> */
            codeOut.value = before + '<' + tag + ' class="' + param + '">' + selection + '</' + tag + '>' + after;
        }

        this.element.querySelector('.title').selectedIndex = "0"; // Revenir à la valeur selected par défaut après un clic dans select. selectedIndex représente l'index du premier élément sélectionné.

        codeOut.focus(); // Mettre le focus après ajout
    }

    // Symboles : “ ” •
    addSymbol(tag) {
        codeOut = this.element.querySelector('.code-out');
        allText = codeOut.value;

        startSelect = codeOut.selectionStart;
        endSelect = codeOut.selectionEnd;
        
        before = allText.substring(0, startSelect);
        selection = allText.substring(startSelect, endSelect);
        after = allText.substring(endSelect, allText.length);

        if (tag === 'quote') { /* guillemet “ ” */
            codeOut.value = before + '“' + selection + '”' + after;
        }
        else {
            codeOut.value = before + tag + after;
        }

        codeOut.focus(); // Mettre le focus après ajout
    }

    // Image ou Lien
    addBBCode2(tag, param, param2) {
        codeOut = this.element.querySelector('.code-out');
        allText = codeOut.value;
        
        startSelect = codeOut.selectionStart;
        endSelect = codeOut.selectionEnd;
        
        before = allText.substring(0, startSelect);
        selection = allText.substring(startSelect, endSelect);
        after = allText.substring(endSelect, allText.length);

        if (tag === 'img') {
            codeOut.value = before + '<' + tag + ' ' + param2 + '="' + param + '" alt="">' + after;
        }
        else {
            codeOut.value = before + '<' + tag + ' ' + param2 + '="' + param + '">' + selection + '</' + tag + '>' + after;
        }

        codeOut.focus(); // Mettre le focus après ajout
    }

    // Tab en surlignant
    keyEvent(ev) {
        switch (ev.key) {
            case "Tab":
                ev.preventDefault();
                ev.target.value = ev.target.value.substring(0, ev.target.selectionStart) + '  ' + ev.target.value.substring(ev.target.selectionStart, ev.target.value.length);
                break;
        }
    }


    /* ----- Appel aux fonctions d'ajouts ----- */

    bbCode(ev) {
        this.addBBCode(ev.target.getAttribute("data-tag"), ev.target.getAttribute("data-tag2"));
    }

    symbol(ev) {
        this.addSymbol(ev.target.getAttribute("data-tag"));
    }

    bbCodeImg() {
        codeOut = this.element.querySelector('.code-out');
        selection = codeOut.value.substring(codeOut.selectionStart, codeOut.selectionEnd);
        this.addBBCode2('img', selection, 'src');
    }

    bbCodeLink() {
        codeOut = this.element.querySelector('.code-out');
        selection = codeOut.value.substring(codeOut.selectionStart, codeOut.selectionEnd);
        this.addBBCode2('a', selection, 'href');
    }

    bbCodeTitle(ev) {
        this.addBBCode(ev.target.value, null);
    }


    /* ----- Au clic sur les boutons ----- */
    
    clic() {

        // <h1> ou <div class=""></div>
        let bbCode = this.element.querySelectorAll('.bbtag');
        for (i = 0; i < bbCode.length; i++) {
            bbCode[i].addEventListener('click', this.bbCode.bind(this));
        }

        // Symboles : “ ” •
        let bbSymbol = this.element.querySelectorAll('.bbsymbol');
        for (i = 0; i < bbSymbol.length; i++) {
            bbSymbol[i].addEventListener('click', this.symbol.bind(this)); // Dans un écouteur d'événement dans une class, on ne peut pas faire this.symbol() pour appeler la fonction. Il faut ajouter : bind(this). bind() crée une nouvelle fonction qui, lorsqu'elle est appelée, a pour contexte "this" la valeur passée en paramètre et éventuellement une suite d'arguments qui précéderont ceux fournis à l'appel de la fonction créée.
        }

        this.element.querySelector('.image').addEventListener('click', this.bbCodeImg.bind(this));

        this.element.querySelector('.link').addEventListener('click', this.bbCodeLink.bind(this));

        if (this.element.querySelector('.title')) {
            this.element.querySelector('.title').addEventListener('change', this.bbCodeTitle.bind(this));
        }

        this.element.querySelector('.code-out').addEventListener('keydown', this.keyEvent.bind(this)); // En surlignant, puis touche Tab sur le clavier

    }

}


document.addEventListener('DOMContentLoaded', function () {

    let bbkeypad1 = document.getElementById("bbkeypad1");
    let bbkeypad2 = document.getElementById("bbkeypad2");
    let bbkeypad3 = document.getElementById("bbkeypad3");
    let bbkeypad4 = document.getElementById("bbkeypad4");

    if (bbkeypad1) {
        new BBCode(bbkeypad1); // Seul défaut avec les JS orienté objet, il faut mettre new à chaque fois. Ce qui peut poser problème si leur nombre diffère sur chaque page
    }
    if (bbkeypad2) {
        new BBCode(bbkeypad2);
    }
    if (bbkeypad3) {
        new BBCode(bbkeypad3);
    }
    if (bbkeypad4) {
        new BBCode(bbkeypad4);
    }

});


// ==================== Slide ====================

const slide1 = document.getElementById("slide1");


function slider(el, nb = 2) {

    let ratio, slideIndex;
    let slide = el.querySelector(".slide");
    let slideImg = el.querySelectorAll(".slide img");
    let dots = el.getElementsByClassName("dot"); // getElementsByClassName ou querySelectorAll parce qu'il y a plusieurs éléments avec class="dot"
    if (!nb) {nb = 3;} // 3 images visibles par défaut s'il n'y a pas de 2e paramètre


    // ========== Update images et pagination ==========

    function slideGoto(n) {
        if (n > Math.ceil((slideImg.length/ratio)-1)) { slideIndex = 0 } /* Math.ceil() retourne l'entier supérieur */
        if (n < 0) { slideIndex = Math.ceil((slideImg.length/ratio)-1) }

        // console.log(slideIndex); // 0, 1 ou 2

        // Changer image :
        slide.style.transform = "translateX(-" + slideIndex * 100 + "%)"; // On utilise la technique du translateX pour changer d'images

        // Update point actif :
        el.querySelector(".dot.active").classList.remove("active"); // Enlève l'ancien point actif. On vise bêtement class="dot active"
        dots[slideIndex].classList.add("active"); // Affiche le nouveau point actif
    }


    // ========== Au clic sur les flèches ==========

    function slidePrev() {
        slideGoto(slideIndex -= 1); // slideIndex-=1 équivaut à slideIndex-- pour la norme ESLint. Appel à la fonction pour mettre à jour l'image et le point actif
    }

    function slideNext() {
        slideGoto(slideIndex += 1); // slideIndex+=1 équivaut à slideIndex++ pour la norme ESLint. Appel à la fonction pour mettre à jour l'image et le point actif
    }

    el.querySelector(".slide-left").addEventListener("click", slidePrev); // Ecouteurs d'événements sur flèche gauche
    el.querySelector(".slide-right").addEventListener("click", slideNext); // Ecouteurs d'événements sur flèche droite


    // ========== Auto (Mettre ci-dessous en commentaire si on ne veut pas) ==========

    setInterval(slideNext, 9000); // Appel à la fonction slideNext() toutes x millisecondes dès le chargement


    // ========== Au clic sur les points ==========

    /* Pour savoir sur quel point on a cliqué */
    function currentSlide(e) {
        slideIndex = parseInt(e.target.getAttribute("data-target"), 10); // Recup du numéro d'index au clic. "data-target" qu'on récupère dans le html est une chaîne. parseInt() la convertit en nombre entier

        slideGoto(slideIndex); // Appel à la fonction pour mettre à jour l'image et le point actif
    }

    /* Mettre écouteurs d'événements sur les points */
    function eventDot() { /* Fonction appelée dans la fonction onWindowResize(), qui est appelée au chargement de la page */
        for (i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", currentSlide);
        }
    }


    // ========== Glisser au doigt sur écran tactile ==========

    let startX = 0;
    let endX = 0;

    function dragEnd(e) {
        // console.log(e.type); // 💡 "touchend" si tactile. "mouseup" si souris.

        // if (e.type === "touchend") {
        //     endX = e.changedTouches[0].screenX;
        // }
        // else if (e.type === "mouseup") {
        //     endX = e.screenX;
        // }
        endX = (e.type === "touchend") ? e.changedTouches[0].screenX : e.screenX; // Marche aussi. Plus court avec condition ternaire

        // Ignore les petits mouvements :
        let diff = startX / endX;
        // console.log(diff);
        if (diff > 0.97 && diff < 1.03) {
            return; // Met fin à la fonction
        }

        if (endX < startX) {
            slideNext(); // Appel à cette fonction
        }
        
        else if (endX > startX) {
            slidePrev(); // Appel à cette fonction
        }
    }

    function dragStart(e) {
        // console.log(e.type); // 💡 "touchstart" si tactile. "mousedown" si souris.

        if (e.type === "touchstart") {
            // startX = e.touches[0].screenX; // Marche aussi
            startX = e.changedTouches[0].screenX;
        }
        else if (e.type === "mousedown") {
            e.preventDefault(); // Annule l'interdiction de drag. Attention ⚠ : rend les liens incliquables sur écrans tactiles. Ne pas mettre pour écrans tactiles !

            startX = e.screenX;
        }

        slide.addEventListener("touchend", dragEnd);
        slide.addEventListener("mouseup", dragEnd);
    }

    slide.addEventListener("touchstart", dragStart); // Quand on touche l'écran tactile
    slide.addEventListener("mousedown", dragStart); // Quand on clique
    

    // ========== Redimensionnement de la fenêtre et création d'éléments ==========

    let maxx = window.matchMedia("(max-width: 800px)"); // Largeur qui déclenche le changement d'état

    function onWindowResize() {
        if (maxx.matches) { // Si Media Querie correspond
            ratio = 1; // Mobile
        }
        else {
            ratio = nb; // Bureau
        }

        /* --- Nombre d'images visibles --- */

        let items = el.querySelectorAll(".slide > div");
        for (i = 0; i < items.length; i+=1) {
            items[i].style.width = (100/ratio)+"%"; // Il n'est pas possible d'appliquer style sur plusieurs éléments en JS en même temps, on fait donc une boucle
        }

        /* --- Suppresion d'éventuels anciens éléments avant la création d'éléments (points) --- */

        const dotContainer = el.querySelector(".dot-container");
        while (dotContainer.hasChildNodes()) {
            dotContainer.removeChild(dotContainer.firstChild);
        }

        /* --- Création d'éléments (points) ---

        On a : <div class="dot-container"></div>

        On veut obtenir :
        <div class="dot-container">
            <span class="dot active" data-target="0"></span>
            <span class="dot" data-target="1"></span>
            <span class="dot" data-target="2"></span>
            <span class="dot" data-target="3"></span>
            <span class="dot" data-target="4"></span>
        </div>
        */

        // console.log("Nombre de pages : " + slideImg.length/ratio);

        for (i = 0; i < slideImg.length/ratio; i++) {
            var node = document.createElement("span"); // On crée un élément <span>
            if (i === 0) {node.setAttribute("class", "dot active");} else {node.setAttribute('class', 'dot');} // On lui donne la class="dot"
            node.setAttribute("data-target", i); // On lui donne l'attribut data-target="i"
            el.querySelector(".dot-container").appendChild(node); // On colle dans <div class="dot-container"> comme un enfant                   
        }

        slideIndex = 0; // Initialisation de l'image au chargement et au changement d'état. Image 1 par défaut
        slideGoto(slideIndex);

        eventDot(); // Appel à cette fonction au chargement
    }


    onWindowResize(); // Appel à la fonction au chargement
    maxx.addEventListener("change", onWindowResize); // Ecouteur d'événement sur changement d'état

}


if (slide1) {
    slider(slide1, 3); // Appel à la fonction slider() au chargement avec paramètre slide1 et nb d'images visibles
}



// ==================== Mini Tchat 😼 - Sur page web externe ====================

// Sur une page externe, pas de rafraichissement automatique. On récupère les derniers messages une fois au chargement. Ensuite on récupère les nouveaux messages uniquement si on envoie un nouveau message. Cela permet de mettre le tchat dans un petit bloc sur toutes les pages web sans ralentir le serveur


/**
 * Fonction pour vérifier si un message contient un mot interdit
 */
function contientGrosMot(message) {
    const interdits = ["img src", "<video", "http", "www."];
    message = message.toLowerCase(); // Convertir en minuscules pour la comparaison insensible à la casse

    for (i = 0; i < interdits.length; i++) {
        if (message.includes(interdits[i])) {
            return true; // Le message contient un mot interdit
        }
    }

    return false; // Aucun mot interdit trouvé dans le message
}


// ----- Récupérer et Afficher le JSON des messages -----

/**
 * Récupérer et Afficher le JSON des messages
 */
function getMessagesAjaxExterne() {
    // On utilise Ajax pour récupérer la Chaine JSON envoyée depuis la page salon-post-get.php. On convertit la "Chaine JSON" en "Objet JS". On affiche ces données en HTML

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../../chat/salon-post-get.php"); // 1. On ouvre la page salon-post-get.php 💡 Ajax est utilisé pour faire correspondance entre le JS de la page salon.php et le PHP sur la page salon-post-get.php.

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            // console.log(this.responseText); // Test pour voir ce qu'on récupère
            /* Affiche une Chaine JSON:
            [
                {"id":"41","username":"Moi","message":"Oui ça va","date":"2021-10-12 14:04:39"},
                {"id":"40","username":"Moi","message":"Ca va ?","date":"2021-10-12 14:04:38"}
            ]
            */

            // console.log(JSON.parse(this.responseText)); // JSON.parse() convertit la Chaîne JSON en Objet JS. Test pour voir ce qu'on récupère
            /* Affiche un Objet JS:
            [
                {
                    "id": "41",
                    "username": "Moi",
                    "message": "Oui ça va",
                    "date": "2021-10-12 14:04:39"
                },
                {
                    "id": "40",
                    "username": "Moi",
                    "message": "Ca va ?",
                    "date": "2021-10-12 14:04:38"
                }
            ]
            */

            let objet = JSON.parse(this.responseText); // 2. On récupère les données de la page salon-post-get.php. On convertit la "Chaine JSON" en "Objet JS" avec JSON.parse() pour pouvoir utiliser sur une page web

            // Filtrer les messages qui contiennent certains mots
            let messagesFiltres = objet.filter(function(para) {
                return !contientGrosMot(para.message);
            });

            // Avec boucle map() :
            let mydiv = messagesFiltres.reverse().map(function (para) { /* Boucle pour insérer tous les messages. On affiche le plus récent en dernier grâce à reverse() */
                return `
                    <div>
                        <span class="blue b">${para.username}</span> :
                        <span>${para.message}</span>
                    </div>
                `
            }).join(''); // reverse() inverse l'ordre des éléments dans un tableau. substring() extrait la sous-chaîne de la chaîne de caractères entre les positions debut et fin. join() convertit un tableau en chaine de caractères

            document.getElementById("outmessages").innerHTML = mydiv; // 4. On insère le contenu HTML créé précédemment
        }
    }

    xhttp.send(); // 3. On envoie la requête
}


// ----- Envoyer nouveau message et rafraichir messages -----

const tchatFormExterne = document.getElementById("tchat_form_externe");

/**
 * Envoyer nouveau message et rafraichir messages
 */
function postMessageAjaxExterne(e) {
    e.preventDefault(); // On bloque le POST par html, car on va envoyer POST par JS-Ajax. Cela évite la page de se recharger après envoi de formulaire

    let data = new FormData(tchatFormExterne); // 1. Récupère les données du formulaire automatiquement avec name="" (message par exemple)

    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', '../../chat/salon-post-get.php'); // 2. Envoie sur cette page. 💡 Ajax est utilisé pour faire correspondance entre le JS de la page salon.php et le PHP sur la page salon-post-get.php

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            document.getElementById("message").value = ""; // On vide le champ de message
            getMessagesAjaxExterne(); // Appel à la fonction pour mettre à jour l'affichage des messages

        }
    }

    xhttp.send(data); // Avec POST, send() peut prendre un paramètre
}

// On place un écouteur d'évenement au "submit" sur le formulaire :
if (tchatFormExterne) {
    tchatFormExterne.addEventListener("submit", postMessageAjaxExterne);
}


const minichat = document.getElementById("minichat");
if (minichat) {
    getMessagesAjaxExterne();
}


// ==================== Forum (Utilisation d'Ajax) ====================

const lock = document.getElementById("lock");
const pushpin = document.getElementById("pushpin");

function setForumLock() {
    let idTopic = this.getAttribute("data-id"); // 💡 1. Récupère une donnée au clic : 1, 2, 3 ou 4
    const csrfToken = this.parentNode.getAttribute('data-csrf-token'); // Récupérer le jeton CSRF. Comme il n'y a pas de formulaire, on le met dans l'attribut "data-csrf-token"

    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "forum-lock-get.php?id="+idTopic+"&csrf_token="+csrfToken); // 💡 2. On envoie la donnée id=1, id=2, id=3 ou id=4 par GET vers cette page avec JS/Ajax sans recharger. 💡 Ajax est utilisé pour faire correspondance entre le JS de la page actuelle et le PHP sur la page data

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) { // 💡 3. On recoit les données de l'autre page php comme réponse

            // console.log(this.responseText); // Récupère une Chaine JSON: {"isLock":1} ou {"isLock":0}
            // console.log(JSON.parse(this.responseText)); // Récupère un Objet PHP: Object {isLock:1} ou {isLock:0}

            let object = JSON.parse(this.responseText); // On récupère un objet affiché par la page php

            // On accède à l'objet : Object {"isLock:1"}
            if (object.isLock === 1) {
                lock.classList.add("locked");
                document.getElementById("lock").innerHTML = 'Verrouillé <span class="icon-lock"></span>';
            }
            else if (object.isLock === 0) {
                lock.classList.remove("locked");
                document.getElementById("lock").innerHTML = 'Verrouiller <span class="icon-unlocked"></span>';
            }

        }
    }

    xhttp.send();
}

function setForumPin() {
    let idTopic = this.getAttribute("data-id"); // 💡 1. Récupère une donnée au clic : 1, 2, 3 ou 4
    const csrfToken = this.parentNode.getAttribute('data-csrf-token'); // Récupérer le jeton CSRF. Comme il n'y a pas de formulaire, on le met dans l'attribut "data-csrf-token"

    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "forum-pin-get.php?id="+idTopic+"&csrf_token="+csrfToken); // 💡 2. On envoie la donnée id=1, id=2, id=3 ou id=4 par GET vers cette page avec JS/Ajax sans recharger. 💡 Ajax est utilisé pour faire correspondance entre le JS de la page actuelle et le PHP sur la page data

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) { // 💡 3. On recoit les données de l'autre page php comme réponse

            // console.log(this.responseText); // Récupère une Chaine JSON: {"isPin":1} ou {"isPin":0}
            // console.log(JSON.parse(this.responseText)); // Récupère un Objet PHP: Object {isPin:1} ou {isPin:0}

            let object = JSON.parse(this.responseText); // On récupère un objet affiché par la page php

            // On accède à l'objet : Object {"isPin:1"}
            if (object.isPin === 1) {
                pushpin.classList.add("pinned");
                document.getElementById("pushpin").innerHTML = 'Epinglé <span class="icon-pushpin"></span>';
            }
            else if (object.isPin === 0) {
                pushpin.classList.remove("pinned");
                document.getElementById("pushpin").innerHTML = 'Epingler <span class="icon-pushpin"></span>';
            }

        }
    }

    xhttp.send();
}

if (lock) {
    lock.addEventListener("click", setForumLock); // Appel à cette fonction au clic
}
if (pushpin) {
    pushpin.addEventListener("click", setForumPin); // Appel à cette fonction au clic
}