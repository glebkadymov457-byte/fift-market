require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.static("../webapp"));

app.get("/createInvoice", async (req, res) => {
    const label = req.query.label;
    const price = req.query.price;

    try {
        const r = await axios.post(
            "https://pay.crypt.bot/api/createInvoice",
            {
                amount: price,
                currency_type: "crypto",
                asset: "TON",
                description: label,
                hidden_message: "You will receive your digital goods after payment.",
                paid_btn_name: "viewBot",
                paid_btn_url: "https://t.me/Forget_Land",
                allow_comments: false,
                allow_anonymous: false,
                expires_in: 600
            },
            {
                headers: { "Crypto-Pay-API-Token": process.env.CRYPTOPAY_TOKEN }
            }
        );

        res.json({ invoice_id: r.data.result.invoice_id });

    } catch (e) {
        console.error(e.response?.data);
        res.json({ error: "invoice_error" });
    }
});

app.listen(3000, () => console.log("Store running on http://localhost:3000"));