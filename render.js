const Render = function(){

    const POSTS_CONTAINER_SELECTOR = '#posts';

    const _generateCommentHTML = function (comment) {
        return `
            <div class="comment" data-id="${comment.id}">
                <span class="comment-text">${comment.text}</span>
                <span class="delete-comment" data-id="${comment.id}">X</span>
            </div>
        `;
    };

    const _generatePostHTML = function (post) {
        const commentsHTML = post.comments.map(comment => _generateCommentHTML(comment)).join('');

        return `
            <div class="post" data-id="${post.id}">
                <div class="post-text">${post.text}</div>
                <div class="delete-post" data-id="${post.id}">Delete Post</div>
                <div class="comments"> ${commentsHTML} </div>
                <div class="add-comment-section">
                    <input type="text" placeholder="Got something to say?" class="comment-input">
                    <button class="comment-button">Comment</button>
                </div>
            </div>
        `;
    };
  
    const renderPosts = function (posts) {
        const $postsContainer = $(POSTS_CONTAINER_SELECTOR);
        $postsContainer.empty();
        posts.forEach(post => {
            const postHTML = _generatePostHTML(post);
            $postsContainer.append(postHTML);
        });
    };

    return { renderPosts: renderPosts };
};