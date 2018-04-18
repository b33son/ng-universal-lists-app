/*
 * File: /Users/michaelbeeson/Documents/VSCode/angular-001/ng-universal-lists-app/server.js
 */

"use strict";

// node js version of zone.js used for change detection
require("zone.js/dist/zone-node");

// handles meta data changes
require("reflect-metadata");

const express = require("express");
const ngUniversal = require("@nguniversal/express-engine");
const {
  provideModuleMap
} = require("@nguniversal/module-map-ngfactory-loader");

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require("./dist-server/main.bundle");

function angularRouter(req, res) {
  res.render("index", { req, res });
}

const app = express();

app.engine(
  "html",
  ngUniversal.ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);
app.set("view engine", "html");
app.set("views", "dist");

app.get("/", angularRouter);

// Handles static routes to images and other files
app.use(express.static(`${__dirname}/dist`));

// redirects all other routes to the angularRouter
app.get("*", angularRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
