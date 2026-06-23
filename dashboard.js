async function loadDashboard() {

    const response =
    await fetch(
        "http://localhost:5000/api/dashboard"
    );

    const data =
    await response.json();

    document
    .getElementById(
        "dressCount"
    ).textContent =
    data.totalDress;

    document
    .getElementById(
        "customerCount"
    ).textContent =
    data.totalCustomer;

    document
    .getElementById(
        "activeRental"
    ).textContent =
    data.activeRental;

    document
    .getElementById(
        "returnedRental"
    ).textContent =
    data.returnedRental;

}

document
.getElementById(
    "revenue"
)
.textContent =
"Rp " +
Number(
    data.revenue
).toLocaleString();

loadDashboard();

async function loadChart(){

    const response =
    await fetch(
        "http://localhost:5000/api/dashboard/chart"
    );

    const data =
    await response.json();

    const labels =
    data.map(item =>
        "Month " + item.month
    );

    const totals =
    data.map(item =>
        item.total
    );

    new Chart(

        document
        .getElementById(
            "rentalChart"
        ),

        {

            type:"bar",

            data:{

                labels,

                datasets:[{

                    label:
                    "Rentals",

                    data: totals

                }]

            }

        }

    );

}

loadChart();

async function loadRecentRentals(){

    try{

        const response =
        await fetch(
            "http://localhost:5000/api/rentals"
        );

        const rentals =
        await response.json();

        const tbody =
        document.getElementById(
            "recentRentalBody"
        );

        tbody.innerHTML = "";

        rentals
        .slice(0,5)
        .forEach(rental=>{

            tbody.innerHTML += `

            <tr>

                <td>${rental.id}</td>

                <td>${rental.fullname}</td>

                <td>${rental.dress_name}</td>

                <td>${rental.status}</td>

            </tr>

            `;

        });

    }

    catch(error){

        console.error(error);

    }

}

loadDashboard();
loadChart();
loadRecentRentals();