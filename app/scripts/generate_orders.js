
async function getItems() {
    const url = "http://localhost:3000/api/items";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
    }
}

async function postOrder(name, items, notes="", status, creation_datetime, payment_status="Unpaid", pickup_datetime, payment_method) {
    const url = "http://localhost:3000/api/orders";

    let subTotal = 0.00;
    items.forEach(item => {
        subTotal += item.price;
    });
    let tax = subTotal * 0.05;
    let total = subTotal + tax;

    try {
        const response = await fetch(url , {
        'method': 'POST',
        'body': JSON.stringify(
            { client: name, 
                subtotal: subTotal, 
                tax: tax, 
                total: total, 
                items: JSON.stringify(items), 
                notes: notes, 
                status: status, 
                creation_datetime: creation_datetime.toISOString().slice(0, 19).replace('T', ' '), 
                completed_datetime: creation_datetime.toISOString().slice(0, 19).replace('T', ' '),
                payment_status: payment_status,
                pickup_datetime: pickup_datetime.toISOString().slice(0, 19).replace('T', ' '),
                payment_method: payment_method
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

async function generate_orders(count, start_date, end_date, start_hour = 11, end_hour = 20) {
    let items = await getItems();

    for(let i = 0; i < count; i++) {
        let item_count = Math.floor(Math.random() * 11) + 1;

        let items_list = getRandomItemsList(item_count, items);

        let name = getRandomName();
        let creation_datetime = getRandomDate(start_date, end_date, start_hour, end_hour);
        let pickup_datetime = addTimeToDate(creation_datetime, 30);
        let payment_method = getRandomPaymentMethod();

        postOrder(name, items_list, "", getRandomStatus(), creation_datetime, "Paid", pickup_datetime, payment_method);
    }

}

function getRandomName() {
    let names = ["James", "Jones", "Josh"];
    return names[Math.floor(Math.random() * names.length)];
}

function getRandomPaymentMethod() {
    let methods = ["Cash", "Credit"];
    return methods[Math.floor(Math.random() * methods.length)];
}

function addTimeToDate(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function getRandomDate(start_date, end_date, start_hour, end_hour) {
    let date = new Date(+start_date + Math.random() * (end_date - start_date));
    let hour = start_hour + Math.random() * (end_hour - start_hour) | 0;
    date.setHours(hour);
    return date;
}

function getRandomStatus() {
    let status = ["Waiting", "In-Progress", "Completed"]
    return status[Math.floor(Math.random() * status.length)];
}

function getRandomItemsList(count, items) {
    console.log(`Generating random item list with ${count} items`)
    let finalItems = [];
    for(let i = 0; i < count; i++) {
        const randomItem = items[Math.floor(Math.random() * items.length)];

        if (finalItems.some(item => item.name == randomItem.name)) {
            const index = finalItems.findIndex(item => item.name === randomItem.name);
            const oldPrice = finalItems[index].price / finalItems[index].quantity
            finalItems[index].quantity += 1;
            finalItems[index].price = finalItems[index].price + oldPrice;
        }
        else {
            finalItems.push({"quantity": 1, "name": randomItem.name, "price": randomItem.price});
        }
    }
    return finalItems;
}


// Edit this to generate orders
generate_orders(10, new Date("January 1, 2025 00:00:00"), new Date("March 21, 2025 00:00:00"));



