const tweeter = Tweeter();
const renderer = Render();

renderer.renderPosts(tweeter.getPosts());

$('#post-button').on('click', function () {
    const $postInput = $('#post-input');
    const postText = $postInput.val(); 

    if (postText.trim() === '') {
        alert('Please enter some text for your post!');
        return; 
    }

    tweeter.addPost(postText); 
    renderer.renderPosts(tweeter.getPosts())        
    $postInput.val('');       
});

$('#posts').on('click', '.delete-post' , function(){
    const postID = $(this).data('id');
    tweeter.removePost(postID);
    renderAllPosts(); 
});

$('#posts').on('click', '.comment-button', function(){
    const $postElement = $(this).closest('.post');
    const postID = $postElement.data('id');
    const $commentInput = $postElement.find('.comment-input');
    const commentText = $commentInput.val();

    if (commentText.trim() === '')  return; 
    
    tweeter.addComment(postID, commentText);
    renderer.renderPosts(tweeter.getPosts())
    $commentInput.val(''); 
});

$('#posts').on('click', '.delete-comment', function(){
    const postID = $(this).closest('.post').data('id');
    const commentID = $(this).data('id');
    tweeter.removeComment(postID, commentID);
    renderer.renderPosts(tweeter.getPosts()) 
});