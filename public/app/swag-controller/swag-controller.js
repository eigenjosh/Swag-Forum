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
                <img src="${post.mediaUrl}" alt="" class="col-sm-2 photo">
                <div class="blog-post">
                <i class="glyphicon glyphicon-trash pull-right" onclick="app.controllers.swagController.removePost('${post._id}')"></i>
                    <a><h2 class="blog-post-title" style="cursor: pointer" onclick="app.controllers.swagController.getComments('${post._id}')">${post.postTitle}</h2></a>
                    <p class="blog-post-meta">${post.createDate}
                        <a href="#">${post.userId.username}</a>
                    </p>
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

    function drawComments(comments) {
        var template = `<img class="image-temp col-md-8" src="${comments.posts.mediaUrl}">`;
        if (comments.comments.length !== 0) {
            for (i = 0; i < comments.comments.length; i++) {
                var comment = comments.comments[i]
                if (!comment.mediaUrl) {
                    comment.mediaUrl = ""
                }
                template += `
                <div class = "row" id="post-comments">
                    <div class = "col-md-10 outline">
                    <img class ="image-temp" src="${comment.mediaUrl}" alt="">
                    <i class="glyphicon glyphicon-trash pull-right" onclick="app.controllers.swagController.removeComment('${comment.postId}','${comment._id}')"></i>
                    <h5><strong>${comment.userId.username}</strong></h5>
                    <h4>${comment.body}</h4>
                    </div>
                    <div class="votes">
                    <span class = "glyphicon glyphicon-arrow-up"></span>
                    <span class = "vote-count">${post.votes}</span>
                    <span class = "glyphicon glyphicon-arrow-down"></span>
                </div>
                </div>
            `;
            }
        }
        template += `  
        <div class="row">
        <div class="col-xs-4">
        <form class="form" onsubmit="app.controllers.swagController.createComment(event,'${comments.posts._id}')">
        <div class="form-group">
            <label for="body"></label>
            <input type="text" name="body" class="form-control text-center" placeholder="comment  *required*">
        </div>
        <div class="form-group">
            <label for="mediaUrl"></label>
            <input type="text" name="mediaUrl" class="form-control text-center" placeholder="image link">
        </div>
        <div class="form-group text-center">
            <button class="btn btn-success" type="submit">Submit</button>
        </div>
    </form>
    </div>
    </div>`



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

    this.login = function login(event) {
        event.preventDefault()
        var form = event.target
        swagService.login(form)
    }

    this.createComment = function createComment(event, postId) {
        event.preventDefault()
        var form = event.target
        swagService.createComment(form, postId, this.getComments)
    }
    this.removeComment = function removeComment(postId, commentId) {
        swagService.removeComment(postId, commentId, this.getComments)
    }
    this.removePost = function removePost(postId) {
        swagService.removePost(postId, getPosts)
    }
}