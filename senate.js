queue()
    .defer(d3.json, "https://projects.jhkforecasts.com/presidential-forecast/us.json")
    .defer(d3.csv, "senate-ratings.csv")
    .await(ready);

function ready(error, us, ratings,) {
    if (error) throw error;
    var json = topojson.feature(us, us.objects.states)


    var gaState = json.features.filter(d => d.properties.name == "Georgia")[0];
}