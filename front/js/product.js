//optenir l'id a travers l'URL
const url =  new URLSearchParams(window.location.search);
let idProduit = url.get('id');

//tmp/
//////////////////////////////////////////////////////////////////
//fct pour voir les donnees de produit de l'api a travers la console
/*function apiTab(){
const url =  new URLSearchParams(window.location.search);
let idProduit = url.get('id');
//console.log(`id egale a :${idProduit}`);

fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
    .then(data => data.json())
    .then((dataFinal) => console.table(dataFinal));
}
apiTab();
*/
//////////////////////////////////////////////////////////////////

function produit(){

    fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
	.then(data => data.json())
	.then((r) => { //r = variable 

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
	   // boutonAjouter.addEventListener('click', () => dsa(r));

	    boutonAjouter.addEventListener('click', () => asd());


	});
}
produit();

function asd(){

    const couleur = document.getElementById("colors");

    let quantiteString = document.getElementById("quantity");
    const quantite = Math.floor(quantiteString.value);//transforme la variable "quatiteString" en nbr(int) //parseInt equivalent 

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
			tableau[q] = {"quantite" : tableau[q].quantite, "couleur" : couleur.value};
			localStorage.setItem(idProduit, JSON.stringify(tableau));
		    }
		    else if (tableau[q].quantite > 100){
			tableau[q].quantite = 100; 
			tableau[q] = {"quantite" : tableau[q].quantite, "couleur" : couleur.value};
			localStorage.setItem(idProduit, JSON.stringify(tableau));
		    }

		    aaa = 0;
		}
	    }
	    if ( aaa == 1){

		//creation d'un tableau:
		tableau[i] = {"quantite" : quantite, "couleur" : couleur.value};
	
		//enregistrement du tableau sur le disk client
		localStorage.setItem(idProduit, JSON.stringify(tableau));
	    }
	    
    

	}
	else if(booleen == false){
	    console.log("id non existant, enregistrement ds le localStorage");
	    //creation d'un tableau:
	    let tab = [{"quantite" : quantite, "couleur" : couleur.value}];
	
	    //enregistrement du tableau sur le disk client
	    localStorage.setItem(idProduit, JSON.stringify(tab));
	
	}
	else{
	console.log("erreur no connue !");
	}
	
	window.location.href = "./cart.html";	

    }
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
}

/*


/*Utiles :
//window.localStorage.clear();
console.log("it's me fucktion cosa!");
console.log(couleur.selectedIndex);
console.log("couleur index= " + couleur + " nombre = "+nb+" id : "+id );

for(let i in localStorage ){
    console.log([i]);//permet d'avoir tous les elements de l'objet
    console.log(localStorage[i]);//permet d'avoir le contenue et le nom des objects 
}

/*
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`${key}: ${localStorage.getItem(key)}`);
}


//comment avoir le nom de la couleur 
var selectElem = document.getElementById('colors')
// When a new <option> is selected
selectElem.addEventListener('change', function() {
    console.log(selectElem.value);
       })
//comment avoir le nom de la couleur 
 

*/

/*
function leme(){
	
	//get all key name 
    for( let t = 0; t < localStorage.length; t++){
	console.log(localStorage.key(t));
    }
    
	//get all object of localStorage
    for (let e in localStorage){
	console.log(JSON.parse(localStorage.getItem(e)));
	//console.log(e);
    } 
	//LeMe
    
    for (let e = 0 ; e < localStorage.length; e++){
	console.log(JSON.parse(localStorage.getItem(localStorage.key(e))));
    }  //LeMe
}
leme();

//How can i display a js object !!
    str = JSON.stringify(tabl);
    str = JSON.stringify(tabl, null, 4); // (Optional) beautiful indented output.
    console.log(str);
//How can i display a js object !!


//internet(premet de sortir tous les infos ds le LocalStorage !!!
function dataStorage() {
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
	
    while ( i-- ) {
	values.push( localStorage.getItem(keys[i]) );
    }
    console.log(values);

}
dataStorage();
//internet(premet de sortir tous les infos ds le LocalStorage !!!

*/







/*tips:
recuperer l'id(la variable est bien accessible (porte de variabe 'ok')
recuperer la couleur (ok) 
recuperer la quantite (ok) //NE PAS ENREGISTER LE PRIX (A FAIRE A LA FIN)!!
faire la condition avant envoie (ok)
//faire une condition pour la validation du panier (ok)
//
//securite pr le dev back-end "never trust user input"
//{...}

//(mentor)
//!!!!verifiez la quantite total avant de passer a la caisse!!!!!!! 
//idee en plus, creee une variable objet et mettre tous var en bas a l'interieur !!


/*
//fonctionne, mais pas ce qui est demande
let url2 =  window.location.search;
console.log(url2);

//pb avec href, comment sortir la variable de l'objet ?
let a =  new URLSearchParams(window.location.href);
console.log(a);








//backUp:

/*
 *
 *
 *
 *
asd();//tmp
function asd(){

    const couleur = document.getElementById("colors");

    let quantiteString = document.getElementById("quantity");
    const quantite = Math.floor(quantiteString.value);//transforme la variable "quatiteString" en nbr(int) //parseInt equivalent 

    if (couleur.selectedIndex > 0 && quantite > 0)//tmp ">="
	{
		
	//creation d'un tableau:
	let tab = [idProduit,couleur.selectedIndex,quantite];
	
	//changer le format du tableau en string
	let tab_serialized = JSON.stringify(tab);

	//enregistrement du tableau sur le disk client
	let z = Math.random();	
	localStorage.setItem(`tabOnDisk${z}`, tab_serialized);

	tabl=[];	
	for (let i = 0; i < localStorage.length; i++){
	    tabl[i]= JSON.parse(localStorage.getItem(localStorage.key(i)));
	}
	for (let e in tabl){
	    console.log("valeur du tableau :"+tabl[e]);
	}
	    console.log("valeur du tabl ds tabl:"+tabl[0][1]);
	
	//changer le format par defaut du localStorage en tableau 
	let tab_deserialized = JSON.parse(localStorage.getItem(`tabOnDisk${z}`));
	    
//	window.location.href = "./cart.html";	
    }
    else{
	console.log("erreur de saisie depuis l'interface graphique du site !");
    }

}
*/



