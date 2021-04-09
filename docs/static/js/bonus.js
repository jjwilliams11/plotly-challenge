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