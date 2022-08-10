//prixCannapeLocalStorage = tableau.key(i).fetch.prix, en gros, on attribue le prix du prix du cannape depuis l'api a travers la variable prixCa... 

recupereDataLocalStorage();

let contact = null;

function creationDeContact(contact){
    console.log("caso again dude : "+contact);
}
 

			//formulaire//
/////////////////////////////////////////////////////////////////


let form = document.querySelector('.cart__order__form');

//Ecouter la modification d'autre ( <=> nom, prenom et ville): 

form.firstName.addEventListener('change', function(){
    validAutre(this,"firstName");
});

form.lastName.addEventListener('change', function(){
    validAutre(this,"lastName");
});

form.city.addEventListener('change', function(){
    validAutre(this,"city");
});


//Ecouter la modification de l'adresse 
form.address.addEventListener('change', function(){
    validAdress(this);
});

//Ecouter la modification de l'email
form.email.addEventListener('change', function(){
    validEmail(this);
});
 

//*********** Validation autre ***********//


const validAutre = function(entrezAutre,typeDeMot){
//creation de la reg exp pour validation d'autre

    let autreRegExp = new RegExp(
    '^[A-Za-z,-]{3,25}[-]{0,1}[A-Za-z]{0,25}[\ \]{0,4}$'
    );
    //On test l'expression reguliere
    let testAutre = autreRegExp.test(entrezAutre.value);

    //on va retourner cette valeur pour l'objet "Contact"

    //message qui permet de voir si l'autre a le bon format 
    let messageErreurAffichage = entrezAutre.nextElementSibling;


    if(testAutre){
        messageErreurAffichage.innerHTML = '';
    
        //console.log("type & value are : "+typeDeMot+" => "+ entrezAutre.value);    
        creationDeContact(typeDeMot+":"+entrezAutre.value);
        
	}
    else{
        messageErreurAffichage.innerHTML = 'mot non valide';
        messageErreurAffichage.style.color='#fbbcbc';
    }

};



//*********** Validation adress ***********//


const validAdress = function(entrezAdress){
//creation de la reg exp pour validation d'adress
    let adressRegExp = new RegExp(
    '^[0-9]{2,3}[\ \]{1,4}[A-Za-z]{3,25}[\ \]{0,4}[A-Za-z,-]{0,25}[\ \]{0,4}[A-Za-z,-]{0,25}[\ \]{0,4}$'
    //ds le cas ou le nom est long (ex 12 avenue des etats-unis {toulouse})
    );

    //On test l'expression reguliere
    let testAdress = adressRegExp.test(entrezAdress.value);

    //message qui permet de voir si l'adress a le bon format 
    let a = entrezAdress.nextElementSibling;
    if(testAdress){
        a.innerHTML = '';
	}
    else{
        a.innerHTML = 'adresse non valide';
        a.style.color='#fbbcbc';
    }
};
 

//*********** Validation Email ***********//


const validEmail = function(entrezEmail){
//creation de la reg exp pour validation d'email
    let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g'
    );//erreur avec @ !!!!

    //On test l'expression reguliere
    let testEmail = emailRegExp.test(entrezEmail.value);

    //message qui permet de voir si l'adress email a le bon format 
    let a = entrezEmail.nextElementSibling;

    if(testEmail){
        a.innerHTML = '';
	}
    else{
        a.innerHTML = 'adresse courriel no valide';
        a.style.color='#fbbcbc';
    }
};

//bug qlq que part //pb regler, regarde la nouvel fct en bas !
//Ecouter la soumission du formulaire
function commander(){
form.addEventListener('submit', function(e){
    e.preventDefault();
    if (validEmail(form.email) && validAutre(form.Autre) && validAdress(form.adress)){
	console.log('sa marche');
	form.submit();
    }
    else{
	console.log('erreur ds le formulaire');
    }
});
}


/////////////////////////////////////////////////////////////////
			//formulaire//



