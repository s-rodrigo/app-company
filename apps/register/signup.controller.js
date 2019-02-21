app.controller('RegisterCtrl', function($scope, $http){
  let vm = this;
  vm.user = {};
  vm.msg = {};
  vm.valid = { email: '', password: '' };

  function IsEmail(email){
    let usuario = email.substring(0, email.indexOf("@"));
    let dominio = email.substring(email.indexOf("@")+ 1, email.length);

    if ((usuario.length >=1) &&
    (dominio.length >=3) &&
    (usuario.search("@")==-1) &&
    (dominio.search("@")==-1) &&
    (usuario.search(" ")==-1) &&
    (dominio.search(" ")==-1) &&
    (dominio.search(".")!=-1) &&
    (dominio.indexOf(".") >=1)&&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
      return true;
    }else{
      return false;
    }
  }

  vm.register = () => {
    vm.msg = {};
    vm.alert = false;

    if(!vm.user.company) return vm.msg = { text: 'Nome da empresa é obrigatório', type: 'warning', icon: 'mdi-action-lock' };
    if(vm.user.company.length <= 0 || vm.user.company.length > 150) return vm.msg = { text: 'Nome da empresa precisa ter no máximo 150 caracteres', type: 'warning', icon: 'mdi-action-lock' };

    if(!vm.user.responsible) return vm.msg = { text: 'Nome do responsável é obrigatório', type: 'warning', icon: 'mdi-action-lock' };
    if(vm.user.responsible.length <= 0 || vm.user.responsible.length > 80) return vm.msg = { text: 'Nome do responsável precisa ter no máximo 80 caracteres', type: 'warning', icon: 'mdi-action-lock' };

    if(!vm.user.city) return vm.msg = { text: 'É necessário informar a cidade da empresa', type: 'warning', icon: 'mdi-action-lock' };
    if(vm.user.city.name.length <= 0 || vm.user.city.name > 100) return vm.msg = { text: 'Nome da cidade precisa ter no máximo 100 caracteres', type: 'warning', icon: 'mdi-action-lock' };

    if(!vm.user.email) return vm.msg = { text: 'Email para acesso é obrigatório', type: 'warning', icon: 'mdi-action-lock' };
    if(!IsEmail(vm.user.email)) return vm.msg = { text: 'Informe um email valido', type: 'warning', icon: 'mdi-action-lock' };
    if(vm.user.email != vm.valid.email) return vm.msg = { text: 'A confirmação de email está diferente', type: 'warning', icon: 'mdi-action-lock' };


    if(!vm.user.password || vm.user.password.length < 8) return vm.msg = { text: 'Senha precisa ter no minimo 8 caracteres', type: 'warning', icon: 'mdi-action-lock' };
    if(vm.user.password.search('[a-zA-Z]') < 0) return vm.msg = { text: 'Senha precisa ter no minimo 1 letra', type: 'warning', icon: 'mdi-action-lock' };
    if(vm.user.password != vm.valid.password) return vm.msg = { text: 'A confirmação de senha está diferente', type: 'warning', icon: 'mdi-action-info' };

    if(!vm.user.termsOfUse) return vm.msg = { text: 'Você precisa concordar com os termo de uso, leia-o ao final do formulário', type: 'warning', icon: 'mdi-action-info' };



    $http.post('http://localhost:3456/public/register', vm.user).success(response => {
      vm.msg = { text: response.msg, type: 'success', icon: 'mdi-action-lock' };
      vm.user = {};
      vm.valid = { email: '', password: '' };
    }).catch(err => {
      if(err.data) vm.msg = { text: err.data.msg, type: 'danger', icon: 'mdi-action-lock' };
      else vm.msg = { text: 'Desculpe, tente novamente em instantes', type: 'danger', icon: 'mdi-action-lock' };
    });
  }
});
