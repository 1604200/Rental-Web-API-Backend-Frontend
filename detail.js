const params =
new URLSearchParams(
    window.location.search
);

const dressId =
params.get("id");

function getImageUrl(image) {

    if (!image) return "";

    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    if (
        image.startsWith("/uploads/")
    ) {
        return `http://localhost:5000${image}`;
    }

    if (
        image.startsWith("uploads/")
    ) {
        return `http://localhost:5000/${image}`;
    }

    return `http://localhost:5000/uploads/${image}`;
}

async function loadDetail() {

    try {

        const response =
        await fetch(
            "http://localhost:5000/api/dresses"
        );

        const dresses =
        await response.json();

        const dress =
        dresses.find(
            d => d.id == dressId
        );

        if (!dress) {

            document.querySelector(
                ".detail-card"
            ).innerHTML = `
                <h2>
                    Dress not found
                </h2>
            `;

            return;
        }

        document
        .getElementById(
            "dressName"
        ).textContent =
        dress.name;

        document
        .getElementById(
            "dressPrice"
        ).textContent =
        "Rp " +
        Number(
            dress.price
        ).toLocaleString();

        document
        .getElementById(
            "dressSize"
        ).textContent =
        "Size : " +
        dress.size;

        document
        .getElementById(
            "dressStock"
        ).textContent =
        "Stock : " +
        dress.stock;

        document
        .getElementById(
            "dressCategory"
        ).textContent =
        "Category : " +
        dress.category;

        document
        .getElementById(
            "dressDescription"
        ).textContent =
        dress.description;

        const imageUrl =
        getImageUrl(
            dress.image
        );

        document
        .querySelector(
            ".detail-image"
        ).innerHTML = imageUrl
            ? `
            <img
                src="${imageUrl}"
                alt="${dress.name}"
                class="detail-photo"
                onerror="
                    this.style.display='none';
                    this.parentNode.innerHTML=
                    '<div class=placeholder>No Image</div>';
                "
            >
            `
            : `
            <div class="placeholder">
                No Image
            </div>
            `;

    } catch (error) {

        console.error(
            "Failed loading dress detail:",
            error
        );

        document.querySelector(
            ".detail-card"
        ).innerHTML = `
            <h2>
                Error loading dress data
            </h2>
        `;
    }
}

loadDetail();