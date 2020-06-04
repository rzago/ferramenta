var app =angular.module("myApp",[
    'ngRoute'
]);

app.config(function ($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl : "routes/main/main.html"
    })
    .when("/simulador", {
        templateUrl : "routes/form/form.3.html",
        controller: "formCtrl"
    })
    .when("/composicao", {
        templateUrl: "routes/form/form-copy.html",
        controller:'formCtrl'
    });

});
