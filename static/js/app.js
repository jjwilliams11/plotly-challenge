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

function barChart(barIds, barValues, barLabels){

    // Establesh Bar Chart Data
    let barTrace = {
        type: "bar",
        y: barIds,
        x: barValues,
        orientation: 'h',
        text: barLabels
    }

    // Store Bar Chart Data into an Array
    let barData = [barTrace];

    // Setup Bar Chart Layout
    // let barLayout = {
    //     title: "Top 10 OTU'S",
    //     yaxis: {
    //         showticklabels: true,
    //     }

    // }

    // Print Bar Chart
    Plotly.newPlot("bar", barData);
    console.log(barData)

}


let colors = []
function randomColor(bubbleOtuIds){
    

    bubbleOtuIds.forEach(i => {
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


        otuIds = sampleotuIds[0].slice(0,10),
        barValues = sampleValues[0].slice(0,10);
        barLabels = otuLabels[0].slice(0,10);
        barIds =[]
        otuIds.forEach(val => {
            barIds.push(`OTU ${val}`)
        });

        bubbleOtuIds = sampleotuIds[0];
        bubbleValues = sampleValues[0];
        bubbleLabels = otuLabels[0];
        
        // console.log(bubbleValues)
        // console.log(bubbleOtuIds)
        // console.log(bubbleLabels)
        // console.log(sampleotuIds)
       

        barChart(barIds, barValues, barLabels);
        // randomColor(Ids)
        
        let bubbleTrace = {
            type: 'scatter',
            x: bubbleOtuIds,
            y: bubbleValues,
            mode: 'markers',
            text: bubbleLabels,
            marker:{
                color:randomColor(bubbleOtuIds),
                size: bubbleValues,
            }
        };

        let bubbleLayout = {
            title: "Bubble"
        }

        let bubbleData = [bubbleTrace];

        Plotly.newPlot('bubble', bubbleData, bubbleLayout)

        console.log(bubbleData)

    })
};
init()
