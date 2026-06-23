const API_URL = "http://localhost:5000/api/dresses";

let allDresses = [];

async function loadDresses() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        allDresses = Array.isArray(result) ? result : [];
        renderDress(allDresses);
    } catch (error) {
        console.error(error);
    }
}

function getImageUrl(image) {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
    }

    if (image.startsWith("/uploads/")) {
        return `http://localhost:5000${image}`;
    }

    if (image.startsWith("uploads/")) {
        return `http://localhost:5000/${image}`;
    }

    return `http://localhost:5000/uploads/${image}`;
}

function renderDress(dresses) {
    const container = document.getElementById("dressContainer");
    container.innerHTML = "";

    dresses.forEach((dress) => {
        const imageUrl = getImageUrl(dress.image);

        container.innerHTML += `
        <div class="dress-card">

            <span class="badge">
                Featured
            </span>

            ${
                imageUrl
                    ? `
                    <img
                        src="${imageUrl}"
                        alt="${dress.name}"
                        class="dress-image"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                    >
                    <div class="placeholder fallback-placeholder"></div>
                    `
                    : `
                    <div class="placeholder fallback-placeholder" style="display:block;"></div>
                    `
            }

            <h3>${dress.name}</h3>

            <p>
                Rp ${Number(dress.price).toLocaleString()}
            </p>

            <p>
                Size : ${dress.size}
            </p>

            <p>
                Stock : ${dress.stock}
            </p>

            <a href="dress-detail.html?id=${dress.id}">
                <button class="rent-btn">
                    View Details
                </button>
            </a>
        </div>
        `;
    });

    document.querySelectorAll(".fallback-placeholder").forEach((el) => {
        if (!el.previousElementSibling || el.previousElementSibling.tagName !== "IMG") {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    });
}

document
    .getElementById("searchInput")
    .addEventListener("keyup", (e) => {
        const keyword = e.target.value.toLowerCase();

        const filtered = allDresses.filter(
            (dress) =>
                dress.name &&
                dress.name.toLowerCase().includes(keyword)
        );

        renderDress(filtered);
    });

loadDresses();

