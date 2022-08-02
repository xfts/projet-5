//(variable global)
let a = 0; //nbr de d'article 
let prixTotalStatique = 0;//operationel
let valeurTotalInput =0;//operationel


let prixTotalDynamique = 0;
let quantiteCannapeLocalStorage = 0; 
/*
for(let w = 0; w < localStorage.length ; w++){
    tableau = JSON.parse(localStorage.getItem(localStorage.key(w)));
    prixCannapeLocalStorage = tableau[0].prix;

    //calculer le nb total de quantite :
    if (tableau.length > 1){
	for (s = 0 ; s < tableau.length ; s++){
	    quantiteCannapeLocalStorage = 0; 
	    quantiteCannapeLocalStorage += tableau[s].quantite;
	    prixTotalDynamique += quantiteCannapeLocalStorage * prixCannapeLocalStorage;
	}
    }
    else if (tableau.length == 1) {
	quantiteCannapeLocalStorage = tableau[0].quantite;
	prixTotalDynamique += quantiteCannapeLocalStorage * prixCannapeLocalStorage;
    } 

    quantiteCannapeLocalStorage = 0; 

    console.log("Total est : "+prixTotalDynamique+" euro");

}
*/





recupereDataLocalStorage();




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
	a.style.color='green';//pb ici, le vert ne s'enleve pas
	a.classList.remove('text-danger');//enleve la class css
	a.classList.add('text-success');
	return true;
	}
    else{
	a.innerHTML = 'mot non valide';
	a.classList.remove('text-danger');//enleve la class css
	a.classList.add('text-success');
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
	a.style.color='green';
	a.classList.remove('text-danger');//enleve la class css
	a.classList.add('text-success');
	return true;
	}
    else{
	a.innerHTML = 'non valide';
	a.style.color='#fbbcbc';
	a.classList.remove('text-danger');//enleve la class css
	a.classList.add('text-success');
    return false;
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
	a.innerHTML = 'courriel Valide';
	a.style.color='green';
	a.classList.remove('text-danger');//enleve la class css
	a.classList.add('text-success');
	return true;
	}
    else{
	a.innerHTML = 'adress no valide';
	a.style.color='#fbbcbc';
	a.classList.remove('text-danger');//enleve la class css
	a.classList.add('text-success');
    return false;
    }
};

//bug qlq que part
//Ecouter la soumission du formulaire
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
/////////////////////////////////////////////////////////////////
			//formulaire//



function recupereDataLocalStorage(){

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

	    //Affiche le total d'article qd la page est fige: 
	    totalArticlesEtSommesStatique(article,divItemConD.children[2]);
		//(signification des variables)
//	    article => Quantite de cannape
//	    divItemConD.children[2] => prix de ce dernier

	    //Affiche le total d'article qd l'utilisateur change la quantitee d'article: 
	    input.addEventListener('change', (Qte) => totalArticlesEtSommesDynamique(Qte,divItemConD,article));

	});
}
function totalArticlesEtSommesDynamique(Qte,prixDuCannape,article){
    Qte = Qte.target.value;
    prixDuCannape = prixDuCannape.children[2].innerText.replace(/\D/g, "");
    articleIdProduit = article.getAttribute("data-id");
    articleCouleur = article.getAttribute("data-color");
    
    miseAjourLocalStorage(articleIdProduit,articleCouleur,Qte,prixDuCannape);

    prixTotalArticles(); 
    
    document.getElementById("totalQuantity").innerText=`${Qte}`;
    document.getElementById("totalPrice").innerText=`${prixDuCannape*Qte}`;
}


function prixTotalArticles(){
    console.log(localStorage.key);

for(let w = 0; w < localStorage.length ; w++){
    tableau = JSON.parse(localStorage.getItem(localStorage.key(w)));
    prixCannapeLocalStorage = tableau[0].prix;

    //calculer le nb total de quantite :
    if (tableau.length > 1){
	for (s = 0 ; s < tableau.length ; s++){
	    quantiteCannapeLocalStorage = 0; 
	    quantiteCannapeLocalStorage += tableau[s].quantite;
	    prixTotalDynamique += quantiteCannapeLocalStorage * prixCannapeLocalStorage;
	}
    }
    else if (tableau.length == 1) {
	quantiteCannapeLocalStorage = tableau[0].quantite;
	prixTotalDynamique += quantiteCannapeLocalStorage * prixCannapeLocalStorage;
    } 

    quantiteCannapeLocalStorage = 0; 

    console.log("Total est : "+prixTotalDynamique+" euro");

    }
    document.getElementById("totalPrice").innerText=`${prixTotalDynamique}`;
    console.log("Total2 caso : "+prixTotalDynamique+" euro");
}


//ajouter la securitee sur les valeurs d'entree !
function miseAjourLocalStorage(idProduit,couleur,quantite,prixDuCannape){
	console.log("caso againnnnn !!!!");
	//new
	quantite = Math.floor(quantite);
	//new
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





function totalArticlesEtSommesStatique(QteDeCannape,prixDuCannape){

    QteDeCannape = QteDeCannape.querySelector("input").getAttribute("value");
    //on retravaille la balise "p" pour extraire la valeur sans le signe "euro" pr pouvoir calculer avec apres 
    prixDuCannape = prixDuCannape.innerText.replace(/\D/g, "");
    
    valeurTotalInput += QteDeCannape*1 ;//je ne sais pas pk, mais j'etais certain que cela allait fonctionner de cette mannier !!!!

    document.getElementById("totalQuantity").innerText=`${valeurTotalInput}`;
    prixTotalStatique += prixDuCannape*QteDeCannape ;
    
    document.getElementById("totalPrice").innerText=`${prixTotalStatique}`;

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
}






/*
//////////////////////A regler
    prixTotal += r.price * quanLS;//fonctionne a merveille
    document.getElementById("totalPrice").innerText=`${prixTotal}`;
//////////////////////A regler
*/
