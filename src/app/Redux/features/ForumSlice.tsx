import { createSlice, PayloadAction } from '@reduxjs/toolkit';




// Define an interface for a like
interface Like {
    id: string;
    like_by: string;
    user_profile_url: string;
    like_at_date: string;
    like_at_time: string;
}

// Define an interface for a comment
interface Comment {
    id: string;
    comment: string;
    comment_by: string;
    user_profile_url: string;
    is_my_comment: boolean;
    comment_at_date: string;
    comment_at_time: string;
    is_any_reply: boolean;
    reply_count: number;
    likes_count: number;

}

// Define an interface for a post
interface Post {
    id: string;
    is_my_post: boolean;
    is_my_like: boolean;
    post_by: string;
    user_profile_url: string;
    post_at_date: string;
    post_at_time: string;
    caption: string;
    image: string;
    likes_count: number;
    comments_count: number;
    likes: Like[];
    comments: Comment[];
}

// Define an interface for the API response
interface PostsResponse {
    status: boolean;
    count: number;
    total_page_count: number;
    next: string | null;
    previous: string | null;
    results: Post[];
}

// Define an interface for the comments API response
interface CommentsResponse {
    status: boolean;
    count: number;
    total_page_count: number;
    next: string | null;
    previous: string | null;
    results: Comment[]; // Array of Comment objects
}

export interface CommentType {
    id: string
    comment: string
    comment_by: string
    user_profile_url: string
    is_my_comment: boolean
    comment_at_date: string
    comment_at_time: string
    is_any_reply: boolean
    reply_count: number
    likes_count: number
    posts: [],


}

interface CommentsReply {
    id: string
    comment: string
    post: string
    user: string
    parent: string
    is_any_reply: boolean
    reply_count: number
    likes_count: number
    comment_by: string
    user_profile_url: string
    comment_at_date: string
    comment_at_time: string
    is_my_comment: boolean
}

interface Postlikes {
    id: string;
    commentid: string;
    likes_count: number;
    is_my_like: boolean;
    // Other properties...
}

// Define the initial state type
interface ForumState {
    posts: Post[]; // Store posts here
    curentpostcmt: Comment[]; // Store posts here
    nextPage: string | null;      // To store the next page link
    previousPage: string | null;  // To store the previous page link
    nomorePosts: string | null;
    // coments states 
    cmtNextpage: string | null;
    cmtPrevpage: string | null;
    Postlikes: Postlikes[];
    feedbackType:string
}
// Correct the initial state type
const initialState: ForumState = {
    posts: [],
    curentpostcmt: [],
    nextPage: null,
    previousPage: null,
    nomorePosts: null,
    // coments states 
    cmtNextpage: null,
    cmtPrevpage: null,
    Postlikes: [],
    feedbackType : ""


};

const exampleSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        // Action to set posts data

        
        setPostData: (state, action: PayloadAction<Post[]>) => {
            // state.posts = []
            const posts = [...state.posts, ...action.payload]
            state.posts = posts; // Update posts state
            state.feedbackType = "all"
        },
        setNextPage: (state, action: PayloadAction<string>) => {
            state.nextPage = action.payload
        },

        setPreviousPage: (state, action: PayloadAction<string>) => {
            state.previousPage = action.payload
        },
        setNoMorePosts: (state, action: PayloadAction<string>) => {
            state.nomorePosts = action.payload
        },

        UpdatePost: (state, action: PayloadAction<{ comnt: CommentType, postid: string }>) => {
            // const updatePosts = state.posts.map((e) => {
            //     if (e.id === action.payload.postid) {
            //         return {
            //             ...e,
            //             comments: [...e.comments,  action.payload.comnt ]
            //         };
            //     }
            //     return e;
            // });
            // state.posts = updatePosts; // Update posts state
            if (state.curentpostcmt) {
                state.curentpostcmt.push(action.payload.comnt); // Update posts state
            }
        },

        setCurrentPostComments: (state, action: PayloadAction<Comment[]>) => {
            state.curentpostcmt = action.payload; // Update posts state
        },

        LoadMoreComments: (state, action: PayloadAction<Comment[]>) => {
            if (state.curentpostcmt) {
                const comments = [...state.curentpostcmt, ...action.payload]
                console.log('comments ====>', comments)
                state.curentpostcmt = comments; // Update posts state
            }

        },

        setCmtNextPage: (state, action: PayloadAction<string>) => {
            state.cmtNextpage = action.payload; // Update posts state
        },

        setCmtPrevPage: (state, action: PayloadAction<string>) => {
            state.cmtPrevpage = action.payload; // Update posts state
        },


        setUpdatePost: (state, action: PayloadAction<Post>) => {
            const posts = [action.payload, ...state.posts]
            console.log('new post', posts)
            state.posts = posts; // Update posts state

        },

        updatePostLikes: (state, action: PayloadAction<{ postId: string; likesCount: number; isMyLike: boolean }>) => {
            const { postId, likesCount, isMyLike } = action.payload;

            const post = state.posts.find(post => post.id === postId);
            console.log('post like count', post)
            if (post) {
                post.likes_count = likesCount; // Update the likes count
                post.is_my_like = isMyLike;
            }
        },

        RemoveComment: (state, action: PayloadAction<{ curentcommentid: string }>) => {
            const { curentcommentid } = action.payload;
            // Find the post that contains the comment
            state.curentpostcmt = state.curentpostcmt.filter(cmnt => cmnt.id !== curentcommentid);
        },

        UserPost: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
            state.feedbackType = "my"

        },

        RemovePost: (state, action: PayloadAction<{ curentpostid: string }>) => {
            const { curentpostid } = action.payload;
            // Find the post that contains the comment
            state.posts = state.posts.filter(post => post.id !== curentpostid);
        },


        updateCommentLikes: (state, action: PayloadAction<{ commentId: string; likesCount: number;  }>) => {
            const { commentId, likesCount } = action.payload;

            const post = state.curentpostcmt.find(post => post.id === commentId);
            console.log('post like count', post)
            if (post) {
                post.likes_count = likesCount; // Update the likes count
                // post.is_my_comment = isMyComment;
            }
        },

    },




});

export const { setPostData, setCurrentPostComments, setNextPage, setPreviousPage, setNoMorePosts, UpdatePost, setCmtPrevPage, setCmtNextPage, LoadMoreComments, setUpdatePost, updatePostLikes, RemoveComment, UserPost,RemovePost,updateCommentLikes } = exampleSlice.actions;

export default exampleSlice.reducer;
