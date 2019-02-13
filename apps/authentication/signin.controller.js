app.controller('LoginCtrl', function($localStorage, $http, $location){
  let vm = this;
  let local = $localStorage;

  if($localStorage.token) $location.path('/vacancies');

  vm.signin = user => {
    vm.msg = '';
    $http.post('http://localhost:3456/public/login', JSON.stringify(user)).success(response => {
      local.token = response.token;
      local.user = response.auth;
      $location.path('/vacancies');
    }).catch(err => {
      console.log(err);
      vm.msg = err.data.msg;
    });
  }
});
