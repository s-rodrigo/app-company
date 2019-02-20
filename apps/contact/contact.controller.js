app.controller('ContactCtrl', function($localStorage, $http, $location, $mdToast){
  let vm = this;
  let user = $localStorage.user;

  vm.contact = {
    company: user.company,
    email: user.email,
    responsible: user.responsible,
    date: new Date()
  }

  vm.send = () => {
    let err = false;
    
    if(!vm.contact.title || vm.contact.title == '') err = true;
    if(!vm.contact.motive || vm.contact.motive == '') err = true;
    if(!vm.contact.body || vm.contact.body == '') err = true;
    if(err) return $mdToast.show($mdToast.simple().content('Por favor, preencha todos os campos.').position('top right').hideDelay(3000));

    $http.post('http://localhost:3456/company/contact', vm.contact).success(response => {
      console.log(response);
    }).catch( err => {
      console.log(err);
    });
  }
});
