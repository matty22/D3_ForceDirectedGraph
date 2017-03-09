// Force Directed Graph JS

// Scatterplot.js

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);
            console.log(json);

            var svgWidth = 800;
            var svgHeight = 600;
            
            var links = json.links;
            var nodes = json.nodes;
            
        }
        else {
            // Handle error if xhr request fails
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();


