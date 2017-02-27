function likelihood(nDraws, generativeModel){
  var simulations = [];
  for(var i = 0; i < nDraws; i++){
    simulations.push(generativeModel());
  }
  return simulations;
}

//add a binomial generator to Math Class
Math.getBinomial = function (p) {
  if(Math.random() >= p){
    return 1;
  }
  return 0;
};

// Posterior simulatior
function getPosterior(priors, n, callback){
  var posteriors = [];
  for(var i = 0; i < priors.length; i++){
    var prior = priors[i];
    posteriors.push(callback(prior, n));
  }
  return posteriors;
}

// Function to calculate filter score
// Later on we should change this to a Higher-Order Function
function getFilterScore(dataset, cb){
  var filterScore = 0;
  for(var i = 0; i < dataset.length; i++){
    var ele = dataset[i];
    filterScore += cb(ele, i, dataset);
  }
  return filterScore;
}

// Function to filtering out those parameter values that didn't result in the
// data that we actually observed
function filteringOut(filterScore, priors, posteriors, cb){
  var postRate = [];
  for(var i = 0; i < priors.length; i++){
    var prior = priors[i];
    var posterior = posteriors[i];

    if(cb(filterScore, prior, posterior)){
      postRate.push(priors[i]);
    }
  }
  return postRate;
}

module.exports = {
  likelihood: likelihood,
  Math: Math,
  getPosterior: getPosterior,
  filteringOut: filteringOut,
  getFilterScore: getFilterScore
};
