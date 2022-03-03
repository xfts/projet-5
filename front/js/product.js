//optenir l'id a travers l'URL
const url =  new URLSearchParams(window.location.search);
let idProduit = url.get('id');

//tmp/
//////////////////////////////////////////////////////////////////
//fct pour voir les donnees de produit de l'api a travers la console
function apiTab(){
const url =  new URLSearchParams(window.location.search);
let idProduit = url.get('id');
console.log(`id egale a :${idProduit}`);

fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
    .then(data => data.json())
    .then((dataFinal) => console.table(dataFinal));
}
apiTab();
//////////////////////////////////////////////////////////////////

function produit(){

    fetch(`http://127.0.0.1:3000/api/products/${idProduit}`)
	.then(data => data.json())
	.then((r) => {

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



	});
}
produit();


/*tips:
recuperer l'id(la variable est bien accessible (porte de variabe 'ok')
recuperer la couleur 
recuperer la quantite
faire la condition avant envoie

function panier(){

    let nbArticle = document.

    const boutonAjouterPanier = document.addEventListener('click', function(e){}



}



*/

//faire une condition pour la validation du panier
//if ( couleurChoix == true && numbreCannape > 0 && numbreCannape <100)//securite pr le dev back-end "never trust user input"
//{...}


//idee en plus, creee une variable objet et mettre tous var en bas a l'interieur !!


/*
//fonctionne, mais pas ce qui est demande
let url2 =  window.location.search;
console.log(url2);

//pb avec href, comment sortir la variable de l'objet ?
let a =  new URLSearchParams(window.location.href);
console.log(a);


*/









