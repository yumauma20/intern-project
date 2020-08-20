var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
      posts: [],
      post: {
        "userId" : null,
        "text": null,
        "category" : null
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
    fetch(url + "/posts", {
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
    console.log(json.posts);
    vm.posts = json.posts;
    console.log(vm.posts);
    })
    .catch(function(err) {
    // レスポンスがエラーで返ってきたときの処理はここに記述する
    var content = JSON.stringify(err, null, 2);
    console.log(content);
    });

    },
    methods: {
    // Vue.jsで使う関数はここで記述する
      create: function() {
      fetch(url + "/post", {
        method: "POST",
        body: JSON.stringify({
            "userId": localStorage.getItem('userId'),
            "text": vm.post.text,
            "category": vm.post.category
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
          location.href　= ('./index.html');
        })
        .catch(function(err) {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          var content = JSON.stringify(err, null, 2);
          console.log(content);
        });
    },
  },
});
