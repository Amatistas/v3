
 
app.directive('user', [function() {
    return {
      restrict: 'E',
      template:'Nombre: {{user.name}}, email: <a href="mailto:{{user.email}}">{{user.email}}</a>'
    };
  }]);
 