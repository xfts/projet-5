//regler le typeof  "quantite" (la mettre en string ou en int) et travailler avec !!! (le plus gros est derrier refreeee 



//recupe l'id du produit a travers l'url et la met sous une variable globale
const url =  new URLSearchParams(window.location.search);
let idProduit = url.get('id');


afficheProduit();



//genere les balises html et les affiches sur la page
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
//	    divClass.appendChild(img);//ne fonctionne pas, je ne sais pas pk

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

	});

}



//recuper les valeurs "input" de l'utilisateur, verifie leur valeurs et les enregistres sur la machine client (localStorage) 

function elementsToLocalStorage(){

    const couleur = document.getElementById("colors");
    let quantiteString = document.getElementById("quantity");
    let prixDuCannape = document.getElementById("price");
    // r.price;

	
//transforme les variables "prixDuCannape" et  "quatiteString" en nbr(int) //parseInt equivalent 
	//old
    //prixDuCannape = prixDuCannape.innerText.replace(/\D/g, "");
    //new
    prixDuCannape = Math.floor(prixDuCannape.innerText);
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
	    let aaa = 1; //pour s'assurer que la boucle verifie tout les elements du tableau avant de passer a la condition suivant

	    //on verifie la presence de la couleur
	    for (q = 0; q < tableau.length ; q++){
		if ( tableau[q].couleur == couleur.value){

		    tableau[q].quantite = tableau[q].quantite + quantite;
		    if (tableau[q].quantite <= 100){
			tableau[q] = {"quantite" : tableau[q].quantite, "couleur" : couleur.value, "prix" : prixDuCannape};
			localStorage.setItem(idProduit, JSON.stringify(tableau));
		    }
		    else if (tableau[q].quantite > 100){
			tableau[q].quantite = 100; 
			tableau[q] = {"quantite" : tableau[q].quantite, "couleur" : couleur.value, "prix" : prixDuCannape};
			localStorage.setItem(idProduit, JSON.stringify(tableau));
		    }

		    aaa = 0;
		}
	    }
	    if ( aaa === 1){

		//creation d'un tableau:
		tableau[i] = {"quantite" : quantite, "couleur" : couleur.value, "prix" : prixDuCannape};
	
		//enregistrement du tableau sur le disk client
		localStorage.setItem(idProduit, JSON.stringify(tableau));
	    }

	}
	else if(booleen == false){
	    console.log("id non existant, enregistrement ds le localStorage");
	    //creation d'un tableau:
	    let tab = [{"quantite" : quantite, "couleur" : couleur.value, "prix" : prixDuCannape}];
	
	    //enregistrement du tableau sur le disk client
	    localStorage.setItem(idProduit, JSON.stringify(tab));
	
	}
	else{
	console.log("erreur no connue !");
	}
	
	window.location.href = "./cart.html";	

    }

	//cette partie est pour simplifier le debugage !!!!
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

    else if (couleur.selectedIndex == 0 && quantite == 0 || quantite > 100){
	console.log("veuillez choisir une couleur et une quantitee entre 1 et 100 svp");//a faire apparaite sur la page web !!!!
    }
    else if (couleur.selectedIndex == 0){
	console.log("veuillez choisir une couleur svp");//a faire apparaite sur la page web !!!!
    }
    else if (quantite > 100 || quantite == 0){
	console.log("veuillez choisir un nombre entre 1 et 100");//a faire apparaite sur la page web !!!!
    }
    else{
	console.log("erreur de saisie depuis l'interface graphique du site !");
    }
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
	//cette partie est pour simplifier le debugage !!!!
}




