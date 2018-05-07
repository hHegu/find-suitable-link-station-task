/** List of link stations with coordinates and a range. */
var stations = [{
        x: 0,
        y: 0,
        reach: 10
    },
    {
        x: 20,
        y: 20,
        reach: 5
    },
    {
        x: 10,
        y: 0,
        reach: 12
    }
]

/** List of devices with coordinates*/
var points = [{
        x: 0,
        y: 0
    },
    {
        x: 100,
        y: 100
    },
    {
        x: 15,
        y: 10
    },
    {
        x: 18,
        y: 18
    }
]

/**Calculates the distance between a link station and a device. Returns the distance as number. */
function calculateDistance(linkStation, device) {
    return Math.sqrt(Math.pow(device.x - linkStation.x, 2) + Math.pow(device.y - linkStation.y, 2));
}

/**Calculates how much power the device receives from given link station. Returns the power as a number. */
function calculatePower(linkStation, device) {
    var power = 0;
    var distance = calculateDistance(linkStation, device);

    if (distance <= linkStation.reach) {
        power = Math.pow(linkStation.reach - distance, 2);
    } else {
        power = 0;
    }
    return power;
}

/** Gets the station id and power of the best station for given device.*/
function calculateBestStation(device) {
    var bestResult;
    for (i = 0; i < stations.length; i++) {
        var power = calculatePower(stations[i], device);
        if (bestResult) {
            if (power > bestResult.power) {
                bestResult = {
                    station: stations[i],
                    power: power
                }
            } else {
                continue;
            }
        } else {
            bestResult = {
                station: stations[i],
                power: power
            }
        }
    }
    return bestResult;
}

/** Calculates power for all devices and prints out the best link stations for all devices.*/
function calculate() {
    points.forEach(point => {
        var bestResult = calculateBestStation(point);
        var bestStation = bestResult.station;
        var resultText = "";
        if (bestResult.power > 0) {
            resultText = "Best link station for point " + point.x + "," + point.y + " is " + bestStation.x + "," + bestStation.y + " with power " + bestResult.power;
        } else {
            resultText = "No link station within reach for point " + point.x + "," + point.y;
        }
        console.log(resultText);

        var result = document.createElement("p");
        result.appendChild(document.createTextNode(resultText));
        document.getElementById("resultTexts").appendChild(result);
    });
}