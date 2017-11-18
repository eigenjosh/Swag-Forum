function SwagService() {
    var baseUrl = 'http://localhost:3000'
    var comments = []
    var posts = []
    var sessionUID = []
    var activePost = {}

    function logError(err) {
        console.error(err)
    }

    function BuildUser(form) {
        this.username = form.username.value,
            this.email = form.email.value,
            this.password = form.password.value
    }

    function BuildPost(form) {
        this.postTitle = form.postTitle.value,
            this.mediaUrl = form.mediaUrl.value
    }

    function BuildComment(form) {
        this.body = form.body.value,
            this.mediaUrl = form.mediaUrl.value
    }

    this.getPosts = function getPosts(cb) {
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
            .fail(logError)
    }

    this.getComments = function getComments(postId, getComments) {
        $.get(baseUrl + `/forum/view/posts/${postId}/comments`)
            .then(getComments)
            .fail(logError)
    }







    // getPosts()


}