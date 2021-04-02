// Create variables for data needed


//     // let id = d3.event.target.value
//     // let sample = data.samples.filter(sample => sample.id === id);
//     // let sampleOtuId = sample.otu_ids;
//     // let sampleValues = sample.sample_values;

//     // trace1 = {
//     //     x: sampleOtuId,
//     //     y:sampleValues
//     // };
//     // data = [trace1]


//     // Plotly.newPlot("bar", data)

// updateDashboard = (data) => {
//     let id = d3.event.target.value;
//     let sample = data.samples.filter(sample => sample.id === id);
//     let otusSample = sample.otu_ids;
//     let valuesSample = sample.sample_values;
// }

function barChart(otuIds, sampleValues, otuLabels){

    // Establesh Bar Chart Data
    let barTrace = {
        type: "bar",
        y: otuIds,
        x: sampleValues,
        orientation: 'h',
        text: otuLabels
    }

    // Store Bar Chart Data into an Array
    let barData = [barTrace];

    // Setup Bar Chart Layout
    let barLayout = {
        title: "Top 10 OTU'S",
        yaxis: {
            showticklabels: true,
        }

    }

    // Print Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
    console.log(barData)

}


let colors = []
function randomColor(Ids){
    

    Ids.forEach(i => {
    let r = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    let g = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    let b = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    rgb = 'rgb('+ r + ', ' + g + ', ' + b + ')',
    colors.push(rgb);
    })
}
console.log(colors)

function init(){
    let subjectData = d3.json("data/samples.json").then(data => {
    
        let idSelect = d3.select("#selDataset");
        
        data.names.forEach(element => {
            idSelect.append("option").attr("value", element).text(element);
        })

        let subjectID = "940"

        let sample = data.samples.filter(sample => sample["id"] === subjectID);
        let sortSample = sample.sort(function compare(first,second){
            return second - first;
        })
       
        let sampleotuIds = sortSample.map(otu => otu.otu_ids);
        let sampleValues = sortSample.map(val => val.sample_f);
        let otuLabels = sortSample.map(lab => lab.otu_labels);

        Ids = sampleotuIds[0].slice(0,10)
        sampleValues = sampleValues[0].slice(0,10);
        otuLabels = otuLabels[0].slice(0,10);
        otuIds =[]
        Ids.forEach(val => {
            otuIds.push(`OTU ${val}`)
        });

        console.log(sampleValues)
        console.log(otuIds)
        console.log(otuLabels)
       

        barChart(otuIds, sampleValues, otuLabels);
        randomColor(Ids)
        
        let bubbleTrace = {
            x: Ids,
            y: sampleValues,
            mode: 'markers',
            text: otuLabels,
            marker:{
                color:[randomColor(Ids)],
                size: sampleValues,
            }
        };

        let bubbleLayout = {
            title: "Bubble"
        }

        let bubbleData = [bubbleTrace];

        Plotly.newPlot('bubble', bubbleData)

    })
};
init()
