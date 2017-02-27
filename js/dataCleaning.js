function prepareChartData(data, binSize){
  var minData = Math.floor(Math.min(...data));
  var maxData = Math.ceil(Math.max(...data));
  var binLength = (maxData - minData) / binSize;

  var bins = [];
  for(var i = 0; i < binSize; i++){
    var bin = {};
    var binRange = minData + (i+1) * binLength;
    var value = 0;
    for(var j = 0; j < data.length; j++){
      if(data[j] <= binRange){
        value += 1;
        data.splice(j,1);
      }
    }

    bin.id = i;
    bin.range = binRange;
    bin.value = value;
    bins.push(bin);
  }

  return bins;
}

module.exports = {
  prepareChartData: prepareChartData
}
