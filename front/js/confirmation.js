//recupere l'id_commande a travers l'url et la met sous une variable globale
const url =  new URLSearchParams(window.location.search);
let id_Commande = url.get('id_commande');

//affichage :
const span_Order_Id = document.getElementById("orderId");
span_Order_Id.innerText = id_Commande;

