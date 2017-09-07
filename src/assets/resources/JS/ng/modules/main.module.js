angular.module('main.module', ['ngMaterial',"ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {templateUrl : "resources/JS/ng/views/dashBoard.html"})
            .when("/Absence", {templateUrl : "resources/JS/ng/views/Absense.html"})
            .when("/Performance", {templateUrl : "resources/JS/ng/views/Performance.html"})
            .when("/Directory", {templateUrl : "resources/JS/ng/views/Directory.html"})
            .when("/Favorites", {templateUrl : "resources/JS/ng/views/Favorite.html"})
            .when("/Personal_Info", {templateUrl : "resources/JS/ng/views/Personal_Info.html"})
            .when("/Pay", {templateUrl : "resources/JS/ng/views/Pay.html"})
            .when("/Benefits", {templateUrl : "resources/JS/ng/views/Benefits.html"})
            .when("/Career", {templateUrl : "resources/JS/ng/views/Career.html"})
            .when("/Reports", {templateUrl : "resources/JS/ng/views/Reports.html"});

    })
    .controller('mainController',['$scope','$filter', function ($scope, $filter) {



        /******************************* variables ******************************/
        $scope.currentPage = 0;
        $scope.pageSize = 4;
        $scope.workletItemsFilterText = '';
        $scope.listView=true;
        $scope.gridView=false;
        $scope.orderByFields = ['title', 'description', 'price'];
        $scope.orderByField='id';
        $scope.breadcrumbs=[{title:'Home', path:'#/'}]
        $scope.workletItems=[
            {
                id:0, title:"Title One", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
                img:"resources/IMG/cardImage.jpg", price:"20"
            },
            {
                id:1, title:"Title Two", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
                img:"resources/IMG/cardImage.jpg", price:"40"
            },
            {
                id:2, title:"Title Thee", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
                img:"resources/IMG/cardImage.jpg", price:"50"
            },
            {
                id:3, title:"Title Four", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
                img:"resources/IMG/cardImage.jpg", price:"20"
            },
            {
                id:4, title:"Title Five", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
                img:"resources/IMG/cardImage.jpg", price:"30"
            },
            {
                id:5, title:"Title Six", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
                img:"resources/IMG/cardImage.jpg", price:"20"
            }
        ]






        /******************************* controller Functions ******************************/
        $scope.openItemDescription=function (selectedItem) {
            $scope.selectedItemData=selectedItem;
            $('#ietemTitle').text(selectedItem.title);
            $('#itemDesc').text(selectedItem.description);
            $('#itemPrice').text('$'+selectedItem.price);
            $('#itemImg').attr('src', selectedItem.img);
            console.log($scope.selectedItemData);
            $('#openCircularModale').click();
        };

        $scope.openWorklet=function (workletName,workletPath) {
            $scope.selectedWorklet=workletName;
            $scope.selectedWorkletPath=workletPath;
            $('#selectedWorklet').text( $scope.selectedWorklet);
            $('#selectedWorklet').attr('href',$scope.selectedWorkletPath);
        };

        $scope.getData = function (dataList, filterText) {return $filter('filter')(dataList, filterText)};
        $scope.workletItems_numberOfPages=function(){
            return Math.ceil($scope.getData($scope.workletItems, $scope.workletItemsFilterText).length/$scope.pageSize);
        };


        $scope.showDominos=function(index){
            if($scope.listView){$('#listDominos'+index).fadeIn('fast');}
            else{$('#cardDominos'+index).fadeIn('fast');}
        }
        $scope.hideDominos=function(index){
            if($scope.listView){$('#listDominos'+index).fadeOut('fast');}
            else{ $('#cardDominos'+index).fadeOut('fast');}
        }





    }]).filter('startFrom', function() {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});