function recupereDataLocalStorage(){
let a = 0; //nbr de d'article 

    for (let e = 0 ; e < localStorage.length ; e++){
    //on recupe la clef (identifiant du produit) depuis le localStorage
	let idProduit = localStorage.key(e);
    
    //on recupre les elements de la clef sous format JSON (string par defaut)
	tab = JSON.parse(localStorage.getItem(`${idProduit}`));

	//Attribution des elements a des variables 
	let quanLS = tab[0].quantite; //quantSL : quantite localStorage
	let colores = tab[0].couleur;

	afficheProduit(idProduit,colores,quanLS);    
	a++;

	//Enclanche l'affichage des elements du meme id mais avec des characteristiques autres ("couleur","quantite" ds le cas present) 
	if ( tab.length > 1){
	    for (let i = 1 ; i < tab.length ; i++){
		let quanLS = tab[i].quantite;
		let colores = tab[i].couleur;

		afficheProduit(idProduit,colores,quanLS);    
		a++;
	    }   
	}
    }
}


function afficheProduit(idProduit,colores,quanLS){

    fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
	.then(data => data.json())
	.then((r) => {  

	    //Creation des balises qui seront afficher ds la page html

	    let section = document.getElementById("cart__items");

	    //creation de la balises article :
	    var article = document.createElement("article");
	    article.setAttribute("class", "cart__item"); 
	    article.setAttribute("data-id", `${idProduit}`); 
	    article.setAttribute("data-color", `${colores}`);


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

	    //Creation des balises qui seront afficher ds la page html


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
	    //mise en boite :




	    //efface la balise "article" contenant le produit
	    pDelete.addEventListener('click', (elementArticle) => effacerElement(elementArticle));


	    //Affiche le total d'article et la somme total 
	    totalArticlesEtPrixTotal(); 

	    //utilisateur qui modifie la qte et qui est mise a jour
	    input.addEventListener('change', (Qte) => modificationDeQuantite(Qte,divItemConD,article));

	});
}


function modificationDeQuantite(Qte,prixDuCannape,article){
    Qte = Qte.target.value;
    prixDuCannape = prixDuCannape.children[2].innerText.replace(/\D/g, "");
    articleIdProduit = article.getAttribute("data-id");
    articleCouleur = article.getAttribute("data-color");

    //Verification de la quantitee entree par l'utilisateur
    if (Qte <= 100 && Qte > 0 ){
	miseAjourLocalStorage(articleIdProduit,articleCouleur,Qte,prixDuCannape);
	totalArticlesEtPrixTotal(); 
    }
    else if (Qte > 100 || Qte <= -100 ){
	Qte = 100 ;
	miseAjourLocalStorage(articleIdProduit,articleCouleur,Qte,prixDuCannape);
	totalArticlesEtPrixTotal(); 
    }
    else if (Qte < 0 && Qte > - 101){
	Qte = Qte*(-1);
	miseAjourLocalStorage(articleIdProduit,articleCouleur,Qte,prixDuCannape);
	totalArticlesEtPrixTotal(); 
    }
    else if (Qte === 0){
	console.log("valeur null non accepter");
//	effacerElement(article);//ne fonctionne pas
    }
    else {
	console.log("donnee entree par l'utilisateur erronee");
    }
}

    

function totalArticlesEtPrixTotal(){
//initialisation de la variable, car la fonction "afficheProduit" est une boucle qui va utiliser toutes les fonctions a l'interieur au meme nombre de fois que d'element "article" a afficher
    let prixTotal = 0;
    let quantiteTotalDeCannapeDuMemeType = 0; 
    let quantiteTotalDeCannapes = 0;

for(let w = 0; w < localStorage.length ; w++){
    tableau = JSON.parse(localStorage.getItem(localStorage.key(w)));
    prixCannapeLocalStorage = tableau[0].prix;

    //calculer le nb total de quantite :
    if (tableau.length > 1){
	for (s = 0 ; s < tableau.length ; s++){
	    quantiteTotalDeCannapeDuMemeType = 0; 
	    quantiteTotalDeCannapeDuMemeType += tableau[s].quantite;

	    quantiteTotalDeCannapes += tableau[s].quantite;

	    prixTotal += quantiteTotalDeCannapeDuMemeType * prixCannapeLocalStorage;
	}
    }
    else if (tableau.length == 1) {
	quantiteTotalDeCannapeDuMemeType = tableau[0].quantite;
	
	quantiteTotalDeCannapes += tableau[0].quantite;
	
	prixTotal += quantiteTotalDeCannapeDuMemeType * prixCannapeLocalStorage;
    } 

    quantiteTotalDeCannapeDuMemeType = 0; 
    }

    document.getElementById("totalQuantity").innerText=`${quantiteTotalDeCannapes}`;
    document.getElementById("totalPrice").innerText = `${prixTotal}`;
    prixTotal = 0;
}


