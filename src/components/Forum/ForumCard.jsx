

'use client'
import { RemoveComment, RemovePost, setCmtNextPage, setCmtPrevPage, setCurrentPostComments, setNextPage, setNoMorePosts, setPostData, setPreviousPage, updateCommentLikes, UpdatePost, updatePostLikes } from "@/app/Redux/features/ForumSlice";
import { AddComments, DeleteMyComment, GeAllComments, GeAllPosts, LikePost, ReplySpecificComment, SpecificReply } from "@/services/postServices";
import { DeletePost, LikeComment } from "@/services/userPost";
import { Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import PostPlaceholder from './PostPlaceholder';

const ForumCard = (props) => {
    const { nextPage, nomorePosts, cmtNextpage, feedbackType } = useSelector((state) => state.forum);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.forum.posts);
    const [showReplies, setShowReplies] = useState({});
    const [repliesData, setRepliesData] = useState({});
    const [comnt, setComnt] = useState('');
    const [postid, setPostid] = useState('');
    const loadingRef = useRef(false);
    const scrollableRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profilePicturesByPost, setProfilePicturesByPost] = useState({});
    const [likesByPost, setLikesByPost] = useState({});
    const [reply, setReply] = useState('');
    const [replyid, setReplyid] = useState('');
    const [expandedComments, setExpandedComments] = useState({});
    const [nestedReplyId, setNestedReplyId] = useState('');
    const [nestedReplyText, setNestedReplyText] = useState('');

    
    useEffect(() => {
        if (feedbackType) {
            scrollableRef.current?.scrollTo(0, 0);
        }
    }, [feedbackType]);

    useEffect(() => {
        const newProfilePicturesByPost = {};
        posts.forEach(post => {
            const firstThreeComments = post.comments.slice(0, 3).map((comment) => ({
                id: comment.id,
                userProfileUrl: comment.user_profile_url || '/assets/user.png',
            }));
            newProfilePicturesByPost[post.id] = firstThreeComments;
        });
        setProfilePicturesByPost(newProfilePicturesByPost);
    }, [posts]);

    useEffect(() => {
        const newLikesByPost = {};
        posts.forEach(post => {
            const firstThreeLikes = post.likes.slice(0, 3).map((like) => ({
                id: like.id,
                userProfileUrl: like.user_profile_url || '/assets/user.png',
            }));
            newLikesByPost[post.id] = firstThreeLikes;
        });
        setLikesByPost(newLikesByPost);
    }, [posts]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            setIsLoading(true);
            try {
                const result = await GeAllPosts();
                if ("data" in result) {
                    const Data = result?.data;
                    if (Data?.status) {
                        setIsLoading(false);
                        dispatch(setPostData(Data.results));
                        dispatch(setNextPage(Data.next));
                        dispatch(setPreviousPage(Data.previous));
                    } else {
                        toast.error(Data.message || "Error occurred");
                    }
                } else {
                    toast.error(result.message || "Error occurred");
                }
            } catch (error) {
                setIsLoading(false);
                toast.error('Something went wrong');
                console.error("Error fetching posts", error);
            }
        };
        fetchAllPosts();
    }, [dispatch]);

    const fetchMorePosts = async () => {
        setIsLoading(true);
        if (!nextPage) {
            setIsLoading(false);
            dispatch(setNoMorePosts('No more posts to fetch...'));
            return;
        }

        if (!loadingRef.current) {
            loadingRef.current = true;
            const result = await GeAllPosts(nextPage);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    dispatch(setPostData(Data.results));
                    dispatch(setPreviousPage(Data.previous));
                    dispatch(setNextPage(Data.next));
                    setIsLoading(false);
                    if (!Data.next) {
                        dispatch(setNoMorePosts('Data fetching complete: no more posts.'));
                    }
                }
            }
            loadingRef.current = false;
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (scrollableRef.current) {
                const scrollPosition = scrollableRef.current.scrollHeight - scrollableRef.current.scrollTop - scrollableRef.current.clientHeight;
                const threshold = 100;

                if (scrollPosition < threshold) {
                    fetchMorePosts();
                }
            }
        };

        const scrollableDiv = scrollableRef.current;
        if (scrollableDiv) {
            scrollableDiv.addEventListener('scroll', handleScroll);
        } else {
            console.warn('scrollableDiv is not yet available');
        }

        return () => {
            if (scrollableDiv) {
                scrollableDiv.removeEventListener('scroll', handleScroll);
            }
        };
    }, [nextPage]);

    const GetComments = async (id) => {
        try {
            const result = await GeAllComments(id);
            if ("data" in result) {
                const Data = result?.data
                
                if (Data?.status) {
                    dispatch(setCurrentPostComments(Data.results));
                    dispatch(setCmtNextPage(Data.next));
                    dispatch(setCmtPrevPage(Data.previous));
                }
            }
            else {
                toast.error(result.message || "Error occurred");
            }
        }
        catch (error) {
            toast.error('something went wrong')
            console.error("Signup error", error);
        }
    };

    const ReplySpecificCmt = async (id) => {
        try {
            const result = await SpecificReply(id);
            if ("data" in result) {
                const Data = result?.data
                if (Data?.status) {
                    setRepliesData(prev => ({ ...prev, [id]: Data.data }));
                    setShowReplies(prev => ({ ...prev, [id]: true }));
                }
            }
            else {
                toast.error(result.message || "Error occurred");
            }
        }
        catch (error) {
            toast.error('something went wrong')
            console.error("Signup error", error);
        }
    };

    const toggleReplies = (id) => {
        setShowReplies(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleComments = (postId) => {
        setExpandedComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
        if (!expandedComments[postId]) {
            GetComments(postId);
            setPostid(postId);
        }
    };

    const AddComment = async () => {
        const trimmedComment = comnt.trim();
        if (!trimmedComment) {
            toast.error('Please fill in your comment before submitting.');
            return;
        }

        setLoader(true);
        const values = { comnt: trimmedComment, postid };
        try {
            const result = await AddComments(values);
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    dispatch(UpdatePost({ postid, comnt: Data.data }));
                    setComnt('');
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };

    const AddLikes = async (id) => {
        setLoader(true);
        try {
            const result = await LikePost(id);
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    const currentPost = posts.find(post => post.id === id);
                    if (currentPost) {
                        dispatch(updatePostLikes({ postId: id, likesCount: currentPost.likes_count + 1, isMyLike: true }));
                    }
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };

    const handleDeleteComment = async (id) => {
        setLoader(true);
        try {
            const result = await DeleteMyComment(id);
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    dispatch(RemoveComment({ curentcommentid: id }));
                    toast.success('Deleted Successfully')
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };

    const AddSpecificReply = async (commentId, replyText) => {
        const trimmedComment = replyText.trim();
        if (!trimmedComment) {
            toast.error('Please fill in your comment before submitting.');
            return;
        }

        setLoader(true);
        const values = { comnt: trimmedComment, replyid: commentId };
        try {
            const result = await ReplySpecificComment(values);
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    GetComments(postid)
                    setRepliesData(prev => ({
                        ...prev,
                        [commentId]: [...(prev[commentId] || []), Data.data],
                    }));
                    setShowReplies(prev => ({
                        ...prev,
                        [commentId]: true,
                    }));
                    setReply('');
                    setReplyid('');
                    setNestedReplyId('');
                    setNestedReplyText('');
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };

    const ShowReplay = (id) => {
        setReplyid(id)
    }

    const ShowNestedReply = (id) => {
        setNestedReplyId(id)
    }

    const DeleteMyPost = async (id) => {
        setLoader(true);
        try {
            const result = await DeletePost(id);
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    dispatch(RemovePost({ curentpostid: id }));
                    toast.success('Deleted Successfully')
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };

    const AddLikestoComment = async (id) => {
        setLoader(true);
        try {
            const result = await LikeComment(id);
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    const currentPostCmts = useSelector((state) => state.forum.curentpostcmt).find(comment => comment.id === id);
                    if (currentPostCmts) {
                        dispatch(updateCommentLikes({ commentId: id, likesCount: currentPostCmts.likes_count + 1, isMyLike: true }));
                    }
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };

    const AddLikestoReply = async (id) => {
        setLoader(true);
        try {
            const result = await LikeComment(id);
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    // Find the reply in repliesData and update its likes
                    const updatedRepliesData = { ...repliesData };
                    for (const commentId in updatedRepliesData) {
                        const replyIndex = updatedRepliesData[commentId].findIndex(reply => reply.id === id);
                        if (replyIndex !== -1) {
                            updatedRepliesData[commentId][replyIndex].likes_count += 1;
                            updatedRepliesData[commentId][replyIndex].is_my_like = true;
                            break;
                        }
                    }
                    setRepliesData(updatedRepliesData);
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };

    return (
        <div ref={scrollableRef} style={{ overflowY: 'auto', maxHeight: '500px' }}>
            <div className="rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 py-4">
                {isLoading && Array.from({ length: 4 }).map((_, index) => <PostPlaceholder key={index} />)}
                {posts?.map(post => (
                    <div key={post.id} className="p-4 flex gap-2 items-start rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 bg-gray-500 mb-4">
                        <div className="w-full m-auto">
                            {post.image !== null &&
                                <Image src={post?.image === null ? '/assets/forum.png' : post.image} alt={post.caption} width={500} height={300} className="m-auto" />
                            }

                            <div className="flex gap-3 items-center justify-center w-full">
                                <div className="py-4 rounded-full">
                                    <Image src={post?.user_profile_url === null ? '/assets/user.png' : post.user_profile_url} alt={post.post_by} width={70} height={70} className="rounded-full" />
                                </div>
                                <div className="flex flex-col w-full border-b py-4">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex gap-2">
                                            <h1 className="text-[#27AAE1]">{post.post_by}</h1>
                                            <h4 className="text-[#5aaa7c]">following</h4>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => {
                                                    if (!post.is_my_like) {
                                                        AddLikes(post.id);
                                                    }
                                                }}
                                                disabled={post.is_my_like}
                                                className={`px-3 py-2 rounded-xl w-full flex items-center ${post.is_my_like ? 'text-[red] cursor-not-allowed' : ''}`}
                                            >
                                                {post.is_my_like ? (
                                                    <Heart stroke={"none"} fill='#c82726' />
                                                ) : null}
                                                {post?.likes_count} Likes
                                            </button>

                                            <button
                                                onClick={() => toggleComments(post.id)}
                                                className="text-nowrap px-3 py-2 rounded-xl w-full items-center flex gap-1 text-orange-400"
                                            >
                                                <MessageSquare fill="#EC8949" />
                                                {post.comments_count} Comments
                                            </button>

                                            <div className="flex gap-4 cursor-pointer">
                                                {post.is_my_post == true &&
                                                    <div className="text-red-7 flex gap-2 items-center" onClick={() => DeleteMyPost(post.id)}>
                                                        <MdDelete size={25} fill="white" />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-70 text-[13px]">Published a photo on {post.post_at_date} at {post.post_at_time}</div>
                                </div>
                            </div>

                            <p className="border-b py-4">{post.caption}</p>

                            {/* Expanded Comments Section */}
                            {expandedComments[post.id] && (
                                <div className="mt-4 space-y-4">
                                    {/* Comment Input */}
                                    <div className="flex items-center gap-2 w-full">
                                        <input
                                            value={comnt}
                                            onChange={(e) => setComnt(e.target.value)}
                                            placeholder="Write a comment..."
                                            className="p-2 rounded-md w-full"
                                        />
                                        <button
                                            onClick={() => AddComment()}
                                            className="bg-[#5aaa7c] px-3 py-2 rounded-xl"
                                        >
                                            {loader ? "Posting..." : <IoIosSend size={20} />}
                                        </button>
                                    </div>

                                    {/* Comments List */}
                                    {post.comments?.map((comment) => (
                                        <div key={comment.id} className="relative flex items-start gap-2 rounded-lg p-2 bg-[#88AE98]">
                                            <div>
                                                <Image
                                                    src={comment.user_profile_url || '/assets/user.png'}
                                                    alt={comment.comment_by}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                {post.is_my_post || comment.is_my_comment ? (
                                                    <button
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        className="absolute top-2 right-2 text-red-400 hover:text-red-500"
                                                        aria-label="Delete comment"
                                                    >
                                                        <MdDelete size={16} />
                                                    </button>
                                                ) : null}
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold">{comment.comment_by}</span>
                                                    <span className="text-white">{comment.comment}</span>
                                                </div>

                                                {/* Reply Controls */}
                                                <div className="flex justify-between items-center mt-2 text-xs">
                                                    <span
                                                        className="text-white cursor-pointer"
                                                        onClick={() => ShowReplay(comment.id)}
                                                    >
                                                        Reply
                                                    </span>
                                                    <span
                                                        className={`text-white flex items-center gap-1 cursor-pointer ${comment.is_my_like ? 'cursor-not-allowed' : ''}`}
                                                        onClick={() => {
                                                            if (!comment.is_my_like) {
                                                                AddLikestoComment(comment.id);
                                                            }
                                                        }}
                                                    >
                                                        {comment.is_my_like ? (
                                                            <Heart stroke={"none"} fill='#c82726' />
                                                        ) : null}
                                                        {comment?.likes_count} Likes
                                                    </span>
                                                    {comment.is_any_reply && (
                                                        <span
                                                            className="text-white cursor-pointer"
                                                            onClick={() => {
                                                                if (!showReplies[comment.id]) {
                                                                    ReplySpecificCmt(comment.id);
                                                                }
                                                                toggleReplies(comment.id);
                                                            }}
                                                        >
                                                            {showReplies[comment.id] ? "Show less" : `View all ${comment.reply_count} replies`}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Reply Input */}
                                                {replyid === comment.id && (
                                                    <div className="flex items-center gap-2 w-full mt-2">
                                                        <input
                                                            value={reply}
                                                            onChange={(e) => setReply(e.target.value)}
                                                            placeholder="Write a reply..."
                                                            className="p-2 rounded-md w-full"
                                                        />
                                                        <button
                                                            onClick={() => AddSpecificReply(comment.id, reply)}
                                                            className="bg-[#5aaa7c] px-3 py-2 rounded-xl"
                                                        >
                                                            {loader ? "Posting..." : <IoIosSend size={16} />}
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Replies Section */}
                                                {showReplies[comment.id] && repliesData[comment.id]?.length > 0 && (
                                                    <div className="mt-2 ml-4 space-y-2">
                                                        {repliesData[comment.id]?.map((reply) => (
                                                            <div key={reply.id} className="relative flex items-start gap-2 p-2 bg-[#4a5e52] rounded-lg">
                                                                <Image
                                                                    src={reply.user_profile_url || '/assets/user.png'}
                                                                    alt={reply.comment_by}
                                                                    width={30}
                                                                    height={30}
                                                                    className="rounded-full"
                                                                />
                                                                <div className="flex-1">
                                                                    {reply.is_my_reply && (
                                                                        <button
                                                                            onClick={() => handleDeleteComment(reply.id)}
                                                                            className="absolute top-2 right-2 text-red-400 hover:text-red-500"
                                                                            aria-label="Delete reply"
                                                                        >
                                                                            <MdDelete size={16} />
                                                                        </button>
                                                                    )}
                                                                    <div>
                                                                        <span className="text-white font-bold text-sm">{reply.comment_by}</span>
                                                                        <div className="text-white text-sm">{reply.comment}</div>
                                                                    </div>

                                                                    {/* Nested Reply Controls */}
                                                                    <div className="flex justify-between items-center mt-1 text-xs">
                                                                        {/* <span
                                                                            className="text-white cursor-pointer"
                                                                            onClick={() => ShowNestedReply(reply.id)}
                                                                        >
                                                                            Reply
                                                                        </span> */}
                                                                        <span
                                                                            className={`text-white flex items-center gap-1 cursor-pointer ${reply.is_my_like ? 'cursor-not-allowed' : ''}`}
                                                                            onClick={() => {
                                                                                if (!reply.is_my_like) {
                                                                                    AddLikestoReply(reply.id);
                                                                                }
                                                                            }}
                                                                        >
                                                                            {reply.is_my_like ? (
                                                                                <Heart stroke={"none"} fill='#c82726' />
                                                                            ) : null}
                                                                            {reply?.likes_count} Likes
                                                                        </span>
                                                                    </div>

                                                                    {/* Nested Reply Input */}
                                                                    {nestedReplyId === reply.id && (
                                                                        <div className="flex items-center gap-2 w-full mt-2">
                                                                            <input
                                                                                value={nestedReplyText}
                                                                                onChange={(e) => setNestedReplyText(e.target.value)}
                                                                                placeholder="Write a reply..."
                                                                                className="p-2 rounded-md w-full text-sm"
                                                                            />
                                                                            <button
                                                                                onClick={() => AddSpecificReply(reply.id, nestedReplyText)}
                                                                                className="bg-[#5aaa7c] px-2 py-1 rounded-xl"
                                                                            >
                                                                                {loader ? "Posting..." : <IoIosSend size={14} />}
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {nextPage == null &&
                    <div className="flex items-center justify-center gap-2 w-[100%] mt-1">
                        <h2 className="text-[25px] font-bold">{nomorePosts}</h2>
                    </div>
                }
            </div>
        </div>
    );
};

export default ForumCard;