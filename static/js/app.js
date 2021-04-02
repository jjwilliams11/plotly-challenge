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
       
        let barTrace = {
            type: "bar",
            y: otuIds,
            x: sampleValues,
            orientation: 'h',
            text: otuLabels
        }

        let barData = [barTrace];

        let barLayout = {
            title: "Top 10 OTU'S",
            yaxis: {
                showticklabels: true,
                
            }

        }


        
        
        Plotly.newPlot("bar", barData, barLayout);
        // console.log(xBubble)
        // console.lob(yBubble)
        console.log(barData)

        var testdata = [{
            type: 'bar',
            x: [20, 14, 23],
            y: ['giraffes', 'orangutans', 'monkeys'],
            orientation: 'h'
          }];
        
        //   Plotly.newPlot ("bar", testdata)

    })
};
// Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.
init()