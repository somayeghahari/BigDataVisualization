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

// definition of projects, views, canvases, layers and jumps
// construct a project
var p = new Project("nyc_taxi", "../../../config.txt");
p.addRenderingParams(renderers.renderingParams);

// ================== Canvas city ===================
var cityCanvas = new Canvas("city", 1000, 1000);
p.addCanvas(cityCanvas);

// city layer
var cityLayer = new Layer(transforms.cityTransform, true);
cityCanvas.addLayer(cityLayer);
cityLayer.addRenderingFunc(renderers.cityRendering);

// ================== Canvas region ===================
var width = 1000 * 16;
var height = 1000;

// construct a new canvas
var regionCanvas = new Canvas("region", width, height);
p.addCanvas(regionCanvas);

// pannable timeline layer
var regionLayer = new Layer(transforms.regionTransform, false);
regionCanvas.addLayer(regionLayer);
regionLayer.addPlacement(placements.regionPlacement);
regionLayer.addRenderingFunc(renderers.regionRendering);

// static background layer
//var timelineBkgLayer = new Layer(transforms.teamTimelineStaticTransform, true);
//regionCanvas.addLayer(timelineBkgLayer);
//regionBkgLayer.addRenderingFunc(renderers.regionStaticBkg);

// ================== Views ===================
var view = new View("nyc taxi", 0, 0, 1000, 1000);
p.addView(view);
p.setInitialStates(view, cityCanvas, 0, 0);

// ================== Canvas 1 <-> Canvas 2 ===================
p.addJump(new Jump(cityCanvas, regionCanvas, "literal_zoom_in"));
p.addJump(new Jump(regionCanvas, cityCanvas, "literal_zoom_out"));

// save to db
p.saveProject();
