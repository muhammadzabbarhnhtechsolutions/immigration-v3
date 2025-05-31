'use client'
import { RemoveComment, setCmtNextPage, setCmtPrevPage, setCurrentPostComments, setNextPage, setNoMorePosts, setPostData, setPreviousPage, updateCommentLikes, UpdatePost, updatePostLikes } from "@/app/Redux/features/ForumSlice";
import { AddComments, DeleteMyComment, GeAllComments, GeAllPosts, LikePost, ReplySpecificComment, SpecificReply } from "@/services/postServices";
import { LikeComment } from "@/services/userPost";
import { Modal } from "flowbite-react";
import { Heart, MessageSquare, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import PostPlaceholder from './PostPlaceholder';

const ForumCard = () => {
    const [openModal, setOpenModal] = useState(false);
    const scrollableModalRef = useRef(null);;
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
    const [postby, setPostby] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const CurrentComments = useSelector((state) => state.forum.curentpostcmt);
    const [openDropdownId, setOpenDropdownId] = useState(null);


    useEffect(() => {
        const handleScroll = () => {
            if (scrollableModalRef.current) {
                const scrollPosition = scrollableModalRef.current.scrollHeight - scrollableModalRef.current.scrollTop - scrollableModalRef.current.clientHeight;
                const threshold = 100; // Trigger when near the bottom

                if (scrollPosition < threshold) {
                    console.log('Fetching more commneta...');
                    fetchMoreComments();
                }
            }
        };

        const scrollableDiv = scrollableModalRef.current;
        if (scrollableDiv) {

            scrollableDiv.addEventListener('scroll', handleScroll);
        } else {
            console.warn('scrollableDiv is not yet available');
        }

        return () => {
            if (scrollableDiv) {
                console.log('Removing scroll event listener from:', scrollableDiv);
                scrollableDiv.removeEventListener('scroll', handleScroll);
            }
        };
    }, [cmtNextpage]);


    useEffect(() => {
        if (feedbackType) {
            scrollableRef.current?.scrollTo(0, 0);
        }
    }, [feedbackType]);

    useEffect(() => {
        const newProfilePicturesByPost = {};
        posts.forEach(post => {
            const firstThreeComments = post?.comments?.slice(0, 3)?.map((comment) => ({
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
            const firstThreeLikes = post?.likes?.slice(0, 3)?.map((like) => ({
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



    const AddLikestoComment = async (id) => {
        setLoader(true);
        try {
            const result = await LikeComment(id); // Make async API call
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {

                    const currentPostCmts = CurrentComments.find(comment => comment.id === id);
                    console.log('currentPostCmts===', currentPostCmts)
                    if (currentPostCmts) {
                        dispatch(updateCommentLikes({ commentId: id, likesCount: currentPostCmts.likes_count + 1 }));
                    }
                    console.log('like comment===', Data);
                    // Optional: Close the modal or show a success message

                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };

    const handleCommentsClick = (post) => {

        console.log('post check', post)
        setSelectedPost(post);
        GetComments(post.id);
        setPostby(post.post_by)
        setPostid(post.id)
        setOpenModal(true);

    };
    const toggleDropdown = (id) => {
  setOpenDropdownId(openDropdownId === id ? null : id);
};


    return (
        <div ref={scrollableRef} style={{ overflowY: 'auto', maxHeight: '500px' }}>
            <div className="rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 py-4">
                {isLoading && Array.from({ length: 4 }).map((_, index) => <PostPlaceholder key={index} />)}
                {posts?.map(post => (
                    <div key={post.id} className=" flex gap-2 items-start rounded-md bg-clip-padding  bg-white mb-4">
                        <div className="w-full m-auto">
                            <div className="flex gap-3 p-t-4 px-4 items-center justify-center w-full">
                                <div className="pt-4 rounded-full">
                                    <Image src={post?.user_profile_url === null ? '/assets/user.png' : post.user_profile_url} alt={post.post_by} width={70} height={70} className="rounded-full" />
                                </div>
                                <div className="flex flex-col w-full  py-4">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex gap-2">
                                            <h1 className="text-[#27AAE1]">{post.post_by}</h1>
                                            <h4 className="text-[#5aaa7c]">following</h4>
                                        </div>

                                    </div>
                                    <div className="opacity-70 text-[13px]">{post.post_at_date} at {post.post_at_time}</div>
                                </div>
                            </div>
                            <p className="p-b-4 px-4">{post.caption}</p>
                            {post.image !== null &&
                                <Image src={post?.image === null ? '/assets/forum.png' : post.image} alt={post.caption} width={500} height={300} className="w-full" />
                            }


                            <div className="flex justify-center w-full">
                                <button
                                    onClick={() => {
                                        if (!post.is_my_like) {
                                            AddLikes(post.id);
                                        }
                                    }}
                                    disabled={post.is_my_like}
                                    className={`px-3 py-2 m-auto rounded-xl gap-1 text-nowrap flex items-center ${post.is_my_like ? 'text-[red] cursor-not-allowed' : ''}`}
                                >
                                    {post.is_my_like ? (
                                        <Heart stroke={"none"} fill='#c82726' />
                                    ) : null}
                                    {post?.likes_count} Likes
                                </button>

                                <button
                                    onClick={() => {
                                        toggleComments(post.id)
                                        handleCommentsClick(post)
                                    }}
                                    className="text-nowrap m-auto px-3 py-2 rounded-xl items-center flex gap-1 text-orange-400"
                                >
                                    <MessageSquare fill="#EC8949" />
                                    {post.comments_count} Comments
                                </button>
                            </div>

                            {/* {expandedComments[post.id] && ( */}
                            <div className="mt-4 space-y-4 p-4">


                                {/* Comments List */}
                                {post.comments?.map((comment) => (


                                    <div key={comment.id} className="flex items-start gap-2 mb-2">
                                        <Image
                                            src={comment.user_profile_url || '/assets/user.png'}
                                            alt={comment.comment_by}
                                            width={30}
                                            height={30}
                                            className="rounded-full"
                                        />
                                        <div className="bg-gray-100 px-3 py-1 rounded-lg">
                                            <span className="font-semibold text-sm">{comment.comment_by}</span>
                                            <p className="text-sm">{comment.comment}</p>
                                        </div>
                                    </div>

                                ))}

                            </div>
                        </div>
                    </div>
                ))}
                {nextPage == null &&
                    <div className="flex items-center justify-center gap-2 w-[100%] mt-1">
                        <h2 className="text-[25px] font-bold">{nomorePosts}</h2>
                    </div>
                }
            </div>

            {/* <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
                position="center"
                className="z-[99999] bg-black"
                theme={{
                    header: {
                        close: {
                            base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-white !bg-gray-200 !text-gray-900  z-[9999]",
                            icon: "h-5 w-5"
                        }
                    }
                }}
            >
                <div className="fixed inset-0 rounded-xl flex items-center justify-center p-4">
                    <div className="relative  w-full max-w-xl max-h-full">
                        <div className="relative  bg-[#88AE98] rounded-lg shadow">
                            <Modal.Header className="bg-[#71A587] rounded-t-lg flex justify-center items-center">
                            </Modal.Header>
                            <Modal.Body className="text-white bg-[#71A587] rounded-b-lg">
                                <div ref={scrollableModalRef} className="space-y-6 overflow-y-auto max-h-[500px]">
                                    {isLoading && (
                                        <div className="flex flex-col space-y-4">
                                            <PostPlaceholder />
                                        </div>
                                    )}

                                    {CurrentComments?.map((comment) => (
                                        <div key={comment.id} className="flex items-start gap-3">
                                            <Image
                                                src={comment.user_profile_url || '/assets/user.png'}
                                                alt={comment?.comment_by}
                                                width={35}
                                                height={35}
                                                className="rounded-full"
                                            />
                                            <div className="">
                                                <div className=" p-2 rounded-xl relative">
                                                    {(selectedPost?.is_my_post || comment.is_my_comment) && (
                                                        <button
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                            className="absolute top-0 right-0 text-white hover:text-red-500"
                                                            aria-label="Delete comment"
                                                        >
                                                            <MdDelete size={16} />
                                                        </button>
                                                    )}

                                                    <div className="text-white text-sm mt-1">
                                                        <span className="text-white font-semibold text-sm"> {comment?.comment_by} : </span>{comment?.comment}</div>
                                                </div>

                                                <div className="flex items-center gap-4 text-xs text-white mt-1 ml-1">
                                                    <span className="cursor-pointer" onClick={() => ShowReplay(comment.id)}>
                                                        Reply
                                                    </span>
                                                    <span
                                                        className={`flex items-center gap-1 cursor-pointer ${comment.is_my_like ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        onClick={() => {
                                                            if (!comment.is_my_like) AddLikestoComment(comment.id);
                                                        }}
                                                    >
                                                        {comment.is_my_like ? (
                                                            <Heart stroke="none" fill="#c82726" />
                                                        ) : (
                                                            <Heart />
                                                        )}
                                                        {comment?.likes_count}
                                                    </span>
                                                    <span className="opacity-70">{comment?.comment_at_time}</span>
                                                </div>

                                                {comment.is_any_reply && (
                                                    <p
                                                        className="text-white cursor-pointer text-xs ml-1 mt-1"
                                                        onClick={() => {
                                                            if (!showReplies[comment.id]) ReplySpecificCmt(comment.id);
                                                            toggleReplies(comment.id);
                                                        }}
                                                    >
                                                        {showReplies[comment.id] ? 'Show less' : `View all ${comment.reply_count} replies`}
                                                    </p>
                                                )}

                                                {replyid === comment.id && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <input
                                                            value={reply}
                                                            onChange={(e) => setReply(e.target.value)}
                                                            placeholder="Write a reply..."
                                                            className="bg-[#71A587] p-2 border- placeholder:text-white outline-none  border rounded-md w-full text-white"
                                                        />
                                                        <button
                                                            onClick={() => AddSpecificReply(comment.id, reply)}
                                                            className="bg-white  text-[#27b866] px-3 py-2 rounded-xl"
                                                        >
                                                            {loader ? '...' : <IoIosSend size={16} />}
                                                        </button>
                                                    </div>
                                                )}

                                                {showReplies[comment.id] && repliesData[comment.id]?.length > 0 && (
                                                    <div className="mt-2 ml-4 space-y-2">
                                                        {repliesData[comment.id]?.map((reply) => (
                                                            <div key={reply.id} className="flex items-start gap-2">
                                                                <Image
                                                                    src={reply.user_profile_url || '/assets/user.png'}
                                                                    alt={reply.comment_by}
                                                                    width={28}
                                                                    height={28}
                                                                    className="rounded-full"
                                                                />
                                                                <div className="flex-1 p-2 rounded-xl">

                                                                    <div className="text-white text-sm mt-1">
                                                                        <span className="text-white font-semibold text-sm">{reply?.comment_by}    </span>
                                                                        : {reply?.comment}</div>

                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-2 pt-4">
                                        <input
                                            value={comnt}
                                            onChange={(e) => setComnt(e.target.value)}
                                            placeholder="Add a comment..."
                                            className="bg-[#71A587] p-2 border- placeholder:text-white outline-none  border rounded-md w-full text-white"
                                        />
                                        <button onClick={() => AddComment()} className="bg-white  text-[#27b866] px-3 py-2 rounded-xl">
                                            {loader ? '...' : <IoIosSend size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </div>
                    </div>
                </div>
            </Modal> */}

            <Modal
                show={openModal}
                size="6xl" // Increased size to accommodate the layout
                onClose={() => {
                    setOpenModal(false);
                    setOpenDropdownId(null);
                }}
                popup
                position="center"
                className="z-[99999] bg-black"
                theme={{
                    header: {
                        close: {
                            base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-white !bg-gray-200 !text-gray-900 z-[9999]",
                            icon: "h-5 w-5"
                        }
                    },
                    content: {
                        base: "relative h-full w-full p-0 md:h-auto",
                        inner: "relative rounded-lg bg-white shadow flex flex-col max-h-[90vh]"
                    }
                }}
            >
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-6xl h-[80vh]">
                        <div className="relative bg-white rounded-lg shadow flex flex-col h-full">
                            <Modal.Header className="border-b p-4">
                                <h3 className="text-xl font-semibold text-gray-900">Comments</h3>
                            </Modal.Header>
                            <Modal.Body className="flex-1 overflow-hidden flex">
                                {/* Left Side - Post Image */}
                                <div className="w-1/2 border-r p-4 flex flex-col">
                                    {selectedPost && (
                                        <>
                                            <div className="flex items-center gap-3 mb-4">
                                                <Image
                                                    src={selectedPost?.user_profile_url || '/assets/user.png'}
                                                    alt={selectedPost.post_by}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <h4 className="font-semibold">{selectedPost.post_by}</h4>
                                                    <p className="text-xs text-gray-500">
                                                        {selectedPost.post_at_date} at {selectedPost.post_at_time}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="mb-4">{selectedPost.caption}</p>
                                            {selectedPost.image && (
                                                <div className="flex-1 flex items-center justify-center  rounded-lg overflow-hidden">
                                                    <Image
                                                        src={selectedPost.image}
                                                        alt={selectedPost.caption}
                                                        width={600}
                                                        height={600}
                                                        className="object-contain max-h-full"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Right Side - Comments */}
                                <div className="w-1/2 pt-4 px-4 relative overflow-y-auto" ref={scrollableModalRef}>
                                    {isLoading && (
                                        <div className="flex flex-col space-y-4">
                                            <PostPlaceholder />
                                        </div>
                                    )}

                                    {CurrentComments?.map((comment) => (
                                        <div key={comment.id} className="flex items-start gap-3 mb-4 group relative">
                                            <Image
                                                src={comment.user_profile_url || '/assets/user.png'}
                                                alt={comment?.comment_by}
                                                width={40}
                                                height={40}
                                                className="rounded-full flex-shrink-0"
                                            />
                                            <div className="flex-1">
                                                <div className="bg-gray-100 p-3 rounded-xl relative">
                                                    {(selectedPost?.is_my_post || comment.is_my_comment) && (
                                                        <div className="absolute top-2 right-2">
                                                            <button
                                                                onClick={() => toggleDropdown(comment.id)}
                                                                className="text-gray-500 hover:text-gray-700 p-1"
                                                            >
                                                                <MoreVertical size={16} />
                                                            </button>
                                                            {openDropdownId === comment.id && (
                                                                <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                                                    <button
                                                                        onClick={() => {
                                                                            handleDeleteComment(comment.id);
                                                                            setOpenDropdownId(null);
                                                                        }}
                                                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className="text-sm">
                                                        <span className="font-semibold">{comment?.comment_by}</span>
                                                        <p className="mt-1">{comment?.comment}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1 ml-1">
                                                    <button
                                                        onClick={() => ShowReplay(comment.id)}
                                                        className="hover:text-gray-700"
                                                    >
                                                        Reply
                                                    </button>
                                                    <button
                                                        className={`flex items-center gap-1 ${comment.is_my_like ? 'text-red-500' : 'hover:text-gray-700'}`}
                                                        onClick={() => {
                                                            if (!comment.is_my_like) AddLikestoComment(comment.id);
                                                        }}
                                                        disabled={comment.is_my_like}
                                                    >
                                                        {comment.is_my_like ? (
                                                            <Heart stroke="none" fill="#c82726" size={14} />
                                                        ) : (
                                                            <Heart size={14} />
                                                        )}
                                                        {comment?.likes_count}
                                                    </button>
                                                    <span>{comment?.comment_at_time}</span>
                                                </div>

                                                {comment.is_any_reply && (
                                                    <button
                                                        className="text-xs text-blue-500 mt-1 ml-1 hover:underline"
                                                        onClick={() => {
                                                            if (!showReplies[comment.id]) ReplySpecificCmt(comment.id);
                                                            toggleReplies(comment.id);
                                                        }}
                                                    >
                                                        {showReplies[comment.id] ? 'Show less' : `View all ${comment.reply_count} replies`}
                                                    </button>
                                                )}

                                                {replyid === comment.id && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <input
                                                            value={reply}
                                                            onChange={(e) => setReply(e.target.value)}
                                                            placeholder="Write a reply..."
                                                            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                                                        />
                                                        <button
                                                            onClick={() => AddSpecificReply(comment.id, reply)}
                                                            className="bg-blue-500 text-white px-3 py-2 rounded-md"
                                                        >
                                                            {loader ? '...' : <IoIosSend size={16} />}
                                                        </button>
                                                    </div>
                                                )}

                                                {showReplies[comment.id] && repliesData[comment.id]?.length > 0 && (
                                                    <div className="mt-2 ml-4 space-y-2">
                                                        {repliesData[comment.id]?.map((reply) => (
                                                            <div key={reply.id} className="flex items-start gap-2">
                                                                <Image
                                                                    src={reply.user_profile_url || '/assets/user.png'}
                                                                    alt={reply.comment_by}
                                                                    width={32}
                                                                    height={32}
                                                                    className="rounded-full flex-shrink-0"
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="bg-gray-100 p-2 rounded-xl relative">
                                                                        {reply.is_my_reply && (
                                                                            <div className="absolute top-1 right-1">
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation(); // Prevent event bubbling
                                                                                        toggleDropdown(`reply-${reply.id}`);
                                                                                    }}
                                                                                    className="text-gray-500 hover:text-gray-700 p-1"
                                                                                >
                                                                                    <MoreVertical size={14} />
                                                                                </button>
                                                                                {openDropdownId === `reply-${reply.id}` && (
                                                                                    <div
                                                                                        className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                                                                                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside dropdown from closing it
                                                                                    >
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                handleDeleteComment(reply.id);
                                                                                                setOpenDropdownId(null);
                                                                                            }}
                                                                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                                                        >
                                                                                            Delete
                                                                                        </button>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        <div className="text-sm">
                                                                            <span className="font-semibold">{reply?.comment_by}</span>
                                                                            <p className="mt-1">{reply?.comment}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 ml-1">
                                                                        {/* <button
                                                                            className={`flex items-center gap-1 ${reply.is_my_like ? 'text-red-500' : 'hover:text-gray-700'}`}
                                                                            onClick={() => {
                                                                                if (!reply.is_my_like) AddLikestoReply(reply.id);
                                                                            }}
                                                                            disabled={reply.is_my_like}
                                                                        >
                                                                            {reply.is_my_like ? (
                                                                                <Heart stroke="none" fill="#c82726" size={12} />
                                                                            ) : (
                                                                                <Heart size={12} />
                                                                            )}
                                                                            {reply?.likes_count}
                                                                        </button> */}
                                                                        <span>{reply?.comment_at_time}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="absolute w-[95%] bottom-0 bg-white pt-4 pb-2 border-t">
                                        <div className="flex items-center gap-2 ">
                                            <input
                                                value={comnt}
                                                onChange={(e) => setComnt(e.target.value)}
                                                placeholder="Add a comment..."
                                                className="flex-1 p-2 border border-gray-300 rounded-md"
                                            />
                                            <button
                                                onClick={AddComment}
                                                className="bg-blue-500 text-white p-4 py-2 rounded-md"
                                            >
                                                {loader ? '...' : <IoIosSend size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
};
export default ForumCard;