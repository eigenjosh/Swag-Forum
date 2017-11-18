function SwagService() {
    var baseUrl = 'http://localhost:3000'
    var comments = []
    var posts = []
    var sessionUID = []
    var activeUser = {}
    var db = {
        voteCount: 0,
        votes: {}
    }

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
        this.votes = {}
    }

    function BuildComment(form) {
        this.body = form.body.value,
        this.mediaUrl = form.mediaUrl.value
        this.votes = {}
    }

    function BuildLogin(form) {
        this.email = form.email.value,
        this.password = form.password.value
    }

    this.getPosts = function getPosts(cb) {
        $.get(baseUrl + '/forum/view/posts')
            .then(res => {
                res.userId = null
                delete res.userId
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

    this.login = function login(form) {
        var buildLogin = new BuildLogin(form)
        $.post(baseUrl + '/login', buildLogin)
            .then(res => {
                console.log(res)
            })
            .fail(logError)
    }

    this.getComments = function getComments(postId, cb) {
        $.get(baseUrl + `/forum/view/posts/${postId}/comments`)
            .then(res => {
                comments = res
                console.log(comments)
                cb(comments)
            })
            .fail(logError)
    }
    this.createComment = function createComment(form, postId, getComments) {
        var newComment = new BuildComment(form)
        $.post(baseUrl + `/forum/posts/${postId}/comments`, newComment)
            .then(getComments(postId))
            .fail(logError)
    }
    this.removeComment = function removeComment(postId, commentId, getComments){
		$.ajax({
			method: 'DELETE',
			url: baseUrl + `/forum/posts/${postId}/comments/${commentId}`
		})
			.then(getComments(postId))
			.fail(logError)
    }
    this.removePost = function removePost(postId, getPosts){
		$.ajax({
			method: 'DELETE',
			url: baseUrl + `/forum/posts/${postId}`
		})
			.then(getPosts())
			.fail(logError)
    }

    this.addVote = function addVote(voteValue, id){
        db.voteCount = 0
        db.votes[id] = voteValue
    }

    this.tallyVotes = function tallyVotes(){
        var votes = Object.values(db.votes)
        var sorted = {up:0, down:0}
        for(var i=0;i<votes.length;i++){
            var vote = votes[i];
            if(vote == 1){
                sorted.up++
            } else if(vote == -1){
                sorted.down++
            }
        }
        return `Up: ${sorted.up}; Down: ${sorted.down}`
    }



    // getPosts()


}