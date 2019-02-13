app.controller('VacanciesCtrl', function($http){
  let vm = this;

  vm.query = {
    page: 1,
    limit: 10
  }

  vm.getVacancies = (page) => {
    if(page) vm.query.page = page;

    return new Promise((resolve, reject) => {
      $http.post('http://localhost:3456/company/filter/' + vm.query.page, JSON.stringify({})).success(response => {
        resolve(response);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  vm.otherPage = (page) => {
    vm.getVacancies(page).then(response => {
      vm.vacancies = response;
      vm.pagination = [];

      vm.size = Math.ceil(response.size / vm.query.limit);
      let limit = vm.query.page + 10;

      if(vm.size <= 10){
        for(let i = 1; i <= vm.size ; i++) vm.pagination.push({value: i , active: i == page ? true : false});
      } else {
        for(let i = vm.query.page; i <= limit ; i++) vm.pagination.push({value: i , active: vm.query.page == page ? true : false});
      }

      //console.log(vm.vacancies);
      //console.log(vm.pagination);
    });
  }

  vm.otherPage(1);
});
