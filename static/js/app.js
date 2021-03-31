

let data = d3.json("data/samples.json").then(data => {
    console.log(data);

    let idSelect = d3.select("#selDataset");
    
    data.names.forEach(element => {
        idSelect.append("option").attr("value", element).text(element);
    })
})
    

// console.log(data)