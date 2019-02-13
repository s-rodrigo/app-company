// config

var app =
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {

        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$httpProvider', function($httpProvider){

    $httpProvider.interceptors.push(function($q, $localStorage, $location) {

      return {
        'request' : function (config) {
          let token = $localStorage.token;
          if (token != null) {
              config.headers['Authorization'] = token;
              return config;
          }

          return config;
        },
        'response': function(config, response) {
          return config;
        },
        'responseError': function(response) {
          if (response.status === 401 || response.status === 403) {
            delete $localStorage.token;
            $location.path('/signin');
          }

          return $q.reject(response);
        }
      };
    });
  }])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }]);
