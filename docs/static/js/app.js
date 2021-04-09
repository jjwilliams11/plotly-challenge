function init(){

    let idSelect = d3.select("#selDataset");
    
    let subjectData = d3.json("data/samples.json").then(data => {

         
         // Establish Dropdown for Sample ID's
        data.names.forEach(element => {
            idSelect.append("option").attr("value", element).text(element);
        })

        // Establish Subject ID and Meta ID
        let subjectID = idSelect.property("value");
 
        let metaID = parseInt(subjectID);

        // Filter and Sort Metadata
        let filterMeta = data.metadata.filter(meta => meta["id"] === metaID);

        let subjectMeta = filterMeta[0];

        let subjectDemographics = sortObj(subjectMeta);
        console.log(filterMeta)
        
        // Filter and Sort sample information and sort in descending order
        let sample = data.samples.filter(sample => sample["id"] === subjectID);

        let sortSample = sample.sort(function compare(first,second){
            return second - first;
        })
       
        // Estable sample variable to use with charts
        let sampleotuIds = sortSample.map(otu => otu.otu_ids);
        let sampleValues = sortSample.map(val => val.sample_values);
        let otuLabels = sortSample.map(lab => lab.otu_labels);
 
        




         
        d3.select("#sample-metadata").text("");
        
       // Run Initial Demographics and Charts
        Demographics(subjectDemographics)
        
        barChart(sampleotuIds, sampleValues, otuLabels)

        bubbleChart(sampleotuIds, sampleValues, otuLabels)

        gaugeChart(subjectDemographics)

        idSelect.on("change", () => optionChanged(idSelect));

    })
};


function Demographics(subjectDemographics){


    let idDemographics = d3.select("#sample-metadata");

    // Loop through object and insert into Demographics Section
    Object.entries(subjectDemographics).forEach(([key,value]) => {
       eKey = key.toUpperCase();
       idDemographics.append("option").text(`${eKey} : ${value}`);
   })
}


function barChart(sampleotuIds, sampleValues, otuLabels){

    // Setup variable for chart
    otuIds = sampleotuIds[0].slice(0,10).reverse(),
    barValues = sampleValues[0].slice(0,10).reverse();
    barLabels = otuLabels[0].slice(0,10).reverse();
    barIds =[]
    otuIds.forEach(val => {
        barIds.push(`OTU ${val}`)
    });

    // Establish random colors for chart
    randomColor(barIds)

    // Establesh Bar Chart Data
    let barTrace = {
        type: "bar",
        y: barIds,
        x: barValues,
        orientation: 'h',
        text: barLabels,
        marker:{
            color: colors,
        }
    }

    let barLayout = {
        margin: {
          l: 100,
          r: 50,
          b: 100,
          t: 0,
          pad: 4
        }
      };

    // Store Bar Chart Data into an Array
    let barData = [barTrace];
    
    // Print Bar Chart
    Plotly.newPlot("bar", barData, barLayout, {displayModeBar: false});

}


function bubbleChart(sampleotuIds, sampleValues, otuLabels){

    // Setup variable for chart
    bubbleOtuIds = sampleotuIds[0];
    bubbleValues = sampleValues[0];
    bubbleLabels = otuLabels[0];

    // Establish random colors for chart
    randomColor(bubbleOtuIds)

    // Establesh Bubble Chart Data
    let bubbleTrace = {
        type: 'scatter',
        x: bubbleOtuIds,
        y: bubbleValues,
        mode: 'markers',
        text: bubbleLabels,
        marker:{
            color: colors,
            size: bubbleValues,
        }
    };

    // Store Bubble Chart Data into an Array
    let bubbleData = [bubbleTrace];

    let bubbleLayout = {
        margin: {
          l: 25,
          r: 25,
          b: 25,
          t: 25,
          pad: 4
        }
      };

    // Print Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout, {displayModeBar: false})

}

function gaugeChart(subjectDemographics){

    let washFreq =subjectDemographics.wfreq

    let gaugeTrace = {
        type: "indicator",
        mode: "gauge+number+delta",
        value: washFreq,
        title: { text: "Belly Button Wash Frequency", font: { size: 20 } },
        gauge: {
            axis: {range: [null, 9], tickwidth: .5, tickcolor: "darkblue"},
            bar: {color: "gold"},
            steps: [
                {range: [0,1], color: "aliceblue"},
                {range: [1,2], color: "lightskyblue"},
                {range: [2,3], color: "skyblue"},
                {range: [3,4], color: "deepskyblue"},
                {range: [4,5], color: "dodgerblue"},
                {range: [5,6], color: "blue"},
                {range: [6,7], color: "mediumblue"},
                {range: [7,8], color: "darkblue"},
                {range: [8,9], color: "midnightblue"}
                
            ]
        }
    }

    let gaugeData = [gaugeTrace]

    let gaugeLayout = {
        margin: { t: 0, 
                r: 25, 
                l: 25, 
                b: 0 }
    }
  
      
      Plotly.newPlot('gauge', gaugeData, gaugeLayout, {displayModeBar: false});
}

let colors = []

function randomColor(arr){
    
    arr.forEach(i => {
    let r = Math.floor(Math.random() * (255 - 0 + 1) + 40);
    let g = Math.floor(Math.random() * (255 - 0 + 1) + 40);
    let b = Math.floor(Math.random() * (255 - 0 + 1) + 40);
    rgb = 'rgb('+ r + ', ' + g + ', ' + b + ')',
    colors.push(rgb);
    })
}


// Snippet found at W3docs --- https://www.w3docs.com/snippets/javascript/how-to-sort-javascript-object-by-key.html
function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
  }


optionChanged = () => {

    let subjectID = d3.select("#selDataset").property("value");
    init(subjectID)
}




init()
