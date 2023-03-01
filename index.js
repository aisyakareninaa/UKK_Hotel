const express = require(`express`);
const app = express();
const PORT = 8000;
const cors = require(`cors`);
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRoute = require(`./routes/user.routes`);
app.use(`/user`, userRoute);

const tipeKamarRoute = require(`./routes/tipe_kamar.routes`);
app.use(`/tipe-kamar`, tipeKamarRoute);

const KamarRoute = require(`./routes/kamar.routes`);
app.use(`/kamar`, KamarRoute);

const pemesananRoute=require(`./routes/pemesanan.routes`);
app.use(`/pemesanan`, pemesananRoute);

app.use(express.static(__dirname));
app.use(express.static("foto-kamar"));
app.use(express.static("foto-user"));

app.listen(PORT, () => {
  console.log(`Server of Hotel runs on port
${PORT}`);
});
