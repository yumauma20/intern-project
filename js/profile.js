var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
      user: {
        userId: null,
        password: null,
        nickname: null,
        age: null
      }
    },
    computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    },
    created: function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    if (!localStorage.getItem('token')) {
      location.href　= ('./login.html');
    }
    // APIにGETリクエストを送る
      fetch(url + "/user" +
          "?userId=" + localStorage.getItem('userId'), {
          method: "GET"
      })
      .then(function(response) {
          if (response.status == 200) {
              return response.json();
          }
          // 200番以外のレスポンスはエラーを投げる
          return response.json().then(function(json) {
              throw new Error(json.message);
          });
      })
      .then(function(json) {
      // レスポンスが200番で返ってきたときの処理はここに記述する
        vm.user.userId = json.userId,
        vm.user.nickname = json.nickname,
        vm.user.age = json.age
      })
      .catch(function(err) {
      // レスポンスがエラーで返ってきたときの処理はここに記述する
      });
    },
    methods: {
    // Vue.jsで使う関数はここで記述する
      submit: function(){
          // APIにPOSTリクエストを送る
          fetch(url + "/user", {
            method: "PUT",
            body: JSON.stringify({
                "userId": vm.user.userId,
                "password": vm.user.password,
                "nickname": vm.user.nickname,
                "age": Number(vm.user.age)
            })
          })
            .then(function(response) {
                if (response.status == 200) {
                    return response.json();
                }
                // 200番以外のレスポンスはエラーを投げる
                return response.json().then(function(json) {
                    throw new Error(json.message);
                });
            })
            .then(function(json) {
            // レスポンスが200番で返ってきたときの処理はここに記述する
            var content = JSON.stringify(json, null, 2);
            console.log(content);
            })
            .catch(function(err) {
            // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
      },
      deleteUser : function(){
        // APIにPOSTリクエストを送る
        fetch(url + "/user", {
          method: "DELETE",
          body: JSON.stringify({
              "userId": localStorage.getItem('token')
          })
        })
          .then(function(response) {
              if (response.status == 200) {
                  return response.json();
              }
              // 200番以外のレスポンスはエラーを投げる
              return response.json().then(function(json) {
                  throw new Error(json.message);
              });
          })
          .then(function(json) {
          // レスポンスが200番で返ってきたときの処理はここに記述する
            location.href = './login.html';
          })
          .catch(function(err) {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          });
      }
    },
});
