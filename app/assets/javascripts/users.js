window.onload = function () {
  var users = new Vue({
    el: '#users',
    data: {
      users: [],
      user: {
        name: '',
        age: ''
      },
      errors: {}
    },
    created: function() {
      this.getUsers();
    },
    methods: {
      getUsers : function (e) {
        var that;
        that = this;
        $.ajax({
          url: '/users.json',
          success: function(res) {
            that.users = res;
          }
        });
      },

      addUser: function () {
        var that = this;
        $.ajax({
          method: 'POST',
          data: {
            user: that.user,
          },
          url: '/users.json',
          success: function(res) {
            that.errors = {}
            that.users.push(res);
            that.user = {
                          name: '',
                          age: ''
                        }
          },
          error: function(res) {
            that.errors = res.responseJSON.errors
          }
        })
      }

    }
  });

  Vue.component('user-row', {
    template: '#user-row',
    props: {
      user: Object
    }
  })
}
