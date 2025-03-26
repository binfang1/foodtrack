
"use client";

export default function OrderItem({order, setPage, setCategoryPage, itemsList, setItemsList, mainOrder, setMainOrder, items}) {
    var counter = 1;
    async function updateItem(item) {
        const url = "http://localhost:3000/api/items";

        try {
            var index;
        if (items.some(itemMain => itemMain.id == item.id)) { 
            index = items.findIndex(itemMain => itemMain.id == item.id);
        }
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: item.name,
                    price: item.price/item.quantity,
                    category: item.category,
                    stock: items[index].stock + item.quantity,
                    id: item.id
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

    async function reinventory () {
        try {
            for (const item of JSON.parse(order.items)) {
                await updateItem(item);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    

    function editPayOrder () {
        reinventory().then(function(response) {
            const returnedItems = JSON.parse(order.items);
            setPage("home");
            setCategoryPage("Default");
            console.log(order)
            for (let i = 0; i < items.length; i++) {
                if (returnedItems.some(item => item.id == items[i].id)) {
                    const index = returnedItems.findIndex(item => item.id === items[i].id);
                    returnedItems[index].stock = items[i].stock
            }}
            setItemsList(returnedItems);
            setMainOrder(order);
        });
    }

   
    return (
        <div className="p-[12px] w-full bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9]">
            <div className="flex">
                <p>{order.client}</p>
                <button onClick = {editPayOrder} className="ml-auto">edit</button>
            </div>
            <p>{order.creation_datetime}</p>
            <p>{order.pickup_datetime}</p>
            <p>{order.status}</p>
            <div className="py-12">
                {JSON.parse(order.items).map(item => (
                    <p key = {counter++}>{item.quantity}x - {item.name}</p>
                ))}
            </div>
        </div>
    );
}

