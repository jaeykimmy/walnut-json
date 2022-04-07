let express = require("express");
let app = express();
let json = require('./data.json');
let bodyParser = require('body-parser');

let jsonParser = bodyParser.json();

// let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});



app.get("/", (req, res, next) => {
  res.json(json.recipes);
});

app.get("/recipes", (req, res, next) => {
  let recipes = json.recipes;
  let finalArr = [];
  // for (let i = 0; i < recipes.length; i++) {
  //   finalArr.push(recipes[i].name);
  // }
  
  // recipes.forEach(obj => {
  //   // console.log(obj);
  //   finalArr.push(obj.name);
  // });

  let superArr = recipes.map(obj => {
    return obj.name;
  });

  console.log(superArr);
  res.json({ recipeName: superArr });
});

app.get(`/recipes/details/:recipeName`, (req, res, next) => {
  let recipeName = req.params.recipeName;
  let recipes = json.recipes;

  
  let ingredientArr = recipes.filter(obj => obj.name === recipeName);
  if (ingredientArr.length === 0) {
    res.json({});
  } else {
    res.json({
      "details": {
        "ingredients": ingredientArr[0].ingredients,
        "numsteps": ingredientArr[0].ingredients.length
      }});
  }
});

app.post(`/recipes`, jsonParser, (req, res, next) => {
  // console.log(req.body);
  let recipes = json.recipes;
  let duplicateRecipe = false;

  for (let recipe of recipes) {
    if (req.body.name === recipe.name) {
      duplicateRecipe = true;
      //check if theres a way to have line 66 stop line 71 from executing
      break;
    }
  }
  if (!duplicateRecipe) {
    recipes.push(req.body);
    res.sendStatus(200);
  } else {
    res.status(400).send({ "error": "Recipe already exists" });
  }
});

app.put(`/recipes`, jsonParser, (req, res, next) => {
  
  let recipes = json.recipes;
  let duplicateRecipe = false;
  console.log('recipes0', recipes[0]);
  for (let recipe of recipes) {
    if (req.body.name === recipe.name) {
      duplicateRecipe = true;
      break;
    }
  }
  if (duplicateRecipe) {
    let recipes = json.recipes;
    console.log("reqname", req.body);
    console.log(recipes);
    let index = recipes.findIndex((obj => obj.name === req.body.name));
    console.log("index", index);
    if (index !== -1) {
      recipes[index] = req.body;
    }
    res.sendStatus(200);
  } else {
    res.status(400).send({ "error": "Recipe doesn't exist" });
  }

  console.log(recipes.indexOf(req.body));

  
});