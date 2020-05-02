"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var CORS = require("cors");

var app = express();
var token = "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";
app.use(bodyParser.json());
app.use(CORS());
var colors = [{
  color: "aliceblue",
  code: {
    hex: "#f0f8ff"
  },
  id: 1
}, {
  color: "limegreen",
  code: {
    hex: "#99ddbc"
  },
  id: 2
}, {
  color: "aqua",
  code: {
    hex: "#00ffff"
  },
  id: 3
}, {
  color: "aquamarine",
  code: {
    hex: "#7fffd4"
  },
  id: 4
}, {
  color: "lilac",
  code: {
    hex: "#9a99dd"
  },
  id: 5
}, {
  color: "softpink",
  code: {
    hex: "#dd99ba"
  },
  id: 6
}, {
  color: "bisque",
  code: {
    hex: "#dd9a99"
  },
  id: 7
}, {
  color: "softyellow",
  code: {
    hex: "#dcdd99"
  },
  id: 8
}, {
  color: "blanchedalmond",
  code: {
    hex: "#ffebcd"
  },
  id: 9
}, {
  color: "blue",
  code: {
    hex: "#6093ca"
  },
  id: 10
}, {
  color: "blueviolet",
  code: {
    hex: "#8a2be2"
  },
  id: 11
}];
var nextId = 12;

function authenticator(req, res, next) {
  var authorization = req.headers.authorization;

  if (authorization === token) {
    next();
  } else {
    res.status(403).json({
      error: "User must be logged in to do that."
    });
  }
}

app.post("/api/login", function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  if (username === "Lambda School" && password === "i<3Lambd4") {
    req.loggedIn = true;
    setTimeout(function () {
      res.status(200).json({
        payload: token
      });
    }, 1000);
  } else {
    res.status(403).json({
      error: "Username or Password incorrect. Please see Readme"
    });
  }
});
app.get("/api/colors", authenticator, function (req, res) {
  res.send(colors);
});
app.post("/api/colors", authenticator, function (req, res) {
  if (req.body.color !== undefined && req.body.code !== undefined) {
    var newcolor = req.body;
    newcolor.id = nextId;
    colors.push(newcolor);
  }

  nextId = nextId + 1;
  res.status(201).json(colors);
});
app.put("/api/colors/:id", authenticator, function (req, res) {
  if (!req.params.id) res.status(400).send("Your request is missing the color id");

  if (req.body.id === undefined || !req.body.color || !req.body.code) {
    res.status(422).send("Make sure your request body has all the fields it needs");
  }

  colors = colors.map(function (color) {
    if ("".concat(color.id) === req.params.id) {
      return req.body;
    }

    return color;
  });
  res.status(200).send(req.body);
});
app["delete"]("/api/colors/:id", authenticator, function (req, res) {
  if (!req.params.id) {
    res.status(400).send("Your request is missing the color id");
  }

  colors = colors.filter(function (color) {
    return "".concat(color.id) !== req.params.id;
  });
  res.status(202).send(req.params.id);
});
app.get("/", function (req, res) {
  res.send("App is working 👍");
});
app.listen(5000, function () {
  console.log("Server listening on port 5000");
});