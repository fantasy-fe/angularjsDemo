/* Controllers */

function LessCtrl($scope, $http, ap_less, $timeout) {

    $scope.variables = window.variables || {};
    $scope.fonts = {};
    $scope.variablesPath = '';
    $scope.operateType = window.operateType;
    $scope.themeModel = {};

    var init = function () {
        if ($scope.operateType == "edit") {
            var url = '/BootstrapSetting/GetBootstrapTheme/' + window.themeId;
            $http.get(url).success(function (data) {
                console.info(data);
                var tempModel = data.model
                //var tempModel = {
                //    Name: 'blue theme',
                //    Description: 'this is bootstrap theme',
                //    content: 'content'
                //}
                var obj = JSON.parse(tempModel.LessVariable);
                //tempModel.content = data.data;
                $scope.themeModel = tempModel;
                $scope.initLessVariables(obj);
            });
        }


        if ($scope.operateType == "create" || $scope.operateType == "reset") {
            $http.get('/angularjsDemo/Scripts/magic/mainless/variables.json').success(function (data) {
                $scope.initLessVariables(data)
            });
        }else if( typeof $scope.operateType === 'undefined' ){
            $http.get('/angularjsDemo/Scripts/magic/mainless/variables.json').success(function (data) {
                $scope.initLessVariables(data)
            });
        }       
    };

    $scope.initLessVariables = function (data) {
        $scope.variables = data;
        $timeout(function () {
            $scope.applyLess(false);
        }, 0);

        $timeout(function () {
            // move into a service
            var keys = ap_less.getKeys($scope);
            var icons = ap_less.getUrls();
            var font = ap_less.getFonts();
            $timeout(function () {
                var $colorpicker = $('.colorpicker');
                $colorpicker.colorpicker().on('changeColor', function (ev) {
                    var scope = angular.element(this).scope();
                    scope.variable.value = ev.color.toHex();

                    $timeout(function () {
                        if ($scope.autoapplyless) {
                            $scope.autoApplyLess();
                        }
                    }, 500);

                });

                $('.lessVariable').each(function (index) {
                    var scope = angular.element(this).scope();
                    switch (scope.variable.type) {
                        case 'icons':
                            var src = icons;
                            break;

                        case 'font':
                            var src = font;
                            break;

                        case 'color':
                        default:
                            var src = keys;

                    }
                    $(this).typeahead({
                        source: src,
                        updater: function (item) {
                            scope.variable.value = item;
                            return item;
                        }
                    });
                });

            }, 0);
        }, 0);
    };

    init();
    
    $scope.autoapplyless = false;
    
    $scope.autoApplyLess = function (event) {
        if ($scope.autoapplyless){
            var vars = ap_less.getVariables($scope, false);
            less.modifyVars(vars.variables);

            //WebFont.load({
            //  google: {
            //    families: vars.fonts
            //  }
            //});
        }
    };
    
    $scope.applyLess = function (applyAll) {
        var vars = ap_less.getVariables($scope, applyAll);
        less.modifyVars(vars.variables);

        //WebFont.load({
        //  google: {
        //    families: vars.fonts
        //  }
        //});
    };
    
    $scope.colorpicker = function(type) {
    	return (type == 'color') ? true : false;
    }
    
    $scope.color = function(type, value) {
    	return (type == 'color' && /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(value) ) ? value : '#ffffff';
    }
    
    $scope.$on('applyLess', function() {
        $scope.applyLess();
    });
    
    $scope.setIsViewLoading = function(val) {
        $scope.isViewLoading = val;
    };
    
    $scope.minified = true;
    
    
    $scope.saveCSS = function() {
        ap_less.saveCSS($scope);
    }
    
    $scope.saveLessVariables = function () {
    	ap_less.saveLessVar(ap_less.getVariablesToString($scope));
    };
    
    $scope.resetLessVariables = function () {
        window.location.reload();
        $scope.operateType = 'reset';
        reset();
    	setTimeout(function() {
            $scope.applyLess();
        },0);
    };
    
    $scope.importLessVariables= function (string) {
        $scope = ap_less.importVariables($scope, string);
        $scope.applyLess();
    };
    
    $scope.upDateValue = function () {
        
    };
    
    $scope.isViewLoading = false;
    
    $scope.$on('$routeChangeStart', function() {
        $scope.isViewLoading = true;
    });
    
    $scope.$on('$routeChangeSuccess', function() {
        $scope.isViewLoading = false;
    });
    
    $scope.getGroupUrl = function() {
        return '/angularjsDemo/Scripts/magic/html/preview/' + angular.lowercase(this.group.name).replace(/[^\w ]+/g, '').replace(/ +/g, '-') + '.html';
    };
    
}
LessCtrl.$inject = ['$scope', '$http', 'ap_less', '$timeout'];

function PageCtrl($scope, $http, ap_less) {
    }
PageCtrl.$inject = ['$scope', '$http', 'ap_less'];