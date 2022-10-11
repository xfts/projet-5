//recupere l'id du produit a travers l'url et la met sous une variable globale
const url =  new URLSearchParams(window.location.search);
let idProduit = url.get('id');


afficheProduit();



//Genere les balises html et les affichent sur la page
function afficheProduit(){

    fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
	.then(data => data.json())
	.then((r) => { //r = variable(objet) 

	    //creation de la balise pour image et son insertion:
	    let divClass =document.getElementsByClassName("item__img");
	    let img = document.createElement("img");
	    img.setAttribute("src", r.imageUrl);
	    img.setAttribute("alt", r.altTxt);
	    divClass.item(0).appendChild(img); 

	    //titre
	    let title = document.getElementById("title");
	    title.innerText = r.name;

	    //prix
	    let h1Prix = document.getElementById('price');
	    h1Prix.innerText = r.price;
	     
	    //description
	    let description = document.getElementById('description');
	    description.innerText = r.description;

	    //creation des balises 'option'
	    let x = 0;
	    const idChoixCouleur = document.getElementById("colors");

	    while (x < r.colors.length){
		let optionCouleur = document.createElement("option");
		optionCouleur.setAttribute("value", r.colors[x].toLowerCase());//tres important en min surtout pr la suite
		optionCouleur.innerText = r.colors[x];
		idChoixCouleur.appendChild(optionCouleur);
		x++;
	    } 

	    let boutonAjouter = document.getElementById('addToCart');
	    boutonAjouter.addEventListener('click', () => elementsToLocalStorage());

	})
	.catch( () =>{
		alert("le service n'est pas disponible pour le moment, veuillez ressayer ulterieurement");
	});
}



//recuper les valeurs "input" de l'utilisateur, verifie leur valeurs et les enregistres sur la machine client (localStorage) 

function elementsToLocalStorage(){

    const couleur = document.getElementById("colors");
    let quantiteString = document.getElementById("quantity");

	
    //transforme la variable "quatiteString" en nbr(int) <=> parseInt equivalent 
	
    const quantite = Math.floor(quantiteString.value);

    if (couleur.selectedIndex > 0 && quantite > 0 && quantite <= 100)
    {
	let booleen = false;
	for (let e = 0 ; e < localStorage.length ; e++){
	    if ( localStorage.key(e) == idProduit){
		booleen = true;
	    break;
	    }
	}
	if (booleen == true){

	    console.log("id produit existe dans le localStorage");
	    tableau = JSON.parse(localStorage.getItem(idProduit));
	    let i = tableau.length;
	    let a = 1; //pour s'assurer que la boucle verifie tout les elements du tableau avant de passer a la condition suivant

	    //on verifie la presence de la couleur
	    for (q = 0; q < tableau.length ; q++){
		if ( tableau[q].couleur == couleur.value){

		    tableau[q].quantite = tableau[q].quantite + quantite;
		    if (tableau[q].quantite <= 100){
			tableau[q] = {"quantite" : tableau[q].quantite, "couleur" : couleur.value};
			localStorage.setItem(idProduit, JSON.stringify(tableau));
		    }
		    else if (tableau[q].quantite > 100){
			tableau[q].quantite = 100; 
			tableau[q] = {"quantite" : tableau[q].quantite, "couleur" : couleur.value};
			localStorage.setItem(idProduit, JSON.stringify(tableau));
		    }

		    a = 0;
		}
	    }
	    if ( a === 1){

		//creation d'un tableau:
		tableau[i] = {"quantite" : quantite, "couleur" : couleur.value};
	
		//enregistrement du tableau sur le disk client
		localStorage.setItem(idProduit, JSON.stringify(tableau));
	    }

	}
	else if(booleen == false){
	    console.log("id non existant, enregistrement ds le localStorage");
	    //creation d'un tableau:
	    let tab = [{"quantite" : quantite, "couleur" : couleur.value}]
	
	    //enregistrement du tableau sur le disk client
	    localStorage.setItem(idProduit, JSON.stringify(tab));
	
	}
	else{
	console.log("erreur no connue !");
	}
  redirectionSurPagePanier();
}

	//message pour l'utilisateur en cas de saisie errone
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

    else if (couleur.selectedIndex == 0 && quantite == 0 || quantite > 100){
		alert("veuillez choisir une couleur et une quantitee entre 1 et 100 svp");//a faire apparaite sur la page web !!!!
    }
	else if (couleur.selectedIndex == 0){
		alert("veuillez choisir une couleur svp");//a faire apparaite sur la page web !!!!
    }
    else if (quantite > 100 || quantite == 0){
		alert("veuillez choisir un nombre entre 1 et 100");//a faire apparaite sur la page web !!!!
    }
    else{
		console.log("erreur de saisie depuis l'interface graphique du site !");
    }

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
	//message pour l'utilisateur en cas de saisie errone
}





//redirige l'utilisateur vers la page panier ou la page principal en fonction du son choix 
function redirectionSurPagePanier() {
	let message = confirm("voulez vous continuer vers votre panier ?");

	if (message == true){
		window.location.href = "./cart.html";	
	}
	else if(message == false){
		alert("nous allons vous rediriger à la page principal, votre commande a bien été prise en compte");
		window.location.href = "./index.html";	
	}
}
