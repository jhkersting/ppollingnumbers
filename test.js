var candidates = ["Biden"]
var timeparse = d3.timeParse("%m/%d/%y")
var time_scale = 86400000
var national_third_party = .03
var simulations = 1
var timeformat = d3.timeFormat("%m/%d")
var wholeformat = d3.format(".1f")
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 294.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }, { "state": "US", "label": "US", "xValue": -1000, "yValue": -100 }]
var color = d3.scaleLinear()
    .domain([-100, -20, 0, 20, 100])
    .range(["#FF6060", "#FF6060", "white", "#0091FF", "#0091FF"]);
var gopscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#FF6060"]);

var demscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#0091FF"]);


var gopwincol = "#FF6060"
var demwincol = "#0091FF"
var thirdwincol = "#FFE130"


var wf = d3.format(".0f");
var numberformat = d3.format(".1f");
var numberFormat = d3.format(".1%");
d3.csv("https://data.jhkforecasts.com/pollster-ratings.csv", pollster_ratings => {
    var svg = d3.select("#usmap")
        .append("svg")
        .attr("viewBox", '100 -150 820 650');

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
        return d.MeanRevertedBias == NaN ? 0 : d.MeanRevertedBias
    })
    var grade_scale = [
        { Grade: "A+", Value: 1.2 },
        { Grade: "A", Value: 1.15 },
        { Grade: "A-", Value: 1.1 },
        { Grade: "A/B", Value: 1.05 },
        { Grade: "B+", Value: 1 },
        { Grade: "B", Value: .95 },
        { Grade: "B-", Value: .9 },
        { Grade: "B/C", Value: .875 },
        { Grade: "C+", Value: .85 },
        { Grade: "C", Value: .8 },
        { Grade: "C-", Value: .7 },
        { Grade: "C/D", Value: .75 },
        { Grade: "D+", Value: .5 },
        { Grade: "D", Value: .3 },
        { Grade: "D-", Value: .2 },
        { Grade: "-", Value: .7 },
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
                    url: datanew[i][0].url,
                    sponsors: datanew[i][0].sponsors,
                    n: datanew[i][0].sample_size,
                    date: timeparse(datanew[i][0].end_date),
                    population: datanew[i][0].population,
                    grade: pollster_grade[pollster_names.indexOf(datanew[i][0].pollster)] == undefined ? "-" : pollster_grade[pollster_names.indexOf(datanew[i][0].pollster)],
                    bias: pollster_bias[pollster_names.indexOf(datanew[i][0].pollster)] == undefined ? 0 : pollster_bias[pollster_names.indexOf(datanew[i][0].pollster)],
                    dem: datanew[i][0].answer,
                    gop: datanew[i][1].answer,
                    dem_pct: +datanew[i][0].pct,
                    gop_pct: +datanew[i][1].pct,
                    poll_index: datanew[i][0].state == "" ? "US" + datanew[i][0].pollster : datanew[i][0].state + datanew[i][0].pollster,
                    margin: +datanew[i][0].pct - +datanew[i][1].pct
                }
            })
            var data_new = data_new.filter(d => d.dem == "Biden" || d.dem == "Sanders")
            var data_new = data_new.filter(d => d.gop == "Trump")

            var state_data = []
            var national_data = []


            for (var c = 0; c < candidates.length; c++) {
                var data_filtered = data_new.filter(d => d.dem == candidates[c])

                data_filtered.forEach((d, i) => {
                    d.days_old = (new Date() - d.date) / time_scale
                    d.grade_value = pollster_grade_value[pollster_grade_letter.indexOf(d.grade)]
                    d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
                    d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4)
                    d.weight = d.n_adjusted * d.population_adj
                    d.sum = (d.dem_pct + d.gop_pct)
                    d.weight = Math.pow(d.weight, d.grade_value) * ((d.dem_pct + d.gop_pct) / 100)
                    d.time_weight = d.days_old > 57 ? d.weight / ((50 + d.days_old) / 50) : (0.0000021 * Math.pow(d.days_old, 3) - 0.0003 * Math.pow(d.days_old, 2) - 0.0012 * d.days_old + 1) * d.weight
                    d.dem_adj = d.dem_pct
                    d.gop_adj = d.gop_pct
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

                for (var i = 0; i < polling_avg.length; i++) {

                    var fundamental_margin = (-polling_avg[i].pvi / 100) + us_polling_avg
                    var fund_margin_weight = fundamental_margin * 0.0001
                    var polling_margin_weight = polling_avg[i].polling_margin * polling_avg[i].polling_weight
                    var margin = (polling_margin_weight + fund_margin_weight) / (polling_avg[i].polling_weight + 0.0001)
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



            var state_cand = Biden




            var state_data = state_cand
            console.log(state_data)
            update("Biden");
            function update(input) {
                var state = state_data.filter(d => d.candidate == input)
                console.log(state)
                var national = national_data.filter(d => d.candidate == input)
                console.log(national)
                d3.json("https://projects.jhkforecasts.com/presidential_forecast/us-states.json", function (json) {


                    for (var i = 0; i < state.length; i++) {


                        var dataState = state[i].state;
                        var gop_win = state[i].gop_win;
                        var dem_win = state[i].dem_win;
                        var margin = state[i].margin * 100;
                        var ev = state[i].electoralvotes;


                        for (var j = 0; j < json.features.length; j++) {
                            var jsonState = json.features[j].properties.name;

                            if (dataState == jsonState) {
                                json.features[j].properties.gop_win = gop_win
                                json.features[j].properties.dem_win = dem_win
                                json.features[j].properties.ev = ev
                                json.features[j].properties.margin = margin

                                break;
                            }
                        }
                    }


                    svg.append("image")
                        .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
                        .attr("x", 810)
                        .attr("y", -80)
                        .attr("width", 100)
                        .attr("height", 100)

                    svg.append("image")
                        .attr("xlink:href", d => "https://jhkforecasts.com/" + "Biden" + "-01.png")
                        .attr("x", 110)
                        .attr("y", -80)
                        .attr("width", 100)
                        .attr("height", 100)



                    svg.append("text")
                        .text(national[0].gop_ev)
                        .attr("y", -20)
                        .attr("x", 800)
                        .attr("fill", gopwincol)
                        .style("font-weight", "500")
                        .style("font-size", 30)
                        .attr("text-anchor", "end")

                    svg.append("text")
                        .text("Electoral Votes")
                        .attr("y", -60)
                        .attr("x", 800)
                        .attr("fill", "Black")
                        .style("font-weight", "500")
                        .style("font-size", 30)
                        .attr("text-anchor", "end")

                    svg.append("text")
                        .text(national[0].dem_ev)
                        .attr("y", -20)
                        .attr("x", 215)
                        .attr("fill", demwincol)
                        .style("font-weight", "500")
                        .style("font-size", 30)
                        .attr("text-anchor", "start")

                    svg.append("text")
                        .text("Electoral Votes")
                        .attr("y", -60)
                        .attr("x", 215)
                        .attr("fill", "Black")
                        .style("font-weight", "500")
                        .style("font-size", 30)
                        .attr("text-anchor", "start")

                    svg.append("g")
                        .selectAll("path2")
                        .data(json.features)
                        .enter()
                        .append("a")
                        .attr("href", "#polls")
                        .append("path")
                        .attr("d", path)
                        .style("stroke", "lightgrey")
                        .style("stroke-width", 1.5)
                        .style("fill", d => color(d.properties.margin))

                    svg.selectAll("labels")
                        .data(map_labels)
                        .enter()
                        .append("text")
                        .attr("class", "winner")
                        .text(d => d.label)
                        .attr("x", d => d.xValue)
                        .attr("y", d => d.yValue)
                        .style("font-family", "sf-mono")
                        .style("font-weight", "500")
                        .attr("font-size", 10)
                        .attr("fill", "black")
                        .attr("text-anchor", "middle")

                    svg.append("g")
                        .selectAll("path")
                        .data(json.features)
                        .enter()
                        .append("a")
                        .attr("href", "#polls")
                        .append("path")
                        .attr("class", "statesover")
                        .attr("d", path)
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
                                .style("font-weight", "500")
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
                                .attr("xlink:href", d.properties.margin > 0 ? "https://jhkforecasts.com/Biden-01.png" : "https://jhkforecasts.com/Trump-01.png")
                                .attr("x", 50)
                                .attr("y", 50)
                                .attr("width", 75)
                                .attr("height", 75)


                            tipSVG.append("text")
                                .text(d.properties.margin > 0 ? "Biden +" + numberformat(d.properties.margin) : "Trump +" + numberformat(-d.properties.margin))
                                .attr("y", 150)
                                .attr("x", 87.5)
                                .attr("fill", d.properties.margin > 0 ? demwincol : gopwincol)
                                .style("font-weight", "500")
                                .style("font-size", 20)
                                .attr("text-anchor", "middle")


                        })
                        .on('mouseout',
                            function (d) {
                                tool_tip.hide()
                            })
                        .on("click", function (d) {
                            t(d.properties.name, "Biden", "All");
                            document.getElementById("state-search").value = d.properties.name
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
                d.Biden = Biden[d.index].margin * 100
                return d;
            })

            tossupstates.sort((a, b) => b.Biden - a.Biden)


            var SVG = d3.select("#tossups")
                .append("svg")
                .attr("viewBox", '0 50 1000 550');


            SVG.selectAll("cands")
                .data(national_data)
                .enter()
                .append("text")
                .text("Polling Margin")
                .attr("y", (d, i) => 65)
                .attr("x", (d, i) => 750)
                .attr("fill", "black")
                .style("font-weight", "500")
                .style("font-size", 20)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")


            SVG.append("text")
                .text("EVs")
                .attr("y", 65)
                .attr("x", 500)
                .attr("fill", "black")
                .style("font-weight", "500")
                .style("font-size", 20)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            SVG.append("text")
                .text("State")
                .attr("y", 65)
                .attr("x", 100)
                .attr("fill", "black")
                .style("font-weight", "500")
                .style("font-size", 20)
                .attr("text-anchor", "start")
                .attr("dominant-baseline", "central")

            SVG.append("line")
                .attr("y2", 80)
                .attr("x1", 100)
                .attr("x2", 900)
                .attr("y1", 80)
                .attr("stroke", "black")


            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 87.5 + i * 30)
                .attr("x", 600)
                .attr("height", 25)
                .attr("width", 300)
                .attr("fill", d => color(d.Biden))





            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => d.state)
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 100)
                .attr("fill", "black")
                .style("font-weight", "500")
                .style("font-size", 20)
                .attr("text-anchor", "start")



            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => d.electoralvotes)
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 500)
                .attr("fill", "black")
                .style("font-weight", "500")
                .style("font-size", 20)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            SVG.selectAll("states")
                .data(tossupstates)
                .enter()
                .append("text")
                .text(d => d.Biden > 0 ? "Biden +" + numberformat(d.Biden) : "Trump +" + numberformat(-d.Biden))
                .attr("y", (d, i) => 100 + i * 30)
                .attr("x", 750)
                .attr("fill", "black")
                .style("font-weight", "500")
                .style("font-size", 20)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")







            var bottom = d3.select("#bottom")
                .append("svg")
                .attr("viewBox", '0 -200 1000 610');

            var bottomPhone = d3.select("#bottomPhone")
                .append("svg")
                .attr("viewBox", '0 -200 1000 610');

            var top = d3.select("#top")
                .append("svg")
                .attr("viewBox", '0 0 1000 100');

            document.getElementById("state-search").value = "All"


            t(d3.select('#state-search').property('value'), "Biden", "All");
            function t(state, candidate, pollster) {
                var dataNew = data_new.filter(d => d.dem == "Biden")
                var datanew = state == "All" ? dataNew.slice(0, 100) : dataNew.filter(d => d.state == state)
                var finaldata = candidate == "All" ? datanew : datanew.filter(d => d.dem == candidate)
                var finaldata = pollster == "All" ? finaldata : finaldata.filter(d => d.pollster == pollster)
                console.log(finaldata)
                finaldata.forEach((d, i) => {
                    d.index = d.pollster + d.state + d.population
                })


                var statedata = [
                    state == "All" ? 0 : Biden.filter(d => d.state == state)[0].margin,
                ]
                console.log(statedata)
                document.getElementById("top").style.display = state == "All" ? "none" : "inline"
                var height = finaldata.length * 40 + 45
                var heightPhone = finaldata.length * 75 + 45

                bottom.attr("viewBox", '0 -20 1000 ' + height)
                bottomPhone.attr("viewBox", '0 -20 1000 ' + heightPhone)

                bottom.append("rect")
                    .attr("fill", "white")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 1000)
                    .attr("height", height)

                bottom.selectAll("states")
                    .data(finaldata)
                    .enter()
                    .append("rect")
                    .attr("y", (d, i) => 25 + i * 40)
                    .attr("x", 610)
                    .attr("height", 75)
                    .attr("width", 80)
                    .attr("fill", d => demscale(d.dem_pct))

                bottom.selectAll("states")
                    .data(finaldata)
                    .enter()
                    .append("rect")
                    .attr("y", (d, i) => 25 + i * 40)
                    .attr("x", 710)
                    .attr("height", 40)
                    .attr("width", 80)
                    .attr("fill", d => gopscale(d.gop_pct))

                bottom.append("text")
                    .text("BIDEN")
                    .attr("y", 12)
                    .attr("x", 650)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-family", "sf-mono")


                bottom.append("text")
                    .text("TRUMP")
                    .attr("y", 12)
                    .attr("x", 750)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-family", "sf-mono")


                bottom.append("text")
                    .text("FILTER")
                    .attr("y", 15)
                    .attr("x", 950)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-family", "sf-mono")



                bottom.append("text")
                    .text("RESET")
                    .attr("y", -10)
                    .attr("x", 950)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "underline")
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "none")
                    })
                    .on("click", function (d) {

                        t(state, "Biden", "All");

                    })
                    .style("font-family", "sf-mono")




                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("a")
                    .attr("href", d => d.url)
                    .append("text")
                    .text(d => d.pollster)
                    .attr("y", (d, i) => d.pollster.length > 30 ? 35 + i * 40 : 45 + i * 40)
                    .attr("x", (d, i) => 50)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 13)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "central")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "underline")
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "none")
                    })
                    .style("font-family", "sf-mono")
                    .call(wrapComp, 250)


                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("rect")
                    .attr("y", (d, i) => 32.5 + i * 40)
                    .attr("x", 937.5)
                    .attr("height", 25)
                    .attr("width", 25)
                    .attr("fill", "lightgray")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .attr("fill", "gray")
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .attr("fill", "lightgray")
                    })
                    .on("click", function (d) {

                        t(state, "Biden", d.pollster);

                    })


                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => wf(d.dem_pct))
                    .attr("y", (d, i) => 45 + i * 40)
                    .attr("x", (d, i) => 650)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")

                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => wf(d.gop_pct))
                    .attr("y", (d, i) => 45 + i * 40)
                    .attr("x", (d, i) => 750)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")


                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => d.margin > 0 ? "D+" + wf(d.margin) : "R+" + wf(Math.abs(d.margin)))
                    .attr("y", (d, i) => 45 + i * 40)
                    .attr("x", (d, i) => 850)
                    .attr("fill", d => d.margin == 0 ? "black" : d.margin > 0 ? demwincol : gopwincol)
                    .style("font-weight", "500")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-family", "sf-mono")


                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(id => map_labels.filter(d => d.state == id.state)[0].label)
                    .attr("y", (d, i) => 45 + i * 40)
                    .attr("x", (d, i) => 550)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 14)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-family", "sf-mono")


                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("line")
                    .attr("y1", (d, i) => 25 + i * 40)
                    .attr("x1", (d, i) => 0)
                    .attr("y2", (d, i) => 25 + i * 40)
                    .attr("x2", (d, i) => 1000)
                    .attr("stroke", "lightgrey")
                    .attr("stroke-width", 1)


                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => timeformat(d.date))
                    .attr("y", (d, i) => 45 + i * 40)
                    .attr("x", (d, i) => 425)
                    .attr("fill", "grey")
                    .style("font-weight", "500")
                    .style("font-size", 15)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "central")


                //PHONE POLLS

                bottomPhone.append("rect")
                    .attr("fill", "white")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 1000)
                    .attr("height", heightPhone)

                bottomPhone.selectAll("states")
                    .data(finaldata)
                    .enter()
                    .append("rect")
                    .attr("y", (d, i) => 26 + i * 75)
                    .attr("x", 610)
                    .attr("height", 75)
                    .attr("width", 80)
                    .attr("fill", d => demscale(d.dem_pct))

                bottomPhone.selectAll("states")
                    .data(finaldata)
                    .enter()
                    .append("rect")
                    .attr("y", (d, i) => 26 + i * 75)
                    .attr("x", 710)
                    .attr("height", 75)
                    .attr("width", 80)
                    .attr("fill", d => gopscale(d.gop_pct))

                bottomPhone.append("text")
                    .text("BIDEN")
                    .attr("y", 12)
                    .attr("x", 650)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-family", "sf-mono")


                bottomPhone.append("text")
                    .text("TRUMP")
                    .attr("y", 12)
                    .attr("x", 750)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-family", "sf-mono")


                bottomPhone.append("text")
                    .text("FILTER")
                    .attr("y", 15)
                    .attr("x", 950)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-family", "sf-mono")



                bottomPhone.append("text")
                    .text("RESET")
                    .attr("y", -10)
                    .attr("x", 950)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "underline")
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "none")
                    })
                    .on("click", function (d) {

                        t(state, "Biden", "All");

                    })
                    .style("font-family", "sf-mono")




                bottomPhone.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("a")
                    .attr("href", d => d.url)
                    .append("text")
                    .text(d => d.pollster)
                    .attr("y", (d, i) => d.pollster.length > 30 ? 50 + i * 75 : 62.5 + i * 75)
                    .attr("x", (d, i) => 50)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "central")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "underline")
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "none")
                    })
                    .call(wrap, 250)
                    .style("font-family", "sf-mono")


                bottomPhone.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("rect")
                    .attr("y", (d, i) => 37.5 + i * 75)
                    .attr("x", 925)
                    .attr("height", 50)
                    .attr("width", 50)
                    .attr("fill", "lightgray")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .attr("fill", "gray")
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .attr("fill", "lightgray")
                    })
                    .on("click", function (d) {

                        t(state, "Biden", d.pollster);

                    })


                bottomPhone.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => wf(d.dem_pct))
                    .attr("y", (d, i) => 62.5 + i * 75)
                    .attr("x", (d, i) => 650)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 22)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")

                bottomPhone.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => wf(d.gop_pct))
                    .attr("y", (d, i) => 62.5 + i * 75)
                    .attr("x", (d, i) => 750)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 25)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")


                bottomPhone.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => d.margin > 0 ? "D+" + wf(d.margin) : "R+" + wf(Math.abs(d.margin)))
                    .attr("y", (d, i) => 62.5 + i * 75)
                    .attr("x", (d, i) => 850)
                    .attr("fill", d => d.margin == 0 ? "black" : d.margin > 0 ? demwincol : gopwincol)
                    .style("font-weight", "500")
                    .style("font-size", 22)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")

                bottomPhone.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(id => map_labels.filter(d => d.state == id.state)[0].label)
                    .attr("y", (d, i) => 62.5 + i * 75)
                    .attr("x", (d, i) => 550)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-family", "sf-mono")


                bottomPhone.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("line")
                    .attr("y1", (d, i) => 25 + i * 75)
                    .attr("x1", (d, i) => 0)
                    .attr("y2", (d, i) => 25 + i * 75)
                    .attr("x2", (d, i) => 1000)
                    .attr("stroke", "lightgrey")
                    .attr("stroke-width", 1)


                bottomPhone.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => timeformat(d.date))
                    .attr("y", (d, i) => 62.5 + i * 75)
                    .attr("x", (d, i) => 425)
                    .attr("fill", "grey")
                    .style("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "central")

                top.append("rect")
                    .attr("fill", "white")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 1000)
                    .attr("height", 200)


                top.selectAll("cands")
                    .data(statedata)
                    .enter()
                    .append("text")
                    .text(d => d > 0 ? "Biden +" + numberformat(d * 100) : "Trump +" + numberformat(Math.abs(d * 100)))
                    .attr("y", (d, i) => 75)
                    .attr("x", (d, i) => 500)
                    .attr("fill", d => d == 0 ? "Black" : d > 0 ? demwincol : gopwincol)
                    .style("font-weight", "500")
                    .style("font-size", 30)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")

                top.append("text")
                    .text("Margin vs Trump in " + state)
                    .attr("y", (d, i) => 30)
                    .attr("x", (d, i) => 500)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", 30)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")



                function wrap(text, width) {
                    text.each(function () {
                        var text = d3.select(this),
                            words = text.text().split(/\s+/).reverse(),
                            word,
                            line = [],
                            lineNumber = 0,
                            lineHeight = 1.1, // ems
                            x = text.attr("x"),
                            y = text.attr("y"),
                            dy = 0, //parseFloat(text.attr("dy")),
                            tspan = text.text(null)
                                .append("tspan")
                                .attr("x", x)
                                .attr("y", y)
                                .attr("dy", dy + "em");
                        while (word = words.pop()) {
                            line.push(word);
                            tspan.text(line.join(" "));
                            if (tspan.node().getComputedTextLength() > width) {
                                line.pop();
                                tspan.text(line.join(" "));
                                line = [word];
                                tspan = text.append("tspan")
                                    .attr("x", x)
                                    .attr("y", y)
                                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                                    .text(word);
                            }
                        }
                    });
                }

                function wrapComp(text, width) {
                    text.each(function () {
                        var text = d3.select(this),
                            words = text.text().split(/\s+/).reverse(),
                            word,
                            line = [],
                            lineNumber = 0,
                            lineHeight = 1.1, // ems
                            x = text.attr("x"),
                            y = text.attr("y"),
                            dy = 0, //parseFloat(text.attr("dy")),
                            tspan = text.text(null)
                                .append("tspan")
                                .attr("x", x)
                                .attr("y", y)
                                .attr("dy", dy + "em");
                        while (word = words.pop()) {
                            line.push(word);
                            tspan.text(line.join(" "));
                            if (tspan.node().getComputedTextLength() > width) {
                                line.pop();
                                tspan.text(line.join(" "));
                                line = [word];
                                tspan = text.append("tspan")
                                    .attr("x", x)
                                    .attr("y", y)
                                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                                    .text(word);
                            }
                        }
                    });
                }




                var states = d3.select("#state-search")
                    .on("change", function () {
                        t(this.value, "Biden", "All");
                    })

            }


        })
    })
})