

fetch("http://127.0.0.1:3000/api/products/order")
    .then(data => data.json())
	.then((dataFinal) => {
	    console.log(dataFinal)
    });






