app.directive('modalDialog', function(){
  return{
    restrict: 'E',
    scope:{
      show: '='
    },
    template:'<div class="ng-modal" ng-show="show">' +
    '<div class="ng-modal-overlay" ng-click="hideModal()"></div>'+
    '<div class="ng-modal-dialog" ng-style="dialogStyle">'+
        '<div class="ng-modal-close" ng-click="hideModal()">X</div>'+
        '<div class="ng-modal-dialog-content" ng-transclude>'+
        '</div>'+
    '</div>'+
    '</div>',
    transclude: true,
    link:function($scope, elem, attrs){
      $scope.dialogStyle = {};
      if(attrs.width){
        $scope.dialogStyle.width = attrs.width;
      }
      if(attrs.height){
        $scope.dialogStyle.height = attrs.height;
      }
      $scope.hideModal = function(){
        $scope.show = false;
      };
    }
  }
});

app.directive('modalBoot', function(){
  return{
    restrict: 'E',
    scope:{
      show: '='
    },
    templateUrl: 'modal.html',
    controller: function($scope, elem, attrs){
      
    }
       }
});