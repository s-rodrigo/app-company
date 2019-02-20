app.controller('AlterPasswordCtrl', function($http, $localStorage){
  let vm = this;

  vm.user = {};
  vm.user.email = $localStorage.user.email;

  vm.alterPassword = () => {
    vm.alert = false;

    if(vm.user.newPassword.length < 8){
      vm.msg = { text: 'Senha precisa ter no minimo 8 caracteres', type: 'warning', icon: 'mdi-action-lock' };
      vm.alert = true;

      return;
    }

    if(vm.user.newPassword.search('[a-zA-Z]') < 0){
      vm.msg = { text: 'Senha precisa ter no minimo 1 letra', type: 'warning', icon: 'mdi-action-lock' };
      vm.alert = true;

      return;
    }

    if((vm.user.newPassword == '' || !vm.user.newPassword) || (vm.user.confirmPassword == '' || !vm.user.confirmPassword)){
      vm.msg = { text: 'Defina uma nova senha.', type: 'warning', icon: 'mdi-action-info' };
      vm.alert = true;

      return;
    }

    if(vm.user.newPassword != vm.user.confirmPassword){
      vm.msg = { text: 'A confirmação de senha deve ser igual a nova senha.', type: 'warning', icon: 'mdi-action-info' };
      vm.alert = true;

      return;
    }

    if(vm.user.newPassword == vm.user.password){
      vm.msg = { text: 'A nova senha não pode ser igual a atual.', type: 'warning', icon: 'mdi-action-info' };
      vm.alert = true;

      return;
    }

    let userUpdate = { type: 'PASSWORD', email: vm.user.email, password: vm.user.password, newPassword: vm.user.newPassword };

    $http.post('http://localhost:3456/company/change-data/'+ $localStorage.user._id, userUpdate).success(response => {
      $localStorage.user = response;
      vm.msg = { text: 'Senha alterada com sucesso, atente-se ao próximo login.', type: 'success', icon: 'mdi-navigation-check' };
      vm.alert = true;
    }).catch(err => {
      vm.msg = { text: err.data.msg, type: 'danger', icon: 'mdi-navigation-cancel' };
      vm.alert = true;
    });
  }
});
