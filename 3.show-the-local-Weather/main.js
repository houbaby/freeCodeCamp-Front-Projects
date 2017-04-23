var weather = {
    Thunderstorm: {
        color: "#A780AC",
        icon: "wi-day-thunderstorm"
    },
    Drizzle: {
        color: "#AAAAAA",
        icon: "wi-day-rain"
    },
    Rain: {
        color: "#AAAAAA",
        icon: "wi-day-rain"
    },
    Snow: {
        color: "#AAAAAA",
        icon: "wi-day-snow"
    },
    Clear: {
        color: "#268EFF",
        icon: "wi-day-sunny"
    },
    Clouds: {
        color: "#AAAAAA",
        icon: "wi-day-cloudy"
    },
    Default: {
        color: "#000000",
        icon: "wi-alien"
    }
}

$(document).ready(function() {
    var appId = "7e5506b8dd01d30edffcc3c2a29fd843";
    $.getJSON('http://ipinfo.io', function(locationData) { // 获取地理位置
        var city = locationData.city;
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&APPID=" + appId,
            dataType: "json",
            success: function (weatherData) {
                console.log(weatherData);
                var temp = Math.floor(weatherData.main.temp);
                var tempType = true;
                $('#location').text(locationData.city + ", " + locationData.region + ", " +  locationData.country);
                $('#temperature').text(temp + ' °F');
                // $('#weather').text(weatherData.weather[0].main)
                // $('#icon').attr("src", "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png");
                $('#temperature').click(function() {
                    if (tempType) {
                        var newTemp = Math.floor((temp - 32) / 1.8)
                        $('#temperature').text(newTemp + ' °C');
                        tempType = !tempType;
                    } else {
                        $('#temperature').text(temp + ' °F');
                        tempType = !tempType;
                    }
                });
                weatherChange(weatherData);
                showLocation(locationData);
            },

        });
    });

    function weatherChange(weatherData) {
        var iconElement = $('#icon');
        var weatherElement = $('#weather');
        var weatherType = weatherData.weather[0].main;

        modifyClass(iconElement, weather[weatherType].icon);
        weatherElement.text(weatherType);
        $("body").css("background-color", weather[weatherType].color);


        function modifyClass(element, newClassName) {
            element.removeClass(function(index, className) {
                var classNames = className.split(" ");
                return classNames[1];
            });
            element.addClass(newClassName);
        }
    }

    function showLocation(locationData) {
        var img = $('#map');

        img.attr("src", "http://maps.googleapis.com/maps/api/staticmap?center="+locationData.loc+"&zoom=14&size=400x300&sensor=false");
    }
});