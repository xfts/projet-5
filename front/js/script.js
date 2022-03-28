function asd(){
    fetch("http://127.0.0.1:3000/api/products")
	.then(data => data.json())
	.then((dataFinal) => {
	    let idItems = document.getElementById("items");
	    dataFinal.forEach((r) => {
	
		//creations de elements a implementer dans la page index.html
		let a = document.createElement("a");
		a.setAttribute("href", `./product.html?id=${r._id}`);

		let img = document.createElement("img");
		img.setAttribute("src", r.imageUrl);
		img.setAttribute("alt", r.altTxt);

		let h3 = document.createElement("h3");
		h3.setAttribute("class", "productName");
		let h3Text = document.createTextNode(r.name);

		let p = document.createElement("p");
		p.setAttribute("class", "productDescription");
		let pText = document.createTextNode(r.description);

		let article = document.createElement("article");

		//mise en boite des elements creer 
		p.appendChild(pText);	
		h3.appendChild(h3Text);	
		article.appendChild(img);
		article.appendChild(h3);
		article.appendChild(p);
		a.appendChild(article);
		idItems.appendChild(a);

		});
	});
}

asd();


//pour voir le tableau dans la console (pr moi)
fetch("http://127.0.0.1:3000/api/products")
    .then(data => data.json())
    .then(dataFinal => produits = dataFinal)
    .then(() => console.table(produits))

/*
    for (i = 0 ; i < 9 ; i++){
	console.log("voici les noms de cannape :" + produits.name);
    //plus besoin, 'forEachin' fait l'affaire en mieux !!! 
    }


/////////voir tableau api
fetch("http://127.0.0.1:3000/api/products")
    .then(data => data.json())
    .then(dataFinal => produits = dataFinal)
    .then(() => console.table(produits))
/////////voir tableau api


*/


/* Fetch is asynchronous. You can’t assign data recieved in async outside of asynchronous scope. So you need to perform all actions you need inside of .then()*/

