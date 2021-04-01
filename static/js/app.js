// Create variables for data needed



// function init() {

//     let jsonData = d3.json("data/samples.json").then(data => {
//         console.log(data);
    
//         let idSelect = d3.select("#selDataset");
    
//         jsonData.names.forEach(element => {
//             idSelect.append("option").attr("value", element).text(element);
//         })
//     })
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
//     console.log(id)


//     // var data = [{
//     //   values: us,
//     //   labels: labels,
//     //   type: "pie"
//     // }];
  
//     // var layout = {
//     //   height: 600,
//     //   width: 800
//     // };
  
//     // Plotly.newPlot("pie", data, layout);
//   }
//   let idSelect = d3.select("#selDataset");
//   let id = idSelect
// //   let SampleOtuId = data.samples.otu_ids;
//   console.log(id)

// updateDashboard = (data) => {
//     let id = d3.event.target.value;
//     let sample = data.samples.filter(sample => sample.id === id);
//     let otusSample = sample.otu_ids;
//     let valuesSample = sample.sample_values;
// }
function init(){
    let data = d3.json("data/samples.json").then(data => {
        console.log(data);
    

        let idSelect = d3.select("#selDataset");
        
        data.names.forEach(element => {
            idSelect.append("option").attr("value", element).text(element);
        })

        // idSelect.on("change", () => updateDashboard(data));

        // console.log(id);
        // console.log(sample);
        // console.log(xBubble)
        // console.lob(yBubble)
    })
};
// Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.
init()