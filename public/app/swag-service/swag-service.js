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

    function Post(config) {
        this.postTitle = config.postTitle.value
        this.mediaUrl = config.mediaUrl.value
    }

    function Comment(config) {

    }

    this.getPosts = function getPosts(cb){
        $.get(baseUrl + '/forum/view/posts')
        .then(res => {
            posts = res
            cb(posts)
        })
    }
    this.regUser = function regUser(form, getPosts) {
        newUser = new BuildUser(form)
        $.post(baseUrl + '/register')
        .then(getPosts)
        console.log()
    }






    // getPosts()

    
}