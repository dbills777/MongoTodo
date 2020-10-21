
  fetch('http://https://calm-shelf-89866.herokuapp.com/alltodos', {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(function (err) {
      console.log(err);
    });


