function SwagService(){
    var baseUrl = 'http://localhost:3000'
    var comments = []
    var posts = []
    var sessionUID = []

    function logError(err){
        console.error(err)
    }

    function Post(config){
        this.postTitle = config.postTitle.value
        this.mediaUrl= config.mediaUrl.value
    }

    function Comment(config){

    }

    function getPosts(){
       debugger
        $.get(baseUrl + '/forum/view/posts')
        .then(res => {
            posts = res
            console.log(posts)
        })
    }






 getPosts()
    
}