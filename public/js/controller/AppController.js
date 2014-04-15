/**
 * Created by guillermo on 14/04/2014.
 */
var socket = io.connect();

var AppController = function AppController($scope) {
    $scope.mappings = [];

    socket.on('list', function(documents) {
       $scope.$apply(function() {
            $scope.mappings = documents;
       });
    });

    socket.on('newMapping', function(mapping) {
        $scope.$apply(function() {
            $scope.mappings.push(mapping);
        });
    });

    $scope.addMapping = function() {
        socket.emit('addMapping', {alias: $scope.alias, url: $scope.url});
    };
};