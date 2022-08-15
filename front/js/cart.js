



recupereDataLocalStorageEtLAffiche();




    //formulaire//
/////////////////////////////////////////////////////////////////
//Contact variable globale :
/*commentaire  tmp 
let variableContact = {
    firstName:null ,
    lastName: null,
    address: null,
    city: null,
    email:null 
};
let variableContact = {
    firstName:"bob" ,
    lastName: "cata",
    address: "22 rue de sentier",
    city: "gaucha",
    email: "asd@asd.as"
};

commentaire  tmp */


//tmp
//remplire le formulaire 
/*
let p = document.getElementById("firstName");
p.value = "bob";
let ln = document.getElementById("lastName");
ln.value = "cata";
let addr = document.getElementById("address");
addr.value = "22 rue de sentier";
let v = document.getElementById("city");
v.value = "gaucha";
let e = document.getElementById("email");
e.value = "asd@asd.as";
*/
//tmp

let variableContact = {
    firstName:null ,
    lastName: null,
    address: null,
    city: null,
    email:null 
};


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
    validAdress(this,"address");
});

//Ecouter la modification de l'email
form.email.addEventListener('change', function(){
    validEmail(this,"email");
});


//*********** Validation autre ***********//


const validAutre = function(entrezAutre,typeDeMot){
//creation de la reg exp pour validation d'autre

let autreRegExp = new RegExp(
'^[A-Za-z,-]{3,25}[-]{0,1}[A-Za-z]{0,25}[\ \]{0,4}$'
);
//On test l'expression reguliere
let testAutre = autreRegExp.test(entrezAutre.value);

//message qui permet de voir si l'autre a le bon format 
let messageErreurAffichage = entrezAutre.nextElementSibling;


if(testAutre){
    messageErreurAffichage.innerHTML = '';
    putUserInputInOrder(typeDeMot,entrezAutre.value);
}
else{
    messageErreurAffichage.innerHTML = 'mot non valide';
    messageErreurAffichage.style.color='#fbbcbc';
}

};



//*********** Validation adress ***********//


const validAdress = function(entrezAdress,typeDeMot){
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
    putUserInputInOrder(typeDeMot,entrezAdress.value);
}
else{
    a.innerHTML = 'adresse non valide';
    a.style.color='#fbbcbc';
}
};


//*********** Validation Email ***********//


const validEmail = function(entrezEmail,typeDeMot){
//creation de la reg exp pour validation d'email
let emailRegExp = new RegExp(
    /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
);


//On test l'expression reguliere
let testEmail = emailRegExp.test(entrezEmail.value);

//message qui permet de voir si l'adress email a le bon format 
let a = entrezEmail.nextElementSibling;

if(testEmail){
    a.innerHTML = '';
    putUserInputInOrder(typeDeMot,entrezEmail.value);
}
else{
    a.innerHTML = 'adresse courriel non valide';
    a.style.color='#fbbcbc';
}
};



//cette fonction recupere les "input" des utilisateurs et les met dans l'ordre 
function putUserInputInOrder(type,contact){
    if (type === "firstName"){
        variableContact.firstName = contact;
    }
    else if (type === "lastName"){
        variableContact.lastName = contact;
    }
    else if (type === "address"){
        variableContact.address = contact;
    }
    else if (type === "city"){
        variableContact.city = contact;
    }
    else if (type === "email"){
        variableContact.email = contact;
    }
    else {
        console.log("erreur de saisie");
    }
}



function verificationDesDonnesEntree(){
    let booleen = false;

    if ( (variableContact.firstName === null || variableContact.lastName === null || variableContact.address === null || variableContact.city === null || variableContact.email === null) && localStorage.length === 0){
        console.log("champ manquant ds la variable contact");
        console.log("localStorage vide <=> panier vide ");
        array = [booleen, null];
        return array;
    }
    else if ( (variableContact.firstName === null || variableContact.lastName === null || variableContact.address === null || variableContact.city === null || variableContact.email === null) && localStorage.length !== 0){
        console.log("champ manquant ds la variable contact");
        booleen = false;
        array = [booleen, null];
        return array;
    }
    else if ( localStorage.length === 0){
        console.log("localStorage vide <=> panier vide ");
        booleen = false;
        array = [booleen, null];
        return array;
    }
    else {
        let donneeProduit_A_envoyer = JSON.stringify(localStorage);
        booleen = true;
        array = [booleen, donneeProduit_A_envoyer];
        return array ;
    }
}


//Ecouter la soumission du formulaire
function boutonCommander(){
    //contient la reponse et la valeur du tableau de produit commander
    const array = verificationDesDonnesEntree();
    booleen = array[0];

    if ( booleen == true){
        //creation de numero de commande :
        const id_commande = new Date().valueOf();

        send_order_To_API(variableContact,array[1],id_commande);
    }
    else if ( booleen == false){
        console.log("champs de saisie (contact) et/ou commande produit non disponible");
    }
    else if ( booleen == undefined){
        console.log("erreur de la fct verificationDesDonnesEntree");
    }
    else{
        console.log("error non connue");
    }
    
}

function send_order_To_API(contact, products,id_commande){

    console.log("contact :"+contact.lastName);
    console.log("products :"+products);
    console.log("id :"+id_commande);



    //creation de l'objet à envoyer a API
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

    /* pb, ne fonctionne pas !!!
    //appel du fetch et envoie des data
    fetch(maRequete, monInit)
        .then(response => response.json())
        .then(data => {

            //vidange du local storage
            localStorage.clear(); 

            //recupération de l'id dans les données en réponse
            localStorage.setItem('orderId', data.orderId);

            //redirection
            document.location.href = 'confirmation.html?id=' + data.orderId;
            window.location.href = "./confirmation.html";
        })
    */
}



let order = document.getElementById('order');
//order.addEventListener('click', () => boutonCommander());







/////////////////////////////////////////////////////////////////
        //formulaire//



function recupereDataLocalStorageEtLAffiche(){
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


