
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

async function postOrder(name, items, notes="", status, creation_datetime, payment_status="Paid", pickup_datetime, payment_method) {
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
                creation_datetime: `${String(creation_datetime.getFullYear()).padStart(2, '0')}-${String(creation_datetime.getMonth() + 1).padStart(2, '0')}-${String(creation_datetime.getDate()).padStart(2, '0')} ${creation_datetime.getHours()}:${String(creation_datetime.getMinutes()).padStart(2,'0')}:${String(creation_datetime.getSeconds()).padStart(2,'0')}`, 
                completed_datetime: `${String(pickup_datetime.getFullYear()).padStart(2, '0')}-${String(pickup_datetime.getMonth() + 1).padStart(2, '0')}-${String(pickup_datetime.getDate()).padStart(2, '0')} ${pickup_datetime.getHours()}:${String(pickup_datetime.getMinutes()).padStart(2,'0')}:${String(pickup_datetime.getSeconds()).padStart(2,'0')}`,
                payment_status: payment_status,
                pickup_datetime: `${String(pickup_datetime.getFullYear()).padStart(2, '0')}-${String(pickup_datetime.getMonth() + 1).padStart(2, '0')}-${String(pickup_datetime.getDate()).padStart(2, '0')} ${pickup_datetime.getHours()}:${String(pickup_datetime.getMinutes()).padStart(2,'0')}:${String(pickup_datetime.getSeconds()).padStart(2,'0')}`,
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

async function generate_orders(count, start_date, end_date, start_hour = 11, end_hour = 22) {
    let items = await getItems();

    for(let i = 0; i < count; i++) {
        let item_count = Math.floor(Math.random() * 11) + 1;

        let items_list = getRandomItemsList(item_count, items);

        let name = getRandomName();
        let creation_datetime = getRandomDate(start_date, end_date, start_hour, end_hour);
        let pickup_datetime = addTimeToDate(creation_datetime, 30);
        let payment_method = getRandomPaymentMethod();

        console.log(`Generating random item list with ${item_count} items and time ${creation_datetime}`)

        postOrder(name, items_list, "", getRandomStatus(), creation_datetime, "paid", pickup_datetime, payment_method);
    }

}

function getRandomName() {
    let names = ["James", "Jones", "Josh"];
    return names[Math.floor(Math.random() * names.length)];
}

function getRandomPaymentMethod() {
    let methods = ["Cash", "amex", "mastercard", "visa"];
    return methods[Math.floor(Math.random() * methods.length)];
}

function addTimeToDate(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function getRandomDate(start_date, end_date, start_hour, end_hour) {
    let date = new Date(+start_date + Math.random() * (end_date - start_date));
    let hour = getRandomIntInclusive(start_hour, end_hour);
    date.setHours(hour);
    return date;
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function getRandomStatus() {
    let status = ["Completed"]
    return status[Math.floor(Math.random() * status.length)];
}

function getRandomItemsList(count, items) {
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
generate_orders(100, new Date("January 1, 2025 00:00:00"), new Date("March 31, 2025 00:00:00"));



