app.factory('ComodoService',[
    '$http',
    function($http){
        return{
            getItems: function() {
                return $http.get('/../listas/Comodos.json').then(function(response){
                    var equip = response.data;
                    
                    return equip;
                })
            }
        }
}]);