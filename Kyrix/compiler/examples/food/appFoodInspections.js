// libraries
const Project = require("../../src/index").Project;
const Canvas = require("../../src/Canvas").Canvas;
const Jump = require("../../src/Jump").Jump;
const Layer = require("../../src/Layer").Layer;
const View = require("../../src/View").View;

// project components
const renderers = require("./renderers");
const transforms = require("./transforms");
const placements = require("./placements");

// construct a project
var p = new Project("foodInspections", "../../../config.txt");
p.addRenderingParams(renderers.renderingParams);

// ================== Canvas overallcategories ===================
var overallCategoriesCanvas = new Canvas("overallCategoriesCanvas", 1000, 1000);
p.addCanvas(overallCategoriesCanvas);

// categories layer
var overallCategoriesLayer = new Layer(null, true);
overallCategoriesCanvas.addLayer(overallCategoriesLayer);
overallCategoriesLayer.addRenderingFunc(renderers.teamLogoRendering); // check renderers.js to see how to implement your own rendering function

p.saveProject();
