



export default function BuyMore(ingredients ) {
    console.log("Working")
    async function putData(data, increase) {
        const url = "http://localhost:3000/api/raw";
        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: data.name, 
                    price: data.price, 
                    threshold: data.threshold, 
                    stock: increase, 
                    buy_amount: data.buy_amount,
                    id: data.id
                },
              )
          });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          return json;
        } catch (error) {
          console.error(error.message);
        }
    }
    async function postData(value, notes) {
        const url = "http://localhost:3000/api/orders";
        try {
          const response = await fetch(url , {
            'method': 'POST',
            'body': JSON.stringify(
                { client: "FoodTrack", 
                    subtotal: value * -1, 
                    tax: value * 0.05 * -1, 
                    total: value * 1.05 * -1, 
                    items: JSON.stringify([]), 
                    notes: `Restocking on ${notes}`, 
                    status: "Finished", 
                    creation_datetime: `${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}`, 
                    completed_datetime: `${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}`,
                    payment_status: "paid",
                    pickup_datetime: `${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}` ,
                    payment_method: "visa",
                    amount: value * 1.05 * -1
                 },
              )
          });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          return json;
        } catch (error) {
          console.error(error.message);
        }
    }


    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].stock < ingredients[i].threshold) {
            let increase = ingredients[i].stock;
            var counter = 0;
            let purchase = ingredients[i].price;
            while (increase < ingredients[i].threshold) {
                increase += ingredients[i].buy_amount;
                counter++;
            }
            putData(ingredients[i], increase).then((response) => console.log("meme"));
        }
    }
}