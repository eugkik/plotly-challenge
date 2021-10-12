# plotly-challenge

The plots.js Javascript file reads the samples.json data file in the data directory to create a Belly Button Biodiversity Dashboard.

The "names" array is used to create a drop down options list on the index.html web page.  The index value for each name ID is used as the Value attribute for each option.

After the user selects an ID from the drop down list, the index value is used to retrieve the corresponding data from the samples.json file for that ID.  This data is used to display the demographic information, plot a bar chart with the top 10 bacteria cultures found, and to create a bubble chart with all bacteria found for that ID.  A gauge chart is also created to display the belly button washing frequency.