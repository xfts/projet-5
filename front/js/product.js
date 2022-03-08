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

//window.localStorage.clear();
//console.log(localStorage);
//console.log(e);

function leme(){
    console.log("valeur de : "); 
    var values = [];
    for (let i = 0; i < localStorage.length; i++){
    value = JSON.parse(localStorage.getItem(localStorage.key(i)));
    console.log("sucasdas");
    return value;
    }
    console.log("valeur de 22 : "); 
}
leme();


asd();//tmp
function asd(){

    const idProduitPanier = idProduit;

    const couleur = document.getElementById("colors");

    let quantiteString = document.getElementById("quantity");
    const quantite = Math.floor(quantiteString.value);//transforme la variable "quatiteString" en nbr(int)  

    if (couleur.selectedIndex > 0 && quantite > 0)//tmp ">="
	{
	cosa(idProduitPanier,couleur.selectedIndex,quantite);
//	window.location.href = "./cart.html";	
    }
    else{
	console.log("erreur de saisie depuis l'interface graphique du site !");
    }

    function fctDeVerification(){
    console.log("it 's me again fucktion cosa !!!!")
    console.log("tab: "+tab[1]);
}

    function cosa(id,couleur,nb){ 
	//creation d'un tableau:
	let tab = [id,couleur,nb];
	
	//changer le format du tableau en string
	let tab_serialized = JSON.stringify(tab);

	//enregistrement du tableau sur le disk client
	let z = Math.random();	
	localStorage.setItem(`tabOnDisk${z}`, tab_serialized);
	console.log(localStorage);
	
	//changer le format par defaut du localStorage en tableau 
	let tab_deserialized = JSON.parse(localStorage.getItem(`tabOnDisk${z}`));
	    
	for(let i in localStorage ){
	    console.log(localStorage[i]);
	}
    }
}



/*Utiles :
console.log("it's me fucktion cosa!");
console.log(couleur.selectedIndex);
console.log("c'est bon !");
console.log("couleur index= " + couleur + " nombre = "+nb+" id : "+id );

for(let i in localStorage ){
    console.log([i]);//permet d'avoir tous le element de l'objet
    console.log(localStorage[i]);permet d'avoir le contenue et le nom des objects 
}
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
*/







/*tips:
recuperer l'id(la variable est bien accessible (porte de variabe 'ok')
recuperer la couleur (ok) 
recuperer la quantite (ok) //NE PAS ENREGISTER LE PRIX (A FAIRE A LA FIN)!!
faire la condition avant envoie (ok)
//faire une condition pour la validation du panier (ok)
//
//if ( couleurChoix == true && numbreCannape > 0 && numbreCannape <100)//securite pr le dev back-end "never trust user input"
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

*/







//backUp:

/*
asd();//tmp
function asd(){

    const idProduitPanier = idProduit;

    const couleur = document.getElementById("colors");

    let quantiteString = document.getElementById("quantity");
    const quantite = Math.floor(quantiteString.value);//transforme la variable "quatiteString" en nbr(int)  

    if (couleur.selectedIndex > 0 && quantite > 0)//tmp ">="
	{
	cosa(idProduitPanier,couleur.selectedIndex,quantite);
//	window.location.href = "./cart.html";	
    }
    else{
	console.log("erreur de saisie depuis l'interface graphique du site !");
    }

    function cosa(id,couleur,nb){ 
	//creation d'un tableau:
	let tab = [id,couleur,nb];
	
	//changer le format du tableau en string
	let tab_serialized = JSON.stringify(tab);

	//enregistrement du tableau sur le disk client
	let z = Math.random();	
	localStorage.setItem(`tabOnDisk${z}`, tab_serialized);
	console.log(localStorage);
	
	//changer le format par defaut du localStorage en tableau 
	let tab_deserialized = JSON.parse(localStorage.getItem(`tabOnDisk${z}`));
	    

	for(let i in localStorage ){
	    console.log(localStorage[i]);
	}

    }
}
*/
/*
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

function leme(){
    for (let e = 0 ; e < localStorage.length; e++){
	console.log(JSON.parse(localStorage.getItem(localStorage.key(e))));
    } 
}
leme();

*/
