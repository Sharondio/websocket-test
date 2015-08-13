'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])


.controller('View2Ctrl', ['$scope', '$websocket', function($scope, $websocket) {
    var ws = $websocket.$new('ws://localhost:8080/teacherspace-ws/v1/projection/123')
        .$on('$open', function () {
            console.log('Oh my gosh, websocket is really open! Fukken awesome!');

            var data = {
                level: 1,
                text: 'ngWebsocket rocks!',
                array: ['one', 'two', 'three'],
                nested: {
                    level: 2,
                    deeper: [{
                        hell: 'yeah'
                    }, {
                        so: 'good'
                    }]
                }
            };

            ws.$emit('ping', 'hi listening websocket server') // send a message to the websocket server
                .$emit('pong', data);
        })
        .$on('pong', function (data) {
            console.log('The websocket server has sent the following data:');
            console.log(data);

            ws.$close();
        })
        .$on('$close', function () {
            console.log('Noooooooooou, I want to have more fun with ngWebsocket, damn it!');
        });
}]);