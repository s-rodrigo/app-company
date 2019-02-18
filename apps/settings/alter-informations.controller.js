app.controller('AlterInformationsCtrl', function($http, $localStorage){
  let vm = this;

  vm.user = angular.copy($localStorage.user);
  console.log(vm.user);
});