function miseAjourLocalStorage(idProduit,couleur,quantite,prixDuCannape){
	quantite = Math.floor(quantite);
	prixDuCannape = Math.floor(prixDuCannape);

	let booleen = false;

	for (let e = 0 ; e < localStorage.length ; e++){
	    if ( localStorage.key(e) == idProduit){
		booleen = true;
	    break;
	    }
	}
	if (booleen == true){
	    tableau = JSON.parse(localStorage.getItem(idProduit));

	    //on verifie la presence de la couleur
	    for (q = 0; q < tableau.length ; q++){
		if ( tableau[q].couleur == couleur){
		    tableau[q].quantite = quantite;
//hmmm
		//creation d'un tableau:
		tableau[q] = {"quantite" : quantite, "couleur" : couleur, "prix" : prixDuCannape};
		//enregistrement du tableau sur le disk client
		localStorage.setItem(idProduit, JSON.stringify(tableau));
		}
	    }
	}

}



//Fonction qui permet d'effacer la balise "article" contenant le produit que l'on souhaite enlever du panier depuis la page html et aussi, depuis le "localStorage" 

function effacerElement(elementArticle){

	    var buttonClicked = elementArticle.target
	    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
	    

	    //Attribution de la balise <article> a une variable "article"
	    article = buttonClicked.parentElement.parentElement.parentElement.parentElement;
	    data_id = article.getAttribute("data-id");
	    couleur = article.getAttribute("data-color");


	    //pour effacer un element depuis le localStorage a partir de sa cle 
	    tab = JSON.parse(localStorage.getItem(data_id));
	    //parcour les clefs et l'efface 
	    for (let i = 0; i < localStorage.length; i++){
		const key = localStorage.key(i);
		if( data_id === key && tab.length === 1){//ajouter la condition que le contenu de la clef est egale a 1 
		    localStorage.removeItem(localStorage.key(i));
		}
		//parcour le tableau (valeur de la clef) a la recherche de la couleur ds le cas ou la clef aurait plusieurs valeurs 
		else if(data_id === key && tab.length > 1 ){
		    for (let w = 0; w < tab.length ; w++){
			if ( tab[w].couleur === couleur){
			    tab.splice(w, 1);//w cible le numero de la ligne ds le tableau, 1 pr effacer {!! bizarre !!}
			    localStorage.setItem(localStorage.key(i), JSON.stringify(tab));
			    }
			}
		    }
		}
	    totalArticlesEtPrixTotal(); 
}




///////////////////////////////////TESTE?/////////////////////////////



//creation de numero de commande :
//console.log(new Date().valueOf());

//################################
//creation de l'objet à envoyer a API
/*
const contact = {
    firstName : 'bob',
    lastName : 'caso', 
    address : 'usaOfBoumako',
    city : 'bamako',
    email : 'asd@asd.as'
};

const products = [{
    id : '034707184e8e4eefb46400b5a3774b5f',
    colors :"red", 
    quantite : '3'
}];

const dataToSend = { contact , products };


//creation de l'init pour le fetch
const monInit = {
    method: 'POST',
    body: JSON.stringify(dataToSend),
    headers: {
        'Content-Type': 'application/json'
    }
};

//creation de la requete pour le fetch
let maRequete = new Request(`http://localhost:3000/api/products/order`, monInit);


//appel du fetch et envoie des data
fetch(maRequete, monInit)
    .then(response => response.json())
    .then(data => {
        console.log("data"+data);
        //vidange du local storage
//        localStorage.clear(); 

        //recupération de l'id dans les données en réponse
//        localStorage.setItem('orderId', data.orderId);

        //redirection
//        document.location.href = 'confirmation.html?id=' + data.orderId;
    })


*/
//################################

//bouton "envoyer" DOM, event fonctionnel !
/*
commander = document.getElementById('order');

commander.addEventListener('click', () => { 
    console.log("we done here");
    submitData();
});
*/




///////////////////////////////////TESTE?/////////////////////////////

