import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import bodyParser from "body-parser";

import getLocation from "./services/location.service.js";

import getAutocomplete from "./services/autocomplete.service.js";

/* Getting current directory */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Express app settings */
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/* Express routes */
app.get("/", (req, res) => {
  let features = [
  ];

  res.render("index.ejs", { features: features });
});

app.post("/", (req, res) => {
  let location = req.body.location;

  if (location) {
    getAutocomplete(location).then(res2 => {
      let features = res2["features"];
      res.update({features: features});

    });
    console.log(req.body.location);  
  }
});

/* Start server and listen on provided port */
app.listen(port, () => {
  console.log(`Server started, running on port ${port}`);
});
