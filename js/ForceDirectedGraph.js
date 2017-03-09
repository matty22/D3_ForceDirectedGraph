// Force Directed Graph JS
// Relied upon the d3 tutorial series by Stephen Thomas http://bl.ocks.org/sathomas/11550728
// And this youtube tutorial was very helpful as well https://www.youtube.com/watch?v=HP1tOlxVYz4

// TODO: Make the tooltip location more flexible. Right now on larger displays it shows up a little too centered

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);

            // Instantiate global variables
            var svgWidth = 800;
            var svgHeight = 600;
            var links = json.links;
            var nodes = json.nodes;

            // Setup tooltip div
            var tooltip = d3.select('body')
                            .append('div')
                            .attr('class', 'tooltipStyles');

            // Append svg to body
            var svg = d3.select('#chartDiv')
                        .append('svg')
                        .attr('width', svgWidth)
                        .attr('height', svgHeight);

            // Create the force layout
            var force = d3.layout.force()
                                 .size([svgWidth, svgHeight])
                                 .nodes(nodes)
                                 .links(links)
                                 .on('tick', tick)
                                 .linkDistance(20)
                                 .charge(-50)
                                 .start();
            
            // Create the links and append to svg
            var link = svg.selectAll('.link')
                          .data(links)
                          .enter()
                          .append('line')
                          .attr('class', 'link');
            
            // Create the nodes and append to svg
            var node = d3.select('#chartDiv').selectAll('img')
                          .data(nodes)
                          .enter()
                          .append('img')
                          .attr('class', function(d) { return 'flag flag-' + d.code })
                          .on('mouseover', function(d) {
                                            tooltip.transition().style('display', 'block')
                                            tooltip.html(d.country)
                                                   .style('left', '850px')
                                                   .style('top', '100px')
                                                   .style('z-index', 2)})
                          .on('mouseout', function(d) {
                                            tooltip.transition().style('display', 'none');
                          });
            
            // Function that controls the dragging and moving the links around upon drag
            function tick(e) {
              link.attr('x1', function(d) { return d.source.x; });
              link.attr('y1', function(d) { return d.source.y; });
              link.attr('x2', function(d) { return d.target.x; });
              link.attr('y2', function(d) { return d.target.y; });

              node.style('left', function(d) { return d.x - 8 + 'px'; })
                  .style('top', function(d) { return d.y - 5 + 'px'; })
                  .call(force.drag);
            }     
        }
        else {
            // Handle error if xhr request fails
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();


