const customerSelect =
document.getElementById("customer");

const dressSelect =
document.getElementById("dress");

async function loadCustomers(){

    const res =
    await fetch(
        "http://localhost:5000/api/customers"
    );

    const customers =
    await res.json();

    customers.forEach(customer=>{

        customerSelect.innerHTML += `
            <option value="${customer.id}">
                ${customer.fullname}
            </option>
        `;

    });

}

async function loadDresses(){

    const res =
    await fetch(
        "http://localhost:5000/api/dresses"
    );

    const dresses =
    await res.json();

    dresses.forEach(dress=>{

        dressSelect.innerHTML += `
            <option value="${dress.id}">
                ${dress.name}
            </option>
        `;

    });

}

document
.getElementById("rentBtn")
.addEventListener(
    "click",
    async ()=>{

        const data = {

            customer_id:
            customerSelect.value,

            dress_id:
            dressSelect.value,

            rent_date:
            document.getElementById(
                "rentDate"
            ).value,

            return_date:
            document.getElementById(
                "returnDate"
            ).value,

            total_price:
            500000,

            status:
            "Rented"

        };

        const response =
        await fetch(
            "http://localhost:5000/api/rentals",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(data)
            }
        );

        const result =
        await response.json();

        alert(result.message);

    }
);

loadCustomers();
loadDresses();