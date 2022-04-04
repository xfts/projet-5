//(variable global)
let prixArticle ;//pb
let prixTotal = 0;//pb
let a = 0; //nbr de d'article 

show();
afficheArticlePrix(a);



	    //recuperation de la valeur "value" de la balise <input>
//	    value_input = article.querySelector("input");
	    //console.log(value_input.getAttribute("value"));



			//formulaire//
/////////////////////////////////////////////////////////////////
let form = document.querySelector('.cart__order__form');

//Ecouter la modification de l'email
form.email.addEventListener('change', function(){
    validEmail(this);
});

//Ecouter la modification de l'adresse 
form.address.addEventListener('change', function(){
    validAdress(this);
});

//Ecouter la modification d'autre 
form.firstName.addEventListener('change', function(){
    validAutre(this);
});
form.lastName.addEventListener('change', function(){
    validAutre(this);
});
form.city.addEventListener('change', function(){
    validAutre(this);
});

//*********** Validation autre ***********//
const validAutre = function(entrezAutre){
//creation de la reg exp pour validation d'autre
    let autreRegExp = new RegExp(
    '^[A-Za-z,-]{3,25}[-]{0,1}[A-Za-z]{0,25}[\ \]{0,4}$'
    );
    //On test l'expression reguliere
    let testAutre = autreRegExp.test(entrezAutre.value);

    //message qui permet de voir si l'autre a le bon format 
    let a = entrezAutre.nextElementSibling;
    if(testAutre){
	a.innerHTML = 'mot Valide';
	a.classList.remove('text-danger');//enleve la class css
	a.classList.add('text-success');
	return true;
	}
    else{
	a.innerHTML = 'mot non valide';
	a.classList.remove('text-success');//enleve la class css
	a.classList.add('text-danger');
    return false;
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
	a.innerHTML = 'adresse Valide';
	a.classList.remove('text-danger');//enleve la class css
	a.classList.add('text-success');
	return true;
	}
    else{
	a.innerHTML = 'non valide';
	a.classList.remove('text-success');//enleve la class css
	a.classList.add('text-danger');
    return false;
    }
};

//*********** Validation Email ***********//
const validEmail = function(entrezEmail){
//creation de la reg exp pour validation d'email
    let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g'
    );
    //On test l'expression reguliere
    let testEmail = emailRegExp.test(entrezEmail.value);

    //message qui permet de voir si l'adress email a le bon format 
    let a = entrezEmail.nextElementSibling;
    if(testEmail){
	a.innerHTML = 'courriel Valide';
	a.classList.remove('text-danger');//enleve la class css
	a.classList.add('text-success');
	return true;
	}
    else{
	a.innerHTML = 'adress no valide';
	a.classList.remove('text-success');//enleve la class css
	a.classList.add('text-danger');
    return false;
    }
};

//Ecouter la soumission du formulaire
form.addEventListener('submit', function(e){
    e.preventDefault();
    if (validEmail(form.email) && validPasswd(form.password)){
	console.log('sa marche');
	form.submit();
    }
    else{
	console.log('erreur');
    }
});
/////////////////////////////////////////////////////////////////



function show(){

    for (let e = 0 ; e < localStorage.length ; e++){
    //on recupe la clef (identifiant du produit) depuis le localStorage
	let idProduit = localStorage.key(e);
    
    //on recupre les elements de la clef sous format JSON (string par defaut)
	tab = JSON.parse(localStorage.getItem(`${idProduit}`));

	//Attribution des elements a des variables 
	let quanLS = tab[0].quantite; //quantSL : quantite localStorage
	let colores = tab[0].couleur;
	asd(idProduit,colores,quanLS);    
	//calc(quanLS,idProduit);
	a++;

	//Enclanche l'affichage des elements du meme id mais avec des characteristiques autres ("couleur","quantite" ds le cas present) 
	if ( tab.length > 1){
	    for (let i = 1 ; i < tab.length ; i++){
		let quanLS = tab[i].quantite;
		let colores = tab[i].couleur;
		asd(idProduit,colores,quanLS);    
		//calc(quanLS,idProduit);
		a++;
	    }   
	}
    }
}


