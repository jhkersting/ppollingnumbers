var candidates = ["Biden", "Bloomberg", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren"]
var timeparse = d3.timeParse("%m/%d/%y")
var time_scale = 86400000
var national_third_party = .03
var simulations = 10000


var color = d3.scaleLinear()
    .domain([0, 0.5, 1])
    .range(["#0091FF", "white", "#FF6060"]);


var gopwincol = "#FF6060"
var demwincol = "#0091FF"
var thirdwincol = "#FFE130"



var numberformat = d3.format(".1%");
var numberFormat = d3.format(".0%");
d3.csv("https://projects.jhkforecasts.com/presidential_forecast/pollster-ratings.csv", pollster_ratings => {
    var svg = d3.select("#usmap")
        .append("svg")
        .attr("viewBox", '100 -150 820 620');

    var width3 = 1020;
    var height3 = 500;


    var projection = d3.geoAlbersUsa()
        .translate([width3 / 2, height3 / 2])
        .scale([900]);


    var path = d3.geoPath()
        .projection(projection);

    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-180, -90])
        .html("<div id='tipDiv'></div>");

    svg.call(tool_tip);
    var pollster_names = pollster_ratings.map((d, i) => {
        return d.Pollster
    })

    var pollster_grade = pollster_ratings.map((d, i) => {
        return d["538Grade"]
    })
    var pollster_bias = pollster_ratings.map((d, i) => {
        return +d.MeanRevertedBias
    })
    var grade_scale = [
        { Grade: "A+", Value: 1.5 },
        { Grade: "A", Value: 1.35 },
        { Grade: "A-", Value: 1.2 },
        { Grade: "A/B", Value: 1.1 },
        { Grade: "B+", Value: 1 },
        { Grade: "B", Value: .925 },
        { Grade: "B-", Value: .85 },
        { Grade: "B/C", Value: .8 },
        { Grade: "C+", Value: .7 },
        { Grade: "C", Value: .65 },
        { Grade: "C-", Value: .55 },
        { Grade: "C/D", Value: .5 },
        { Grade: "D+", Value: .4 },
        { Grade: "D", Value: .3 },
        { Grade: "D-", Value: .2 },
        { Grade: "", Value: .7 },
    ]
    var pollster_grade_letter = grade_scale.map((d) => {
        return d.Grade
    })

    var pollster_grade_value = grade_scale.map((d) => {
        return d.Value
    })

    d3.csv("https://projects.jhkforecasts.com/presidential_forecast/partisanlean.csv", pvi => {
        var pvi = pvi.map((d, i) => {
            return {
                state: d.state,
                pvi: d.pvi,
                thirdparty: +d.thirdparty,
                electoralvotes: +d.electroralvotes
            }
        })
        pvi[38].thirdparty = 1
        var us = {
            state: "US",
            pvi: 0,
            thirdparty: 1

        }
        pvi.push(us)
        console.log(pvi)
        d3.csv("https://projects.fivethirtyeight.com/polls-page/president_polls.csv", data => {
            var data = data.filter(d => d.answer != "Schultz")
            var data = data.filter(d => d.candidate_party != "LIB")

            data.forEach((d, i) => {
                d.party_id = d.candidate_party == "DEM" ? 0 : 1
                return d;
            })
            data.sort((a, b) => a.party_id - b.party_id)

            console.log(data[0])
            var datanew = d3.nest()
                .key(d => d.question_id)
                .entries(data)

            var datanew = datanew.map((d, i) => {
                return d.values
            })

            var data_new = datanew.map((d, i) => {
                return {
                    question_id: +datanew[i][0].question_id,
                    poll_id: +datanew[i][0].poll_id,
                    state: datanew[i][0].state == "" ? "US" : datanew[i][0].state,
                    pollster: datanew[i][0].pollster,
                    id: +datanew[i][0].pollster_id,
                    sponsors: datanew[i][0].sponsors,
                    n: datanew[i][0].sample_size,
                    date: timeparse(datanew[i][0].end_date),
                    population: datanew[i][0].population,
                    grade: pollster_grade[pollster_names.indexOf(datanew[i][0].pollster)] == undefined ? "C+" : pollster_grade[pollster_names.indexOf(datanew[i][0].pollster)],
                    bias: pollster_bias[pollster_names.indexOf(datanew[i][0].pollster)] == undefined ? "C+" : pollster_bias[pollster_names.indexOf(datanew[i][0].pollster)],
                    dem: datanew[i][0].answer,
                    gop: datanew[i][1].answer,
                    dem_pct: +datanew[i][0].pct,
                    gop_pct: +datanew[i][1].pct,
                    poll_index: datanew[i][0].state == "" ? "US" + datanew[i][0].pollster : datanew[i][0].state + datanew[i][0].pollster,
                }
            })
            var data_new = data_new.filter(d => d.gop == "Trump")

            var state_data = []
            var national_data = []


            for (var c = 0; c < candidates.length; c++) {
                pvi[22].pvi = candidates[c] == "Klobuchar" ? -12 : pvi[22].pvi
                var data_filtered = data_new.filter(d => d.dem == candidates[c])

                data_filtered.forEach((d, i) => {
                    d.grade_value = pollster_grade_value[pollster_grade_letter.indexOf(d.grade)]
                    d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
                    d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4)
                    d.weight = d.n_adjusted * d.population_adj
                    d.sum = (d.dem_pct + d.gop_pct)
                    d.weight = Math.pow(d.weight, d.grade_value) * ((d.dem_pct + d.gop_pct) / 100)
                    d.time_weight = d.weight / (1 + (((new Date() - d.date) / time_scale) / 20))
                    d.dem_adj = (d.dem_pct - (d.bias / 2))
                    d.gop_adj = (d.gop_pct + (d.bias / 2))
                    d.margin = d.dem_adj - d.gop_adj
                    return d;
                })


                var data_filtered = d3.nest()
                    .key(d => d.poll_id)
                    .entries(data_filtered)

                var best_poll = []
                for (var i = 0; i < data_filtered.length; i++) {
                    var polls = data_filtered[i].values
                    polls.sort((a, b) => b.weight - a.weight)
                    var poll = polls[0]
                    best_poll.push(poll)
                }
                var data_filtered = d3.nest()
                    .key(d => d.poll_index)
                    .entries(best_poll)
                var weighted_polls = []
                for (var i = 0; i < data_filtered.length; i++) {
                    var polls = data_filtered[i].values
                    polls.sort((a, b) => b.date - a.date)
                    polls.forEach((d, j) => {
                        d.weight = d.time_weight / Math.pow(j + 1, 2)
                        return d;
                    })
                    polls.sort((a, b) => b.weight - a.weight)
                    var poll = polls[0]
                    weighted_polls.push(poll)
                }
                var data_filtered = weighted_polls

                data_filtered.forEach((d, i) => {
                    d.margin_weight = (d.margin / 100) * d.weight
                    return d;
                })

                var polling_avg = []
                for (var i = 0; i < pvi.length; i++) {
                    var polls = data_filtered.filter(d => d.state == pvi[i].state)
                    var margin_sum = d3.sum(polls, d => d.margin_weight)
                    var weight_sum = d3.sum(polls, d => d.weight)
                    var polling_margin = weight_sum == 0 ? 0 : margin_sum / weight_sum
                    var avg = {
                        state: pvi[i].state,
                        polling_margin: polling_margin,
                        polling_weight: weight_sum,
                        pvi: +pvi[i].pvi,
                        stdev: .15 / (Math.pow(weight_sum + 20, .3))
                    }
                    polling_avg.push(avg)

                }


                var us_polling_avg = polling_avg[56].polling_margin

                var state_proj = []

                for (var i = 0; i < polling_avg.length - 1; i++) {

                    var fundamental_margin = (-polling_avg[i].pvi / 100) + us_polling_avg
                    var fund_margin_weight = fundamental_margin * 20
                    var polling_margin_weight = polling_avg[i].polling_margin * polling_avg[i].polling_weight
                    var margin = (polling_margin_weight + fund_margin_weight) / (polling_avg[i].polling_weight + 20)
                    var sim_stdev = Math.sqrt((Math.pow(polling_avg[i].stdev, 2) * 2))
                    var third_party = pvi[i].thirdparty * national_third_party
                    var gop = ((1 - third_party) / 2) - (margin / 2)
                    var dem = 1 - third_party - gop
                    dem_win = jStat.normal.cdf(margin, 0, sim_stdev)
                    var proj = {
                        candidate: candidates[c],
                        state: polling_avg[i].state,
                        electoralvotes: pvi[i].electoralvotes,
                        margin: margin,
                        gop: gop,
                        dem: dem,
                        third_party: third_party,
                        gop_win: 1 - dem_win,
                        dem_win: dem_win,
                    }
                    state_proj.push(proj)
                }

                var sim_data = []
                for (var i = 0; i < simulations; i++) {

                    var sim_prob = Math.random()
                    var simulation_data = state_proj.map((d, j) => {
                        return {
                            state: d.state
                        }

                    })
                    simulation_data.forEach((d, j) => {
                        d.gop_win = (sim_prob * 2 + Math.random()) / 3 < state_proj[j].gop_win ? 1 : 0
                        d.dem_win = d.gop_win == 1 ? 0 : 1
                        d.gop_ev = d.gop_win * state_proj[j].electoralvotes
                        d.dem_ev = d.dem_win * state_proj[j].electoralvotes
                        return d;
                    })
                    var gop_ev = d3.sum(simulation_data, d => d.gop_ev)
                    var dem_ev = 538 - gop_ev
                    var gop_win = gop_ev > 268 ? 1 : 0
                    var dem_win = dem_ev > 269 ? 1 : 0
                    var push_data = {
                        candidate: candidates[c],
                        gop_ev: gop_ev,
                        dem_ev: dem_ev,
                        gop_win: gop_win,
                        dem_win: dem_win,
                    }

                    sim_data.push(push_data)
                }
                var gop_win_election = d3.mean(sim_data, d => d.gop_win)
                var gop_avg_ev = d3.mean(sim_data, d => d.gop_ev)
                var candidate_win = {
                    candidate: candidates[c],
                    gop_win: gop_win_election,
                    dem_win: 1 - gop_win_election,
                    gop_avg_ev: gop_avg_ev,
                    dem_avg_ev: 538 - gop_avg_ev,
                    gop_ev: d3.sum(state_proj.filter(d => d.margin < 0), d => d.electoralvotes),
                    dem_ev: d3.sum(state_proj.filter(d => d.margin > 0), d => d.electoralvotes)
                }
                national_data.push(candidate_win)
                state_data.push(state_proj)
            }


            var Biden = state_data[0]
            var Bloomberg = state_data[1]
            var Buttigieg = state_data[2]
            var Klobuchar = state_data[3]
            var Sanders = state_data[4]
            var Steyer = state_data[5]
            var Warren = state_data[6]

            var state_cand = Biden.concat(Bloomberg)
            var state_cand = state_cand.concat(Buttigieg)
            var state_cand = state_cand.concat(Klobuchar)
            var state_cand = state_cand.concat(Sanders)
            var state_cand = state_cand.concat(Steyer)
            var state_cand = state_cand.concat(Warren)


            var state_data = state_cand
            console.log(national_data)
            update(d3.select('#selectbox').property('value'));
            function update(input) {
                var state = state_data.filter(d => d.candidate == input)
                var national = national_data.filter(d => d.candidate == input)
                console.log(national)
                d3.json("https://projects.jhkforecasts.com/presidential_forecast/us-states.json", function (json) {


                    for (var i = 0; i < state.length; i++) {


                        var dataState = state[i].state;
                        var gop_win = state[i].gop_win;
                        var dem_win = state[i].dem_win;
                        var ev = state[i].electoralvotes;


                        for (var j = 0; j < json.features.length; j++) {
                            var jsonState = json.features[j].properties.name;

                            if (dataState == jsonState) {
                                json.features[j].properties.gop_win = gop_win
                                json.features[j].properties.dem_win = dem_win
                                json.features[j].properties.ev = ev


                                break;
                            }
                        }
                    }
                    svg.append("rect")
                        .attr("fill", "white")
                        .attr("x", 0)
                        .attr("y", -150)
                        .attr("width", 10000)
                        .attr("height", 200)
                    svg.append("image")
                        .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
                        .attr("x", 530)
                        .attr("y", -100)
                        .attr("width", 100)
                        .attr("height", 100)

                    svg.append("image")
                        .attr("xlink:href", d => "https://jhkforecasts.com/" + input + "-01.png")
                        .attr("x", 400)
                        .attr("y", -100)
                        .attr("width", 100)
                        .attr("height", 100)
                    svg.append("rect")
                        .attr("fill", gopwincol)
                        .attr("x", 630)
                        .attr("y", -national[0].gop_win * 100)
                        .attr("width", 50)
                        .attr("height", national[0].gop_win * 100)

                    svg.append("rect")
                        .attr("fill", demwincol)
                        .attr("x", 350)
                        .attr("y", -national[0].dem_win * 100)
                        .attr("width", 50)
                        .attr("height", national[0].dem_win * 100)

                    svg.append("text")
                        .text(numberformat(national[0].gop_win))
                        .attr("y", 40)
                        .attr("x", 580)
                        .attr("fill", gopwincol)
                        .style("font-weight", "600")
                        .style("font-size", 30)
                        .attr("text-anchor", "middle")



                        svg.append("text")
                        .text("Win Presidency")
                        .attr("y", -120)
                        .attr("x", 510)
                        .attr("fill", "Black")
                        .style("font-weight", "600")
                        .style("font-size", 30)
                        .attr("text-anchor", "middle")

                        svg.append("text")
                        .text(national[0].gop_ev)
                        .attr("y", 20)
                        .attr("x", 780)
                        .attr("fill", "Black")
                        .style("font-weight", "600")
                        .style("font-size", 30)
                        .attr("text-anchor", "middle")

                        svg.append("text")
                        .text("Electoral Votes")
                        .attr("y", -20)
                        .attr("x", 780)
                        .attr("fill", "Black")
                        .style("font-weight", "600")
                        .style("font-size", 30)
                        .attr("text-anchor", "middle")
                    
                        svg.append("text")
                        .text(national[0].dem_ev)
                        .attr("y", 20)
                        .attr("x", 250)
                        .attr("fill", "Black")
                        .style("font-weight", "600")
                        .style("font-size", 30)
                        .attr("text-anchor", "middle")

                        svg.append("text")
                        .text("Electoral Votes")
                        .attr("y", -20)
                        .attr("x", 250)
                        .attr("fill", "Black")
                        .style("font-weight", "600")
                        .style("font-size", 30)
                        .attr("text-anchor", "middle")

                    svg.append("text")
                        .text(numberformat(national[0].dem_win))
                        .attr("y", 40)
                        .attr("x", 450)
                        .attr("fill", demwincol)
                        .style("font-weight", "600")
                        .style("font-size", 30)
                        .attr("text-anchor", "middle")

                    svg.append("g")
                        .selectAll("path2")
                        .data(json.features)
                        .enter()
                        .append("path")
                        .attr("d", path)
                        .style("stroke", "lightgrey")
                        .style("stroke-width", 1.5)
                        .style("fill", d => color(d.properties.gop_win))
                        .on("mouseover", function (d) {

                            tool_tip.show();
                            var tipSVG = d3.select("#tipDiv")
                                .append("svg")
                                .attr("width", 175)
                                .attr("height", 175)
                                ;
                            tipSVG.append("rect")
                                .attr("y", 1.5)
                                .attr("x", 1.5)
                                .attr("width", 172)
                                .attr("height", 172)
                                .attr("rx", 8)
                                .attr("fill", "white")
                                .attr("stroke", "black")
                                .attr("stroke-width", 2)



                            tipSVG.append("text")
                                .text(d.properties.name)
                                .attr("y", 20)
                                .attr("x", 87.5)
                                .attr("fill", "#black")
                                .style("font-weight", "600")
                                .style("font-size", "20")
                                .attr("text-anchor", "middle")
                            tipSVG.append("text")
                                .text(d.properties.ev + " Electoral Votes")
                                .attr("y", 40)
                                .attr("x", 87.5)
                                .attr("fill", "#black")
                                .style("font-weight", "500")
                                .style("font-size", "15")
                                .attr("text-anchor", "middle")


                            tipSVG.append("image")
                                .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
                                .attr("x", 90)
                                .attr("y", 50)
                                .attr("width", 82)
                                .attr("height", 82)

                            tipSVG.append("image")
                                .attr("xlink:href", d => "https://jhkforecasts.com/" + input + "-01.png")
                                .attr("x", 5.5)
                                .attr("y", 50)
                                .attr("width", 82)
                                .attr("height", 82)

                            tipSVG.append("text")
                                .text(numberformat(d.properties.gop_win))
                                .attr("y", 150)
                                .attr("x", 131.25)
                                .attr("fill", color(100))
                                .style("font-weight", "600")
                                .style("font-size", 20)
                                .attr("text-anchor", "middle")

                            tipSVG.append("text")
                                .text(numberformat(d.properties.dem_win))
                                .attr("y", 150)
                                .attr("x", 43.75)
                                .attr("fill", color(0))
                                .style("font-weight", "600")
                                .style("font-size", 20)
                                .attr("text-anchor", "middle")


                        })
                        .on('mouseout',
                            function (d) {
                                tool_tip.hide()
                            })

                    d3.csv("https://projects.jhkforecasts.com/presidential_forecast/US%20Map.csv", maplabels => {

                        svg.selectAll("labels")
                            .data(maplabels)
                            .enter()
                            .append("text")
                            .attr("class", "winner")
                            .text(d => d.label)
                            .attr("x", d => d.xValue)
                            .attr("y", d => d.yValue)
                            .attr("font-family", "brandon-grotesque")
                            .attr("font-weight", "700")
                            .attr("font-size", 12)
                            .attr("fill", "black")
                            .attr("text-anchor", "middle")
                    })
                })
            }
            var tossupstates = [
                {
                    "state": "Arizona",
                    "index": 2
                },
                {
                    "state": "Florida",
                    "index": 8
                },
                {
                    "state": "Georgia",
                    "index": 9
                },
                {
                    "state": "Iowa",
                    "index": 14
                },
                {
                    "state": "Maine",
                    "index": 18
                },
                {
                    "state": "Michigan",
                    "index": 21
                },
                {
                    "state": "Minnesota",
                    "index": 22
                },
                {
                    "state": "Nevada",
                    "index": 27
                },
                {
                    "state": "New Hampshire",
                    "index": 28
                },
                {
                    "state": "North Carolina",
                    "index": 32
                },
                {
                    "state": "Ohio",
                    "index": 34
                },
                {
                    "state": "Pennsylvania",
                    "index": 37
                },
                {
                    "state": "Texas",
                    "index": 42
                },
                {
                    "state": "Virginia",
                    "index": 45
                },
                {
                    "state": "Wisconsin",
                    "index": 48
                },
                {
                    "state": "Maine-2",
                    "index": 52
                },
                {
                    "state": "Nebraska-2",
                    "index": 54
                }
            ]

            tossupstates.forEach((d, j) => {
                d.electoralvotes = Biden[d.index].electoralvotes
                d.pvi = pvi[d.index].pvi
                d.Biden = Biden[d.index].dem_win
                d.Bloomberg = Bloomberg[d.index].dem_win
                d.Buttigieg = Buttigieg[d.index].dem_win
                d.Klobuchar = Klobuchar[d.index].dem_win
                d.Sanders = Sanders[d.index].dem_win
                d.Steyer = Steyer[d.index].dem_win
                d.Warren = Warren[d.index].dem_win
                return d;
            })

            tossupstates.sort((a,b)=>a.pvi-b.pvi)
            
            
            var SVG = d3.select("#tossups")
                .append("svg")
                .attr("viewBox", '0 0 1000 610');


            SVG.selectAll("cands")
                .data(national_data)
                .enter()
                .append("text")
                .text(d => d.candidate)
                .attr("y", (d, i) => 10)
                .attr("x", (d, i) => 300 + i * 100)
                .attr("fill", "black")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")

                SVG.selectAll("cands")
                .data(national_data)
                .enter()
                .append("text")
                .text(d => numberFormat(d.dem_win))
                .attr("y", (d, i) => 40)
                .attr("x", (d, i) => 300 + i * 100)
                .attr("fill", "black")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                SVG.selectAll("cands")
                .data(national_data)
                .enter()
                .append("text")
                .text(d => sd.dem_ev)
                .attr("y", (d, i) => 70)
                .attr("x", (d, i) => 300 + i * 100)
                .attr("fill", "black")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 85 + i * 30)
                .attr("x", 260)
                .attr("height", 25)
                .attr("width", 80)
                .attr("fill", d => color(1 - d.Biden))

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 85 + i * 30)
                .attr("x", 360)
                .attr("height", 25)
                .attr("width", 80)
                .attr("fill", d => color(1 - d.Bloomberg))

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 85 + i * 30)
                .attr("x", 460)
                .attr("height", 25)
                .attr("width", 80)
                .attr("fill", d => color(1 - d.Buttigieg))


            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 85 + i * 30)
                .attr("x", 560)
                .attr("height", 25)
                .attr("width", 80)
                .attr("fill", d => color(1 - d.Klobuchar))


            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 85 + i * 30)
                .attr("x", 660)
                .attr("height", 25)
                .attr("width", 80)
                .attr("fill", d => color(1 - d.Sanders))


            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 85 + i * 30)
                .attr("x", 760)
                .attr("height", 25)
                .attr("width", 80)
                .attr("fill", d => color(1 - d.Steyer))


            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 85 + i * 30)
                .attr("x", 860)
                .attr("height", 25)
                .attr("width", 80)
                .attr("fill", d => color(1 - d.Warren))


            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => d.state)
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 10)
                .attr("fill", "black")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("text-anchor", "start")



            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => d.electoralvotes)
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 200)
                .attr("fill", "black")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => numberFormat(d.Biden))
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 300)
                .attr("fill", "black")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "middle")

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => numberFormat(d.Bloomberg))
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 400)
                .attr("fill", "black")
                .attr("dominant-baseline", "middle")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("text-anchor", "middle")

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => numberFormat(d.Buttigieg))
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 500)
                .attr("fill", "black")
                .attr("dominant-baseline", "middle")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("text-anchor", "middle")

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => numberFormat(d.Klobuchar))
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 600)
                .attr("fill", "black")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "middle")

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => numberFormat(d.Sanders))
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 700)
                .attr("fill", "black")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "middle")

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => numberFormat(d.Steyer))
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 800)
                .attr("dominant-baseline", "middle")
                .attr("fill", "black")
                .style("font-weight", "600")
                .style("font-size", 20)
                .attr("text-anchor", "middle")

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => numberFormat(d.Warren))
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 900)
                .attr("fill", "black")
                .style("font-weight", "600")
                .attr("dominant-baseline", "middle")
                .style("font-size", 20)
                .attr("text-anchor", "middle")



            console.log(tossupstates)
            var selectbox = d3.select("#selectbox")
                .on("change", function () {
                    update(this.value);
                })

        })
    })
})