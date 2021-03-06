app.directive('modalCustomizado',[
    'EquipService',
    function(EquipService){
    return {
      restrict: 'E',
      scope: {
        dis: '='
      },
      template: 
      '<div class="ng-modal" ng-if="dis">' +
      '<div class="ng-modal-overlay" ng-click="hideModal()"></div>'+
      '<div class="ng-modal-dialog" ng-style="dialogStyle">'+
          '<div class="ng-modal-close" ng-click="hideModal()">X</div>'+
          '<div class="ng-modal-dialog-content">'+
          '<h5></h5>'+
          '<form>'+
              '<div class="form-row">'+
                  '<div class="col-md-4 mb-3">'+
                      '<label for="">Eletrodomésticos:</label>'+
                      '<select name="eletrodomesticos" class="form-control" ng-options="x.Equipamento for x in equipamentos" ng-model="selected" ng-click="Item.Equipamento = selected.Equipamento ; Item.Potencia = selected.Potencia" ng-required="true">'+
                      '</select>'+
                      '<span ng-show="equipForm.eletrodomesticos.$invalid && equipForm.eletrodomesticos.$touched">Obrigatório</span>'+
                  '</div>'+
                  '<div class="col-md-4 mb-3">'+
                      '<label for="">Potência</label>'+
                      '<input class="form-control" id="" name="potencia" ng-model="Item.Potencia" ng-required="true">'+
                      '<span ng-show="equipForm.potencia.$invalid && equipForm.potencia.$touched">Obrigatório</span>' +
                  '</div>'+
                  '<div class="col-md-4 mb-3">'+
                      '<label for="">Quantidade</label>'+
                      '<input class="form-control" name="quantidade" type="number" ng-model="Item.Quantidade" ng-required="true">'+
                      '<span ng-show="equipForm.quantidade.$invalid && equipForm.quantidade.$touched">Obrigatório</span>'+
                 ' </div>'+
              '</div>'+
              '<fieldset class="form-group">'+
                  '<div class="row">'+
                      '<legend class="col-form-label col-sm-6 pt-0">Fica ligado o dia inteiro?</legend>'+
                      '<div class="col-sm-6">'+
                          '<div class="form-check">'+
                             '<input class="form-check-input" type="radio" ng-model="Item.DiaInteiroLigado" ng-value="true">'+
                              '<label class="form-check-label" for="">Sim</label>'+
                          '</div>'+
                          '<div class="form-check">'+
                              '<input class="form-check-input" type="radio" ng-model="Item.DiaInteiroLigado" ng-value="false">'+
                              '<label class="form-check-label" for="">Não</label>'+
                          '</div>'+
                      '</div>'+
                  '</div>'+
              '</fieldset>'+
             ' <div class="form-group row">'+
                  '<div class="col-sm-2">Adicione o(s) periodo(s) de uso:</div>'+
                  '<div class="col-sm-10">'+
                      '<div class="form-check">'+
                          '<label class="form-check-label" style="margin:0.5rem">'+
                              '<input class="form-check-input" type="checkbox" name="intermediario1" ng-model="Item.HorariodeUso[0].Intermediario1" ng-true-value="true" ng-false-value="false"> 17h as 18h'+
                         ' </label>'+
                          '<label class="form-check-label" ng-if="Item.HorariodeUso[0].Intermediario1">Tempo de uso:'+
                              '<input class="form-control" ng-model="Item.HorariodeUso[0].TempodeUsoIntermediario1" type="number">'+
                          '</label>'+
                      '</div>'+
                      '<div class="form-check">'+
                          '<label class="form-check-label" style="margin:0.5rem">'+
                              '<input class="form-check-input" type="checkbox" name="ponta" ng-model="Item.HorariodeUso[1].Ponta" ng-true-value="true" ng-false-value="false">18h as 21h'+
                          '</label>'+
                          '<label class="form-check-label" ng-if="Item.HorariodeUso[1].Ponta">Tempo de uso:'+
                              '<input class="form-control" ng-model="Item.HorariodeUso[1].TempodeUso" type="number">'+
                         ' </label>'+
                      '</div>'+
                      '<div class="form-check">'+
                          '<label class="form-check-label" style="margin:0.5rem">'+
                              '<input class="form-check-input" type="checkbox" name="intermediario2" ng-model="Item.HorariodeUso[2].Intermediario2" ng-true-value="true" ng-false-value="false">21h as 22h'+
                          '</label>'+
                          '<label class="form-check-label" ng-if="Item.HorariodeUso[2].Intermediario2">Tempo de uso:'+
                              '<input class="form-control" ng-model="Item.HorariodeUso[2].TempodeUso" type="number">'+
                          '</label>'+
                      '</div>'+
                      '<div class="form-check">'+
                          '<label class="form-check-label" style="margin:0.5rem">'+
                              '<input class="form-check-input" type="checkbox" name="foradeponta" ng-model="Item.HorariodeUso[3].ForadePonta" ng-true-value="true" ng-false-value="false">22h as 17h'+
                          '</label>'+
                          '<label class="form-check-label" ng-if="Item.HorariodeUso[3].ForadePonta">Tempo de uso:'+
                              '<input class="form-control" ng-model="Item.HorariodeUso[3].TempodeUso" type="number">'+
                          '</label>'+
                      '</div>'+
                  '</div>'+
              '</div>'+
              '<fieldset class="form-group">'+
                  '<div class="row">'+
                      '<legend class="col-form-label col-sm-2 pt-0">Esse consumo se repete para todos os meses?</legend>'+
                      '<div class="col-sm-10">'+
                          '<div class="form-check">'+
                              '<input class="form-check-input" type="radio" ng-model="Item.RepeteTodosMeses" ng-value="true">'+
                              '<label class="form-check-label" for="">Sim</label>'+
                          '</div>'+
                          '<div class="form-check">'+
                              '<input class="form-check-input" type="radio" ng-model="Item.RepeteTodosMeses" ng-value="false">'+
                              '<label class="form-check-label" for="">Não</label>'+
                          '</div>'+
                      '</div>'+
                  '</div>'+
              '</fieldset>'+
              '<div class="form-row">'+
                '<button ng-click="addEquip()">Adicionar</button>'+
            '</div>'+
         ' </form>'+
          '</div>'+
      '</div>'+
      '</div>',
      link: function($scope, elem, attrs){
        $scope.dialogStyle = {};
        $scope.display = {};
        if(attrs.width){
          $scope.dialogStyle.width = attrs.width;
        }
        if(attrs.height){
          $scope.dialogStyle.height = attrs.height;
        }
        $scope.hideModal = function(){
          $scope.dis = false;
        };
      },
      /*link: function($scope){
          $scope.$on("$destroy", function(){
              angular.element(document).find('body').addClass("disable");
          });
          angular.element(document).find('body').removeClass("disable");
      },*/
      controller: function($scope){

        EquipService.getItems().then(function(response){
            $scope.equipamentos = response;
        });
        
      }
    }
}]);