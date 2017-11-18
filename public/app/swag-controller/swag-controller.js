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
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            template += `
            <div class="col-sm-10 blog-main">
                <img src="${post.mediaUrl}" alt="" class="col-sm-2">
                <div class="blog-post">
                    <a><h2 class="blog-post-title" onclick="app.controllers.swagController.getComments('${post._id}')">${post.postTitle}</h2></a>
                    <p class="blog-post-meta">${post.createDate}
                        <a href="#">${post.userId.username}</a>
                    </p>
                     onclick="app.controllers.swagController.getComments('${post._id}')"
                </div>
                <div class="votes">
                    <span class = "glyphicon glyphicon-arrow-up"></span>
                    <span class = "vote-count">${post.votes}</span>
                    <span class = "glyphicon glyphicon-arrow-down"></span>
                </div>
            </div>
            <div class = "post-comments">
                
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
                    <p>${comment.mediaUrl}</p>
                    <h5>${comment.body}</h5>
                    <h4>${comment.userId.username}</h4>
                    </div>
                </div>
            `;
        }
        template += `  <form class="form" onsubmit="app.controllers.swagController.createComment(event,'${comment.postId}')">
        <div class="form-group">
            <label for="body"></label>
            <input type="text" name="body" class="form-control text-center" placeholder="comment">
        </div>
        <div class="form-group">
            <label for="mediaUrl"></label>
            <input type="text" name="mediaUrl" class="form-control text-center" placeholder="image link">
        </div>
        <div class="form-group text-center">
            <button class="btn btn-success" type="submit">Submit</button>
        </div>
    </form>`
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

    this.createComment = function createComment(event, postId){
        event.preventDefault()
        var form = event.target
        swagService.createComment(form, postId, this.getComments)
    }

}