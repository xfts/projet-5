

numeroDeCommande ();

//genere un numero de commande en le recuperant depuis l'url et l'affiche au client
function numeroDeCommande (){
	const url =  new URLSearchParams(window.location.search);
	let id_Commande = url.get('id_commande');

	//affichage :
	const span_Order_Id = document.getElementById("orderId");
	span_Order_Id.innerText = id_Commande;
}
