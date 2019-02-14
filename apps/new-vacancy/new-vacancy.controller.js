app.controller('NewVacancyCtrl', function($http){
  let vm = this;

  let titles = ['Administração', 'Administração Pública', 'Agronegócios', 'Ciências Contábeis', 'Ciências Econômicas', 'Comércio Exterior', 'Recursos HumanosGestão', 'Segurança Privada', 'Gestão de Seguros', 'Nutricionista'];

  let vacancy = {
    "date": "2018-01-07",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus urna leo, malesuada non dolor eget, volutpat dapibus neque. Aliquam finibus mollis est quis lacinia. Nullam non pulvinar purus, eu vestibulum tortor. Nulla et justo iaculis, bibendum dolor eget, sodales libero. Pellentesque pulvinar nibh at nunc suscipit consectetur. Praesent ut lectus sed elit dictum porta ut et arcu. Mauris dapibus rhoncus leo id venenatis. Sed accumsan lorem leo. Curabitur bibendum non massa eu volutpat. Aliquam tincidunt mi et tortor elementum, at ornare quam consectetur.",
    "requirement": "Morbi vel ex luctus, facilisis enim eget, mattis eros. Proin nec erat nisl. Duis consequat orci leo, sit amet tincidunt nisi varius sed. Suspendisse condimentum vulputate imperdiet. Fusce id ipsum non lectus rutrum luctus in at quam. Nullam lobortis, est non tempor blandit, mauris tellus imperdiet neque, et hendrerit nisl nunc ut nibh. Phasellus at blandit lacus. Maecenas quis urna interdum, semper diam vitae, blandit odio. Ut interdum est mauris, non eleifend metus rhoncus non. Nulla lobortis metus eros, pulvinar scelerisque arcu viverra sit amet. Integer vehicula urna non nisi mattis ullamcorper. Aenean fermentum pellentesque pretium. Aliquam fringilla lacinia vulputate.",
    "observation": "Pellentesque pretium turpis ac scelerisque efficitur. Mauris quis justo interdum, consequat risus eu, molestie lorem. Donec maximus massa blandit congue ullamcorper. Donec et lacus eget risus consectetur imperdiet id sed massa. Aenean vitae feugiat velit, id pretium enim. Nam purus urna, dignissim ut euismod id, mollis et dui.",
    "salary": "1200,00",
    "type": "CLT",
    "city": "Campinas",
    "state": "SP",
    "vacancies": 3,
    "pcd": "Sim",
    "candidature": {
        "type": "EMAIL",
        "email": "gabriela@contrata.com.br",
        "owner": "Gabriela",
        "date": "2019-01-30"
    },
    "visits": 0
  };

  vacancy.title = titles[Math.trunc(Math.random() * (9 - 0) + 0)];

  function compile(){
    $http.post('http://localhost:3456/company/new-vacancy', vacancy).success(response => {
      console.log(response);
      //window.location.reload();
    })
    .catch(err => console.log(err));
  }

  //compile();
});
