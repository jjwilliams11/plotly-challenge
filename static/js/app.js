
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
    otuIds = sampleotuIds[0].slice(0,10),
    barValues = sampleValues[0].slice(0,10);
    barLabels = otuLabels[0].slice(0,10);
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

    // Store Bar Chart Data into an Array
    let barData = [barTrace];
    
    // Print Bar Chart
    Plotly.newPlot("bar", barData);

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

    // Print Bubble Chart
    Plotly.newPlot('bubble', bubbleData)

}

let colors = []

function randomColor(arr){
    
    arr.forEach(i => {
    let r = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    let g = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    let b = Math.floor(Math.random() * (255 - 0 + 1) + 0);
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

    // Prevent the page from refreshing
    // d3.event.preventDefault();

    let subjectID = d3.select("#selDataset").property("value");
    
    init(subjectID)
}



function init(){
    let subjectData = d3.json("data/samples.json").then(data => {

         
        let idSelect = d3.select("#selDataset");

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

        
        // Filter and Sort sample information and sort in descending order
        let sample = data.samples.filter(sample => sample["id"] === subjectID);

        let sortSample = sample.sort(function compare(first,second){
            return second - first;
        })
       
        // Estable sample variable to use with charts
        let sampleotuIds = sortSample.map(otu => otu.otu_ids);
        let sampleValues = sortSample.map(val => val.sample_f);
        let otuLabels = sortSample.map(lab => lab.otu_labels);
 
         
        
       // Run Initial Demographics and Charts
        Demographics(subjectDemographics)
        
        barChart(sampleotuIds, sampleValues, otuLabels)

        bubbleChart(sampleotuIds, sampleValues, otuLabels)

        idSelect.on("change", () => optionChanged(idSelect));

    })
};
init()
