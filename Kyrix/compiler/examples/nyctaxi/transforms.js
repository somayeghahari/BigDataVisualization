const Transform = require("../../src/Transform").Transform;

var cityTransform = new Transform(
    "select * from teams;",
    "nba",
    function(row) {
        var id = parseInt(row[0]);
        var y = Math.floor(id / 6);
        var x = id - y * 6;
        var ret = [];
        ret.push(row[0]);
        ret.push((x * 2 + 1) * 80);
        ret.push((y * 2 + 1) * 80 + 100);
        ret.push(row[1]);
        ret.push(row[2]);
        ret.push(row[3]);
        ret.push(row[4]);

        return Java.to(ret, "java.lang.String[]");
    },
    ["id", "x", "y", "team_id", "city", "name", "abbr"],
    true
);

var regionTransform = new Transform(
    "select game_id, year, month, day, home_team, away_team, home_score, away_score, 1 from games;",
    "nba",
    function(row, width, height, renderParams) {
        var ret = [];
        // id
        ret.push(row[0]);
        // x
        var curDate = new Date(row[1], row[2] - 1, row[3]);
        ret.push(
            d3
                .scaleTime()
                .domain([new Date(2017, 9, 17), new Date(2018, 3, 11)])
                .range([82, width - 82])(curDate)
        );
        // y
        var beginDate = new Date(2000, 0, 1);
        var oneDay = 24 * 60 * 60 * 1000;
        var daysPassed = Math.round(
            Math.abs((curDate.getTime() - beginDate.getTime()) / oneDay)
        );
        ret.push(
            daysPassed % 2 == 0
                ? renderParams.timelineUpperY
                : renderParams.timelineLowerY
        );

        // rest of the attributes
        for (var i = 1; i <= 8; i++) ret.push(row[i]);

        return Java.to(ret, "java.lang.String[]");
    },
    [
        "game_id",
        "x",
        "y",
        "year",
        "month",
        "day",
        "home_team",
        "away_team",
        "home_score",
        "away_score",
        "timeline"
    ],
    true
);

var regionStaticTransform = new Transform(
    "select city, name, abbr from teams;",
    "nba",
    "",
    [],
    true
);


module.exports = {
    cityTransform,
    regionTransform,
    regionStaticTransform
};