function asd(idProduit,colores,quanLS){

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

	    input.addEventListener('change', function(e){
		var inputChange = e.target;
		console.log(inputChange.getAttribute("value"));    
	    }); 
	    let divItemConSetD = document.createElement("div");
	    divItemConSetD.setAttribute("class","cart__item__content__settings__delete");
		
	    let pDelete = document.createElement("p");
	    pDelete.setAttribute("class","deleteItem");
	    let pDeleteText = document.createTextNode("Supprimer");


			//delete item Test leme//
	    ////////////////////////////////////////////
	    pDelete.addEventListener('click', function(e){
	    var buttonClicked = e.target
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
		if( data_id === key && tab.length == 1){//ajouter la condition que le contenu de la clef est egale a 1 
		    localStorage.removeItem(localStorage.key(i));
		}
		//parcour le tableau (valeur de la clef) a la recherche de la couleur ds le cas ou la clef aurait plusieur valeurs 
		else if(data_id === key && tab.length > 1 ){
		    for (let w = 0; w < tab.length ; w++){
			if ( tab[w].couleur === couleur){
			    tab.splice(w, 1);//w cible le numero de la ligne ds le tableau, 1 pr effacer {!! bizarre !!}
			    localStorage.setItem(localStorage.key(i), JSON.stringify(tab));
			}
		    }
		}
	    }
	});


    prixTotal += r.price * quanLS;//fonctionne a merveille
    document.getElementById("totalPrice").innerHTML=`${prixTotal}`;


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
//Formulaire :
//on conseillerait les clients de passer par des api pour les adresses pour faciliter l'aquesition des donnees et d'avoir des resultats les plus juste possible 
//
//
//timeStamp(utiliser cette fct), avec fonction de hashage qui prend en valeur en micro seconde
//micro
//ex: var microtime = (Date.now() % 1000) / 1000;


/* ne fonctionne pas ds la boucle ??? bizarre
    let pQuantiteTxt = document.createTextNode(`Qte : ${tab[0].quantite} `);
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





			//code a regler//
//////////////////////////////////////////////////////////////////
/*

//Fonctionne
//avoir le prix sur une variable depuis l'api (reussi!!!)
let idProduit = localStorage.key(0); let obj;
fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
  .then(res => res.json())
    .then(data => obj = data)

//Ne fonctionne pas, et c'est cette fonction qui doit marcher
function calc(quanLS,idProduit){
let obj = 0;
fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
    .then(res => res.json())
	.then(data => obj = data)
	    console.log(obj);//sa ne marche pas !!!
    //		prixTotal += quanLS * obj.price;
	  //	    return prixTotal;
Soluce :il faut mettre les parentheses sur .then(data => {...}
}
fonctionne !!
function calc(quanLS,idProduit){
let obj = 0;
    fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
    .then(res => res.json())
	.then(data => {
	    obj = data;
		console.log(obj.price);
    })		                                      
}
*/
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
/*
let articleCart = document.querySelectorAll(".cart__item");//FUCK YOU JSfrom the buttom of my BALLS !!!!! (fonctionne sur les elements deja present la page html et non pas apres (no se pq)
console.log(articleCart);


const vbn = document.body;
console.log(vbn);
    const removeCartItemButtons = document.getElementsByClassName("deleteItem");
    console.log(removeCartItemButtons);//sa marche ici BORDELLLLL
    console.log(removeCartItemButtons.length);// PK ??????????????????????????????????????????????????? PUT11111111111111!!!!!!
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
function calc(quanLS,idProduit){
    fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
	.then(data => data.json())
	.then((t) => {  
	    prixTotal += quanLS * t.price;
	    //fonctionne 	    
	    //return prixTotal; //ne fonctionne pas
    });
}
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
function effacerArticle(){
    const removeCartItemButtons = document.getElementsByClassName("deleteItem");
    console.log(removeCartItemButtons);//sa marche ici BORDELLLLL
    console.log(removeCartItemButtons.length);// PK ??????????????????????????????????????????????????? PUT11111111111111!!!!!!
    button.addEventListener('click', function(){
    console.log('click')
    })
//    for (var i = 0; i < removeCartItemButtons.length; i++){
	//var button = removeCartItemButtons[i];

    /*
    button.addEventListener('click', function(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    })
}
*/
/////////////////////////////////////////////////////////
		//delete item Test//
/////////////////////////////////////////////////////////
	/*
	    pDelete.addEventListener('click', function(){
	    article.innerHTML = "";
	    //let a = this.closest('article');
	    //a.innerHTML = "";   
	    });*/
/////////////////////////////////////////////////////////

// a perfectionner (regler l'affichage du prix total)
function afficheArticlePrix(a){
	    //a regler plus tart (prixTotal) 
    let totalQuantiteArticle = document.getElementById("totalQuantity");
    totalQuantiteArticleTxt = document.createTextNode(`${a}`);
    totalQuantiteArticle.appendChild(totalQuantiteArticleTxt);
/*
    let totalPrixArticle = document.getElementById("totalPrice");
    prixTotal += r.price * quanLS;//fonctionne a merveille
    console.log(prixTotal);		
    totalPrixArticleTxt = document.createTextNode(`${prixTotal}`);
    //innerHTML pr remplacer par la dernier valeur (ecraser) 
    totalPrixArticle.appendChild(totalPrixArticleTxt);
*/
}
//////////////////////////////////////////////////////////////////






/*
// TRUCK EFFACER 
//  a garder jusqu'a la fin du projet
let idProduit = localStorage.key(0);
tab = JSON.parse(localStorage.getItem(`${idProduit}`));
console.log(tab[0].couleur);

let tableauTT = [];

//leme
    document.querySelector(".deleteItem").addEventListener('click', function(e){
	var buttonClicked = e.target
	buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    });
//leme
*/


