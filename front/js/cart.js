

let idProduit = localStorage.key(0);
tab = JSON.parse(localStorage.getItem(`${idProduit}`));
//console.log(tab[0].couleur);


let tableauTT = [];
let prixArticle  ;
let prixTotal = 0;//pb
let a = 0; //nbr de d'article

for (let e = 0 ; e < localStorage.length ; e++){
    //on recupe la clef (identifiant du produit) depuis le localStorage
    let idProduit = localStorage.key(e);
    
    //on recupre les elements de la clef sous format JSON (string par defaut)
    tab = JSON.parse(localStorage.getItem(`${idProduit}`));

    //Attribution des elements a des variables 
    let quanLS = tab[0].quantite; //quantSL : quantite localStorage
    let colores = tab[0].couleur;
    asd(idProduit,colores,quanLS);    
    calc(quanLS,idProduit);
    a++;

    //Enclanche l'affichage des elements du meme id mais avec des characteristiques autres ("couleur","quantite" ds le cas present) 
    if ( tab.length > 1){
	for (let i = 1 ; i < tab.length ; i++){
	    let quanLS = tab[i].quantite;
	    let colores = tab[i].couleur;
	    asd(idProduit,colores,quanLS);    
	    calc(quanLS,idProduit);
	    a++;
	}   
    }
}
afficheArticlePrix(a);

function effacerArticle(){
    console.log("asdasdasdasd");
    var removeCartItemButtons = document.getElementsByClassName("deleteItem");
console.log(removeCartItemButtons);
    for (var i = 0; i < removeCartItemButtons.length; i++){
	console.log("asdas");
	var button = removeCartItemButtons[i];
	button.addEventListener('click', function(){
	console.log('click')
	})
    /*
    button.addEventListener('click', function(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    })*/
    }
}






function afficheArticlePrix(a){
	    //a regler plus tart (prixTotal) 
    let totalQuantiteArticle = document.getElementById("totalQuantity");
    totalQuantiteArticleTxt = document.createTextNode(`${a}`);

    let totalPrixArticle = document.getElementById("totalPrice");
    totalPrixArticleTxt = document.createTextNode(`${prixTotal}`);

    totalPrixArticle.appendChild(totalPrixArticleTxt);

    totalQuantiteArticle.appendChild(totalQuantiteArticleTxt);
    totalPrixArticle.appendChild(totalPrixArticleTxt);
}


// a regler !!
function calc(quanLS,idProduit){
    fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
	.then(data => data.json())
	.then((t) => {  
	    prixArticle = t.price;
	    prixTotal += quanLS * prixArticle;
	    //fonctionne 	    
	    return prixTotal;
    });

}

function asd(idProduit,colores,quanLS){

    fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
	.then(data => data.json())
	.then((r) => {  

	    //Creation des balises qui seront afficher ds la page html

	    let section = document.getElementById("cart__items");

	    //creation de la balises article :
	    let article = document.createElement("article");
	    article.setAttribute("class", "cart__item"); 
	    article.setAttribute("data_id", `${idProduit}`); 
	    article.setAttribute("data_color", `${colores}`);


	    //creation de la balise div image :
	    let divImg = document.createElement("div");
	    divImg.setAttribute("class", "cart__item__img");


	    //creation de la balise image :
	    let img = document.createElement("img");
	    img.setAttribute("src", r.imageUrl);
	    img.setAttribute("alt", r.altTxt);

	    //creation des balises div (1) ... :
	    
	    let divItemC = document.createElement("div"); 
	    divItemC.setAttribute("class", "cart__item__content");
	    
	    let divItemConD = document.createElement("div"); 
	    divItemConD.setAttribute("class", "cart__item__content__description");
	    
	    let h2 = document.createElement("h2");
	    let h2Text = document.createTextNode(r.name);
	    
	    let pCouleur = document.createElement("p");
	    let pCouleurTxt = document.createTextNode(`${colores}`);

	    let pPrix = document.createElement("p");
	    let pPrixText = document.createTextNode(r.price +" €");

	    //creation des balises div (2) ... :

	    let divItemConS = document.createElement("div");
	    divItemConS.setAttribute("class", "cart__item__content__settings");

	    let divItemConSetQ = document.createElement("div");
	    divItemConSetQ.setAttribute("class","cart__item__content__settings__quantity"); 
	    let pQuantite = document.createElement("p");
	    let pQuantiteTxt = document.createTextNode("Qte : ");


	    let input = document.createElement("input");
	    input.setAttribute("type","number");
	    input.setAttribute("class", "itemQuantity");
	    input.setAttribute("name", "itemQuantity");
	    input.setAttribute("min", "1");
	    input.setAttribute("max", "100");
	    input.setAttribute("value", `${quanLS}`);

	    
	    let divItemConSetD = document.createElement("div");
	    divItemConSetD.setAttribute("class","cart__item__content__settings__delete");
		
	    let pDelete = document.createElement("p");
	    pDelete.setAttribute("class","deleteItem");
	    let pDeleteText = document.createTextNode("Supprimer");



	    //mise en boite :

	    section.appendChild(article); 

	    article.appendChild(divImg);
	    divImg.appendChild(img);
		
	    article.appendChild(divItemC);
	    
	    divItemC.appendChild(divItemConD);
	    divItemConD.appendChild(h2);
	    h2.appendChild(h2Text);

	    divItemConD.appendChild(pCouleur);
	    pCouleur.appendChild(pCouleurTxt);
	    divItemConD.appendChild(pPrix);
	    pPrix.appendChild(pPrixText);
	    
	    
	    divItemC.appendChild(divItemConS);
	    divItemConS.appendChild(divItemConSetQ);
	    divItemConSetQ.appendChild(pQuantite);
	    pQuantite.appendChild(pQuantiteTxt);

	    divItemConSetQ.appendChild(input);

	    divItemConS.appendChild(divItemConSetD);

	    divItemConSetD.appendChild(pDelete);
	    pDelete.appendChild(pDeleteText);

	    //Creation des balises qui seront afficher ds la page html
	



	});

}












//on a prefere ne pas garder le prix des articles ds le localStorage, 
//pr eviter sa manipulation, et c'est pour cela que l'utilisation des valeurs des prix depuis l'api semble etre la plus securise (leme)
//
//On ne fait qui lire les prix depuis la page html (document {objet js})pr faire le calcule du prix Total, mais les donnees envoye a l'api pr la commande general, va avoir le prix par article (depuis une api aussi).
//Seul le nb d'article et le prix total seront envoyer pour subir une verification* et un traitement  *(ds le cas ou l'utitilisateur ou autre a modife le prix total en question ) 
//
//
//timeStamp(utiliser cette fct), avec fonction de hashage qui prend en valeur en micro seconde
//micro
//ex: var microtime = (Date.now() % 1000) / 1000;


/* ne fonctionne pas ds la boucle ??? bizarre
    let pQuantiteTxt = document.createTextNode(`Qte : ${tab[0].quantite} `);
*/
/*
function calc(quanLS,idProduit){
    fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
	.then(data => data.json())
	.then((t) => {  
    let prixArticle = t.price;
    console.log(t.price);
    console.log(quanLS);
    let prixTotal = quanLS * prixArticle;
    return 1;
    });
}
*/
//tmp/
//////////////////////////////////////////////////////////////////
//fct pour voir les donnees de produit de l'api a travers la console
function apiTab(){

fetch("http://127.0.0.1:3000/api/products/")
    .then(data => data.json())
    .then((dataFinal) => console.table(dataFinal));
}
//////////////////////////////////////////////////////////////////

