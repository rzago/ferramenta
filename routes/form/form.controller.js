app.controller("formCtrl",
 function ($scope, ComodoService, EquipService) {
    
    ComodoService.getItems().then(function(response){
        $scope.Comodos = response;
    });


    EquipService.getItems().then(function(response){
        $scope.equipamentos = response;
    });
    
    $scope.ModalC = false;
    
    $scope.modalShown = false;

    $scope.toggleModalC = function () {
        $scope.ModalC = !$scope.ModalC;
        console.log($scope.ModalC);
    };
    
    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.Item = {
        'Comômdo': $scope.Comodo,
        'Equipamento': $scope.Equipamento,
        'Potencia': $scope.Potencia,
        'Quantidade' : $scope.Quantidade,
        'DiaInteiroLigado' : { 'Ligado' : true , 'TempodeUso': 24 , 'Tipo': 'Horas'},
        'HorariodeUso': [
            {'Nome':'Intermediário','Periodo': false, 'TempodeUso':$scope.TempodeUsoIntermediario1},
            {'Nome':'Ponta','Ponta': false, 'TempodeUso' :$scope.TempodeUsoPonta},
            {'Nome':'Intermediário','Intermediário2': false, 'TempodeUso': $scope.TempodeUsoIntermediario2},
            {'Nome':'ForadePonta','ForadePonta': false, 'TempodeUso': $scope.TempodeUsoForadePonta}
        ],
        'RepeteTodosMeses':false
    }

    $scope.CalculadoDeEnergia = function(item){
        if(item.DiaInteiroLigado.Ligado == true){
            item.Energia = (item.Quantidade * (item.Potencia/1000) * item.DiaInteiroLigado.TempodeUso).toFixed(2);
            console.log('Ligado',$scope.Calculo);
        }
        else {
            $scope.HorariosUsados = [];
            item.HorariodeUso.forEach(function(h){
                var calculo;
                if(h.Periodo == true){
                    if( h.Tipo.TipodeTempo == 'Horas'){
                        calculo = (item.Quantidade * (item.Potencia/1000) * h.TempodeUso).toFixed(2) ;
                        $scope.HorariosUsados.push(calculo);
                    }else {
                        calculo = (item.Quantidade * (item.Potencia/1000) * (h.TempodeUso/60)).toFixed(2);
                        $scope.HorariosUsados.push(calculo);
                    }
                }
                item.Energia = $scope.HorariosUsados;
            });
            
        }
    }

    $scope.TipoTempo = [
        {'TipodeTempo':'Horas','Valor':1},
        {'TipodeTempo':'Minutos','Valor':60} //TempodeUso/Valor
    ]


    $scope.HorariosdeUso = {
        'Intermediária1':'17h as 18h',
        'Ponta': '18h as 21h',
        'Intermediária2': '21h as 22h',
        'ForadePonta' : '22h as 17h'
    }
    
    $scope.ListadeEquipamentos = [];

    $scope.addEquip = function () {
        $scope.equips = angular.copy($scope.Item);
        $scope.ListadeEquipamentos.push($scope.equips);
        console.log($scope.ListadeEquipamentos);
        $scope.Item = {
            'Comômdo': $scope.Comodo,
            'Equipamento': $scope.Equipamento,
            'Potencia': $scope.Potencia,
            'Quantidade' : $scope.Quantidade,
            'DiaInteiroLigado' : { 'Ligado' : true , 'TempodeUso': 24 , 'Tipo': 'Horas'},
            'HorariodeUso': [
                {'Nome':'Intermediário','Periodo': false, 'TempodeUso':$scope.TempodeUsoIntermediario1},
                {'Nome':'Ponta','Ponta': false, 'TempodeUso' :$scope.TempodeUsoPonta},
                {'Nome':'Intermediário','Intermediário2': false, 'TempodeUso': $scope.TempodeUsoIntermediario2},
                {'Nome':'ForadePonta','ForadePonta': false, 'TempodeUso': $scope.TempodeUsoForadePonta}
            ],
            'RepeteTodosMeses':false
        };
    }


    $scope.deleteEquip = function (index) {
        $scope.ListadeEquipamentos.splice(index, 1);
    }


});



