var simulation = require('./simulation');
var dataCleaning = require('./dataCleaning');
var likelihood = simulation.likelihood,
  Math = simulation.Math,
  getPosterior = simulation.getPosterior,
  getFilterScore = simulation.getFilterScore,
  filteringOut = simulation.filteringOut;

var prepareChartData = dataCleaning.prepareChartData;

// start simulation
var dataset = [1,1,0,1,1,1,0,1,0,0];
var nDraws = 10000;
var n = dataset.length;
// Simulate prior with an uniform distribution
var priors = likelihood(nDraws, function(){
  return Math.random();
});

// Simulate Posteriors with a binomial generative model(likelihood)
var posteriors = getPosterior(priors, n, function(ele, n){
  var posterior = [];
  likelihood(n, function(p = ele){
    posterior.push(Math.getBinomial(p));
  });
  return posterior;
});

// Calculate filter score
var filterScore = getFilterScore(dataset, function(ele, i, dataset){
  return ele;
});

// Filtering out those parameter values that didn't result in the
// data that we actually observed
var postRate = filteringOut(filterScore, priors, posteriors, function(filterScore, prior, posterior){
  var sumOfPosterior = 0;

  for(var i = 0; i < posterior.length; i++){
    sumOfPosterior += posterior[i];
  }
  if(filterScore === sumOfPosterior){
    return true;
  }
});

// Prepare Data to plot
var chartData = prepareChartData(postRate, 20); // we should allow user to choose bin from browser
