const tg = window.Telegram.WebApp;
tg.expand();

const starCatalog = document.getElementById("catalog-stars");
const premiumCatalog = document.getElementById("catalog-premium");

// ========== STAR PACKS ==========
const starPacks = [];
for (let i = 50; i <= 1000; i += 50) {
    starPacks.push({
        amount: i,
        priceTon: (i * 0.01).toFixed(2)
    });
}

// PREMIUM OPTIONS
const premium = [
    { title: "Telegram Premium — 1 Month", priceTon: 3, id: "premium_1m" },
    { title: "Telegram Premium — 1 Year", priceTon: 36, id: "premium_1y" }
];


function renderStars() {
    starPacks.forEach(pack => {
        const c = document.createElement("div");
        c.className = "card";
        c.innerHTML = `
            <h3>${pack.amount} Stars</h3>
            <p class="price">${pack.priceTon} TON</p>
            <button class="button" onclick="buy('stars_${pack.amount}', ${pack.priceTon})">Buy</button>
        `;
        starCatalog.appendChild(c);
    });
}

function renderPremium() {
    premium.forEach(p => {
        const c = document.createElement("div");
        c.className = "card";
        c.innerHTML = `
            <h3>${p.title}</h3>
            <p class="price">${p.priceTon} TON</p>
            <button class="button" onclick="buy('${p.id}', ${p.priceTon})">Buy</button>
        `;
        premiumCatalog.appendChild(c);
    });
}

renderStars();
renderPremium();

function buy(type, price) {
    fetch(`/createInvoice?label=${type}&price=${price}`)
        .then(r => r.json())
        .then(data => {
            tg.openInvoice(data.invoice_id, status => {
                if (status === "paid") {
                    tg.showAlert("Purchase successful!");
                } else {
                    tg.showAlert("Payment failed.");
                }
            });
        });
}