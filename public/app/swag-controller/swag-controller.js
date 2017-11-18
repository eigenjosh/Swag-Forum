function SwagController() {
    var swagService = new SwagService()

    var postFeedElem = document.getElementById('post-feed')

    function getPosts() {
        swagService.getPosts(drawPosts)
    }

    this.getComments = function getComments(postId) {
        swagService.getComments(postId, drawComments)
    }

    function drawPosts(posts) {
        var template = ''
        for (var i = 0; i < posts.posts.length; i++) {
            var post = posts.posts[i];
            template += `
            <div class="col-sm-10 blog-main">
            <p>${post._id}</p>
                <img src="${post.mediaUrl}" alt="" class="col-sm-2">
                <div class="blog-post">
                    <h2 class="blog-post-title">${post.postTitle}</h2>
                    <p class="blog-post-meta">${post.createDate}
                        <a href="#">${post.username}</a>
                    </p>
                </div>
                <div class="votes">
                    <span class = "glyphicon glyphicon-arrow-up"></span>
                    <span class = "vote-count">${post.votes}</span>
                    <span class = "glyphicon glyphicon-arrow-down"></span>
                </div>
            </div>
            <div class = "post-comments">
                <button onclick="app.controllers.swagController.getComments('${post._id}')">View</button>
            </div>
            `
        }
        postFeedElem.innerHTML = template



    }
    getPosts()

    function drawComments(comments){
        var template = `<img src="${comments.posts.mediaUrl}" class = "col-md-8">`;
        for(i=0; i<comments.comments.length;i++){
            var comment = comments.comments[i]
            if(!comment.mediaUrl){
                comment.mediaUrl = ""
            }
            template += `
                <div class = "row" id="post-comments">
                    <div class = "col-md-10">
                    <p>${comment._id}</p>
                    <p>${comment.mediaUrl}</p>
                    <h5>${comment.body}</h5>
                    <h4>${comment.username}</h4>
                    </div>
                </div>
            `;
        }
        postFeedElem.innerHTML = template
    }

    this.register = function register(event) {
        event.preventDefault()
        var form = event.target
        swagService.regUser(form, getPosts)
    }
    this.newPost = function newPost(event) {
        event.preventDefault()
        var form = event.target
        swagService.createPost(form, getPosts)
    }

    this.login = function login(event){
        event.preventDefault()
        var form = event.target
        swagService.login(form)
    }


}