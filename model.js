const Tweeter = function () {

    // Private array of posts, initialized with dummy data
    const _posts = [
        {
            text: "First post!",
            id: "p1",
            comments: [
                { id: "c1", text: "First comment on first post!" },
                { id: "c2", text: "Second comment on first post!!" },
                { id: "c3", text: "Third comment on first post!!!" }
            ]
        },
        {
            text: "Aw man, I wanted to be first",
            id: "p2",
            comments: [
                { id: "c4", text: "Don't worry second poster, you'll be first one day." },
                { id: "c5", text: "Yeah, believe in yourself!" },
                { id: "c6", text: "Haha second place what a joke." }
            ]
        }
    ];

  
    let _postIdCounter = _posts.length > 0 ? parseInt(_posts[_posts.length - 1].id.substring(1)) : 0;
    let _commentIdCounter = 0;
    // Calculate initial commentIdCounter by iterating through existing comments
    _posts.forEach(post => {
        post.comments.forEach(comment => {
            const currentCommentIdNum = parseInt(comment.id.substring(1));
            if (currentCommentIdNum > _commentIdCounter) {
                _commentIdCounter = currentCommentIdNum;
            }
        });
    });

    const getPosts = function () {
        return JSON.parse(JSON.stringify(_posts));
    };

    const addPost = function (text) {
        _postIdCounter++;
        const newPost = {
            text: text,
            id: "p" + _postIdCounter,
            comments: []
        };
        _posts.push(newPost);
    };

    const removePost = function (postID) {
        const postIndex = _posts.findIndex(post => post.id === postID);
        if (postIndex !== -1) {
            _posts.splice(postIndex, 1);
        } else {
            console.log(`Post with ID ${postID} not found.`);
        }
    };

    const addComment = function (postID, text) {
        const post = _posts.find(p => p.id === postID);
        if (post) {
            _commentIdCounter++;
            const newComment = {
                id: "c" + _commentIdCounter,
                text: text
            };
            post.comments.push(newComment);
        } else {
            console.log(`Post with ID ${postID} not found for adding comment.`);
        }
    };

    const removeComment = function (postID, commentID) {
        const post = _posts.find(p => p.id === postID);
        if (post) {
            const commentIndex = post.comments.findIndex(comment => comment.id === commentID);
            if (commentIndex !== -1) {
                post.comments.splice(commentIndex, 1);
            } else {
                console.log(`Comment with ID ${commentID} not found in post ${postID}.`);
            }
        } else {
            console.log(`Post with ID ${postID} not found for removing comment.`);
        }
    };

    return {
        getPosts: getPosts,
        addPost: addPost,
        removePost: removePost,
        addComment: addComment,
        removeComment: removeComment
    };
};

//--- Test for Logic---
const tweeter = Tweeter();
console.log("Initial posts:", JSON.stringify(tweeter.getPosts()));

// Test adding a post
tweeter.addPost("This is my own post!");
console.log("After adding a post:", tweeter.getPosts());
// Should add a post like: {text: "This is my own post!", id: "p3", comments: []}

// Test removing a post
tweeter.removePost("p1");
console.log("After removing p1:", tweeter.getPosts());
// Should only have two posts left (p2 and p3)

// Test adding comments
tweeter.addComment("p3", "Damn straight it is!");
tweeter.addComment("p2", "Second the best!");
console.log("After adding comments:", tweeter.getPosts());

// Test removing comments
tweeter.removeComment("p2", "c6");
console.log("After removing c6 from p2:", tweeter.getPosts());
