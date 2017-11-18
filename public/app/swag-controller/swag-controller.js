function SwagController() {
    var swagService = new SwagService()

    var postFeedElem = document.getElementById('post-feed')

    function getPosts() {
        swagService.getPosts(drawPosts)
    }

    function drawPosts(posts) {
        debugger
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
                        <a href="#">${post.userId}</a>
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

    this.register = function register(event){
        event.preventDefault()
        var form = event.target
        debugger
        swagService.regUser(form, getPosts)
    }
    this.newPost = function newPost(event){
        event.preventDefault()
        var form = event.target
        debugger
        swagService.createPost(form, getPosts)
    }


}