
function otu () {
    var dropdownMenu = d3.select("#selDataset");
    
    // Get dropdown selection's Value property to use as JSON index number
    var idIndex = dropdownMenu.property("value");

    d3.json("data/samples.json").then(function(data) {

        // Display demographic info
        var metadata = data.metadata;
        var idMeta = metadata[idIndex];
        var idPairs = (Object.entries(idMeta));

        // Clear table data
        var table = d3.select("#sample-metadata");
        table.html("");

        // Create new table
        var sampleData = d3.select("#sample-metadata").append("table");

        idPairs.forEach(function(sample) {
            var row = sampleData.append("tr");
            var cell = row.append("td");
            cell.text(sample);
        });

        // Plot bar chart
        var idData = data.samples;
        var sample_values = idData[idIndex].sample_values;
        var otu_ids = idData[idIndex].otu_ids;
        var otu_labels = idData[idIndex].otu_labels;
        var topTenValues = sample_values.slice(0,10);
        var topTenIds = otu_ids.slice(0,10);
        var topTenHover = otu_labels.slice(0,10);
        var topTenLabels = topTenIds.map(t => "OTU "+t);
        var trace1 = {x:topTenValues,y:topTenLabels, type:"bar", text:topTenHover, orientation:'h'};
        var barPlot = [trace1];
        var layout = {title:"Top 10 Bacteria Cultures Found",yaxis:{autorange:'reversed'}}
        Plotly.newPlot("bar", barPlot, layout);

        // Plot bubble chart
        var trace2 = {
            type: "scatter",
            mode: "markers",
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            marker: {
                color: otu_ids,
                size: sample_values
            }
        }
        var data = [trace2];
        var layout = {title:"Bacteria Cultures Per Sample"}
        Plotly.newPlot("bubble", data, layout);

        // Display gauge chart
        var washFreq = idMeta.wfreq;

        var trace3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washFreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [0, 9] },
                    }
            }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot("gauge", trace3, layout);

        })
        
}

// Display dropdown selections
// Use Value property as JSON index value
dropDown = d3.select("#selDataset");

d3.json("data/samples.json").then(function(data) {
    var names = data.names;
    option = dropDown.append("option");
    option.text("");
    names.forEach(function(name){
        option = dropDown.append("option");
        option.text(name);
        option.attr("value", names.indexOf(name))
    })
});

d3.selectAll("#selDataset").on("change", otu);