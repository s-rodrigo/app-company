app.controller('ForgotPasswordCtrl', function($scope, $http){
  let vm = this;

  vm.user = { email: ''};
  vm.msg = {};

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

  vm.forgotPassword = () => {
    if(!vm.user.email || vm.user.email == '') return vm.msg = { text: 'É obrigatório informar seu email de acesso', type: 'warning'};
    if(!IsEmail(vm.user.email)) return vm.msg = { text: 'É obrigatório informar um email válido', type: 'warning'};

    $http.post('http://localhost:3456/public/forgot-password', vm.user).success( response => {
      console.log(response);
      vm.msg = { text: response.msg, type: 'success'};
    }).catch( err => {
      console.log(err);
      vm.msg = { text: err.data.msg, type: 'danger'};
    });
  }
});
