app.factory('EquipService',[
    '$http',
    function($http){
        return{
            getItems: function() {
                return $http.get('/../listas/Equipamentos.json').then(function(response){
                    var items = response.data;
                    
                    return items;
                })
            }
        }
}]);