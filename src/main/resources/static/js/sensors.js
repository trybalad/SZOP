angular.module('szop', []).controller('sensors', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    var userId;

    getCurrentUserId();
    setTimeout(function() {
        getSensors();
    }, 1000);

    function getCurrentUserId() {
        $http.get('/user/id').
        then(function (response) {
            userId = parseInt(response.data);
            console.log("id: " + userId);
        });
    }

    function getSensors() {
        $http.get('/user/' + userId + '/sensors/id').
        then(function (response) {
            var sensorsList = response.data;
            var type;
            var lastUpdate;
            var formattedSensorsList = [];
            var selected = [];
            var counter = 1;
            var sensorIcon;
            var iconColor;
            sensorsList.forEach(function(entry) {
                if (entry.type == 1) {
                    type = "Temperature";
                    sensorIcon = "sensors-temp-icon";
                    iconColor = "red";
                } else {
                    type = "Humidity";
                    sensorIcon = "sensors-humidity-icon";
                    iconColor = "blue";
                }
                var date = new Date(entry.lastUpdate);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = date.getFullYear();
                var month = months[date.getMonth()];
                var day = date.getDate();
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                lastUpdate = day + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                var formattedSensor = {
                    sensorId: counter,
                    name: entry.name,
                    type: type,
                    lastUpdate: lastUpdate,
                    active: entry.active,
                    checkboxId: entry.sensorId,
                    icon: sensorIcon,
                    iconColor: iconColor,
                    id: entry.id
                };

                counter++;
                /*var input = document.getElementsByTagName("input");
                 var inputList = Array.prototype.slice.call(input);
                 if (entry.isActive) {
                 inputList[inputList.size-1].setAttribute("checked", "checked");
                 } else {
                 inputList[inputList.size-1].setAttribute("checked", "");
                 }*/

                console.log(formattedSensor);

                formattedSensorsList.push(formattedSensor);
            });

            $scope.sensorsList = formattedSensorsList;
        });
    }

    function editSensorName() {
        $(".sensor-name-noteditable").click(function () {
            var noteditableId = this.id;
            $('#' + noteditableId).css("display", "none");
            var sensorId = noteditableId.substring(19);
            var editableId = "#sensor-editable-" + sensorId;
            $(editableId).css("display", "block");

            $(".sensor-name-editable").blur(function () {
                $(editableId).css("display", "none");
                $('#' + noteditableId).css("display", "block");
                var data = {
                    "name": $(editableId).val()
                };
                console.log(data);

                $http.put('/sensor/' + sensorId, data).then(function () {
                    console.log("updated" + data);
                    getSensors();
                    setTimeout(function() {
                        editSensorName();
                    }, 2000);
                });
            })
        })
    }

    setTimeout(function() {
        editSensorName();
    }, 2000);

}]);