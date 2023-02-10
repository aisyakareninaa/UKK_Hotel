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

app.listen(PORT, () => {
  console.log(`Server of Hotel runs on port
${PORT}`);
});
