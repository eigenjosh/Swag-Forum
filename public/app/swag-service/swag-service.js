function SwagService() {
    var baseUrl = 'http://localhost:3000'
    var comments = []
    var posts = []
    var sessionUID = []

    function logError(err) {
        console.error(err)
    }

    function BuildUser(form) {
        this.username = form.username.value,
            this.email = form.email.value,
            this.password = form.password.value
    }

    function BuildPost(config) {
        this.postTitle = config.postTitle.value,
            this.mediaUrl = config.mediaUrl.value
    }

    function BuildComment(config) {
        this.body = config.body.value,
            this.mediaUrl = config.mediaUrl.value
    }

    this.getPosts = function getPosts(cb){
        $.get(baseUrl + '/forum/view/posts')
        .then(res => {
            posts = res
            cb(posts)
        })
    }
    this.regUser = function regUser(form, getPosts) {
        var newUser = new BuildUser(form)
        $.post(baseUrl + '/register', newUser)
            .then(getPosts)
            .fail(logError)
    }

    this.createPost = function createPost(form, getPosts) {
        var newPost = new BuildPost(form)
        $.post(baseUrl + '/forum/posts', newPost)
            .then(getPosts)
            res.send("Post successfully created")
            .fail(logError)
    }







    getPosts()

    
}