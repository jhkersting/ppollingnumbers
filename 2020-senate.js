var map = d3.select("#usmap")
    .append("svg")
    .attr("viewBox", '75 -40 900 550');

var widthmap = 1020
var heightmap = 500;
var projection = d3.geoAlbersUsa()
    .translate([widthmap / 2, heightmap / 2])
    .scale([900]);
var path = d3.geoPath()
    .projection(projection);


var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 245.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 240.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 225.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 223.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 198.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 255.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 262.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 255.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 160.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 280.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 112.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 215.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 195.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 310.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 158.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 290.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 368.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 230.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 250.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 175.6255 }]
var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"]);
var ratingScale = [
    { rating: "Uncontested D", color: color(0), ratingNum: 0, party: "DEM" },
    { rating: "Solid D", color: color(0), ratingNum: 0, party: "DEM" },
    { rating: "Likely D", color: color(20), ratingNum: 10, party: "DEM" },
    { rating: "Lean D", color: color(35), ratingNum: 25, party: "DEM" },
    { rating: "Tossup", color: "white", ratingNum: 50, party: "NA" },
    { rating: "Lean R", color: color(65), ratingNum: 75, party: "REP" },
    { rating: "Likely R", color: color(80), ratingNum: 90, party: "REP" },
    { rating: "Solid R", color: color(100), ratingNum: 100, party: "REP" },
    { rating: "Uncontested R", color: color(100), ratingNum: 100, party: "DEM" },
    { rating: "-", color: "lightgray", ratingNum: 50, party: "NA" }
]

queue()
    .defer(d3.json, "https://projects.jhkforecasts.com/presidential-forecast/us.json")
    .defer(d3.csv, "senate-ratings.csv")
    .await(ready);

function ready(error, us, data) {
    if (error) throw error;
    var json = topojson.feature(us, us.objects.states)

    var gaState = json.features.filter(d => d.properties.name == "Georgia")[0];
    console.log(data)
    json.features.forEach((d, i) => {
        var state = d.properties.name
        d.abbrev = map_labels.filter(d => d.state == state).length == 0 ? "" : map_labels.filter(d => d.state == state)[0].label
        d.properties.x = map_labels.filter(d => d.state == state).length == 0 ? "" : map_labels.filter(d => d.state == state)[0].yValue
        d.properties.y = map_labels.filter(d => d.state == state).length == 0 ? "" : map_labels.filter(d => d.state == state)[0].xValue
        d.rating = data.filter(d => d.state == state).length == 0 ? "-" : data.filter(d => d.state == state)[0].rating
        d.incParty = data.filter(d => d.state == state).length == 0 ? "-" : data.filter(d => d.state == state)[0].inc_party
    })
    console.log(json.features)
    var mapG = map.append("g")
        .attr("transform", "translate(0,30)")

    mapG.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "states")
        .attr("d", path)
        .style("stroke", "white")
        .style("stroke-width", "1")
        .style("fill", j => ratingScale.filter(d => d.rating == j.rating)[0].color)

    map_labels.forEach((d) => {
        var state = d.state
        console.log(state)
        d.rating = data.filter(d => d.state == state)[0].rating
    })

    mapG.selectAll("label")
        .data(map_labels)
        .enter()
        .append("text")
        .text(d => d.label)
        .attr("x", d => d.xValue)
        .attr("y", d => d.yValue)
        .style("font-family", "sf-mono")
        .attr("font-size", "10")
        .attr("fill", d => d.rating == "Tossup" ? "black" : "white")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("font-weight", "500")

    var width = 50,
        height = 50;
    var projection2 = d3.geoAlbers();

    var path2 = d3.geoPath()
        .projection(projection2);




    projection2
        .scale(1)
        .translate([0, 0]);

    var b = path2.bounds(gaState),
        s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [((width - s * (b[1][0] + b[0][0])) / 2), ((height - s * (b[1][1] + b[0][1])) / 2) + 50];

    projection2
        .scale(s)
        .translate(t);

    mapG.append("path")
        .datum(gaState)
        .attr("fill", "black")
        .attr("d", path2)
        .style("stroke", "grey")
        .attr("transform", "translate(725,280)")
        .style("fill", ratingScale.filter(d => d.rating == data[34].rating)[0].color)

    mapG.append("text")
        .text("GA*")
        .attr("x", 750)
        .attr("y", 356)
        .style("font-family", "sf-mono")
        .attr("font-size", "10")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .style("font-weight", "500")
        .style("dominant-baseline", "central")

    var ratingSum = [
        { rating: "Uncontested D", seats: 35 },
        { rating: "Solid D", seats: data.filter(d => d.rating == "Solid D").length },
        { rating: "Likely D", seats: data.filter(d => d.rating == "Likely D").length },
        { rating: "Lean D", seats: data.filter(d => d.rating == "Lean D").length },
        { rating: "Tossup", seats: data.filter(d => d.rating == "Tossup").length },
        { rating: "Lean R", seats: data.filter(d => d.rating == "Lean R").length },
        { rating: "Likely R", seats: data.filter(d => d.rating == "Likely R").length },
        { rating: "Solid R", seats: data.filter(d => d.rating == "Solid R").length },
        { rating: "Uncontested R", seats: 30 }
    ]
    console.log(ratingSum)

    map.selectAll("asd")
        .data(ratingSum)
        .enter()
        .append("rect")
        .attr("height", 30)
        .attr("width", d => d.seats * 8.5)
        .attr("x", (d, i) => i == 0 ? 100 : 100 + d3.sum(ratingSum.slice(0, i), d => d.seats) * 8.5)
        .attr("y", 20)
        .attr("fill", j => ratingScale.filter(d => d.rating == j.rating)[0].color)
        .attr("stroke", "white")

    map.selectAll("asd")
        .data(ratingSum)
        .enter()
        .append("text")
        .text(d => d.seats)
        .attr("x", (d, i) => i == 0 ? 100 + (d.seats * 8.5) / 2 : 100 + d3.sum(ratingSum.slice(0, i), d => d.seats) * 8.5 + (d.seats * 8.5) / 2)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "middle")
        .attr("y", 35)
        .attr("fill", (d, i) => i == 4 ? "black" : "white")
        .style("font-weight", 100)

    map.append("text")
        .text("REPUBLICANS")
        .attr("x", 950)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "end")
        .attr("y", 10)
        .attr("fill", "black")
        .style("font-weight", 100)


    map.append("text")
        .text(d3.sum(ratingSum.slice(5, 10), d => d.seats))
        .attr("x", 950)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "end")
        .attr("y", 65)
        .attr("fill", color(100))
        .style("font-weight", 100)
        .style("font-size", 25)


    map.append("text")
        .text(d3.sum(ratingSum.slice(0, 4), d => d.seats))
        .attr("x", 100)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "start")
        .attr("y", 65)
        .attr("fill", color(0))
        .style("font-weight", 100)
        .style("font-size", 25)

    map.append("text")
        .text("DEMOCRATS")
        .attr("x", 100)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "start")
        .attr("y", 10)
        .attr("fill", "black")
        .style("font-weight", 100)

}