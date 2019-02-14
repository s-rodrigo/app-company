app.controller('VacanciesCtrl', function($http){
  let vm = this;

  vm.query = {
    page: 1,
    limit: 10,
    size: null,
    filter: ''
  }

  function compile(){
    $http.post('http://localhost:3456/company/filter', vm.query).success(vacancies => {
      vm.vacancies = vacancies;
      vm.pagination = [];

      if(!vm.query.size) vm.query.size = vacancies.size;

      vm.size = Math.ceil(vm.query.size / vm.query.limit);
      let limit = vm.query.page + 9;

      let size = vm.size;

      let diff = 4;

      let start = vm.query.page;
      let med = vm.query.page + diff;
      let end = vm.query.page + diff * 2;

      if(vm.query.page <= 5){
        for(let i = 1; i <= 9 ; i++) vm.pagination.push({value: i , active: i == vm.query.page ? true : false});
      }
      else if(vm.query.page > 5 && (vm.query.page + diff) <= size){
        start = vm.query.page - diff;
        med = vm.query.page;
        end = vm.query.page + diff;

        for(let i = start; i <= end ; i++) vm.pagination.push({value: i , active: i == vm.query.page ? true : false});
      }
      else{
        start = size - diff * 2;
        med = size - diff;
        end = size;

        for(let i = start; i <= end ; i++) vm.pagination.push({value: i , active: i == vm.query.page ? true : false});
      }

      if(vm.query.filter != '') vm.filtered = true;
      else vm.filtered = false;
    })
    .catch(err => console.log(err));
  }

  vm.filter = () => {
    vm.query.page = 1;
    compile();
  }

  vm.otherPage = page => {
    if(vm.query.page == page) return;
    vm.query.page = page;
    compile();
  }

  vm.otherPageMobile = type => {
    if(vm.query.page == 1 && type == 'back') return;
    if(vm.query.page == vm.size && type == 'next') return;

    if(type == 'next') vm.query.page += 1;
    else vm.query.page -= 1;

    compile();
  }

  compile();
});
