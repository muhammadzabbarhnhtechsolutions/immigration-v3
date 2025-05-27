'use client'
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Delete, DeleteIcon, ThumbsDown, ThumbsUp } from "lucide-react";
import Comment from "./Comment";
import { Root } from "@/utils/posttypes";
import { Button, Label, Modal, Textarea, } from "flowbite-react";
import { AddComments, DeleteMyComment, GeAllComments, GeAllPost, GeAllPosts, LikePost, ReplySpecificComment, SpecificReply } from "@/services/postServices";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/Redux/store';
import PostPlaceholder from './PostPlaceholder'
import { IoIosSend } from "react-icons/io";
import { setCurrentPostComments, setPostData, setNextPage, setPreviousPage, setNoMorePosts, UpdatePost, setCmtNextPage, setCmtPrevPage, LoadMoreComments, updatePostLikes, RemoveComment, RemovePost, updateCommentLikes } from "@/app/Redux/features/ForumSlice";
import { MdDelete } from "react-icons/md";
import { DeletePost, LikeComment } from "@/services/userPost";
// Update with your store path



const ForumCard = (props) => {
    const { nextPage, nomorePosts, cmtNextpage, feedbackType } = useSelector((state) => state.forum);
    const [openModal, setOpenModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [postby, setPostby] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.forum.posts);
    console.log('postss-----', posts)
    const CurrentComments = useSelector((state) => state.forum.curentpostcmt);
    console.log('CurrentComments===', CurrentComments)
    // const MoreComments = useSelector((state: RootState) => state.forum.morecomments);
    const [showReplies, setShowReplies] = useState({});
    const [repliesData, setRepliesData] = useState({});
console.log('repliesData',repliesData)
    // add commt 
    const [comnt, setComnt] = useState('');
    const [postid, setPostid] = useState('');
    const loadingRef = useRef(false); // To prevent multiple calls
    const scrollableRef = useRef(null);; // Reference for the scrollable div
    const [isLoading, setIsLoading] = useState(true);
    // comt 
    const loadingRef2 = useRef(false); // To prevent multiple calls
    const scrollableModalRef = useRef(null);; // Reference for the scrollable div
    // Initialize the state with the correct type
    const [profilePicturesByPost, setProfilePicturesByPost] = useState({});
    const [likesByPost, setLikesByPost] = useState({});

    //  add specif comt reply 
    const [reply, setReply] = useState('');
    const [replyid, setReplyid] = useState('');
    console.log('feedbackType===', feedbackType)


    useEffect(() => {

        if (feedbackType)
            // window.scrollTo(0,0)
            scrollableRef.current?.scrollTo(0, 0)

    }, [feedbackType])

    // comment user profile  
    useEffect(() => {
        // Assuming 'posts' is already populated
        const newProfilePicturesByPost = {};

        posts.forEach(post => {
            const firstThreeComments = post.comments.slice(0, 3).map((comment) => ({
                id: comment.id,
                userProfileUrl: comment.user_profile_url || '/assets/user.png', // Fallback image
            }));

            newProfilePicturesByPost[post.id] = firstThreeComments; // Store by post ID
        });

        setProfilePicturesByPost(newProfilePicturesByPost);

    }, [posts]); // Runs when posts change

    // likes user profile  
    useEffect(() => {
        // Assuming 'posts' is already populated
        const newLikesByPost = {};

        posts.forEach(post => {
            const firstThreeLikes = post.likes.slice(0, 3).map((like) => ({
                id: like.id,
                userProfileUrl: like.user_profile_url || '/assets/user.png', // Fallback image
            }));

            newLikesByPost[post.id] = firstThreeLikes; // Store by post ID
        });

        setLikesByPost(newLikesByPost);
    }, [posts]); // Runs when posts change


    // get all posts 
    useEffect(() => {
        const fetchAllPosts = async () => {
            setIsLoading(true);
            try {
                const result = await GeAllPosts(); // Fetch the initial posts
                if ("data" in result) {
                    const Data = result?.data;
                    if (Data?.status) {
                        setIsLoading(false);
                        dispatch(setPostData(Data.results)); // Store posts in Redux
                        dispatch(setNextPage(Data.next)); // Store posts in Redux
                        dispatch(setPreviousPage(Data.previous)); // Store posts in Redux

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

            dispatch(setNoMorePosts('No more posts to fetch...')); // Example action to update the state
            return;
        }

        if (!loadingRef.current) {
            loadingRef.current = true; // Prevent further calls while loading
            const result = await GeAllPosts(nextPage); // Use nextPage URL
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    dispatch(setPostData(Data.results)); // Update posts with new data
                    dispatch(setPreviousPage(Data.previous)); // Store previous page in Redux
                    dispatch(setNextPage(Data.next)); // Store next page in Redux
                    setIsLoading(false);
                    if (!Data.next) {
                        dispatch(setNoMorePosts('Data fetching complete: no more posts.')); // Example action to update the state
                    }
                }
            }
            loadingRef.current = false; // Allow further calls after loading is done
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (scrollableRef.current) {
                const scrollPosition = scrollableRef.current.scrollHeight - scrollableRef.current.scrollTop - scrollableRef.current.clientHeight;
                const threshold = 100; // Trigger when near the bottom

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
    }, [nextPage]); // Ensure nextPage is defined and changes



    //   NEXT PREVIOUS PAGE

    // const fetchNextPage = async () => {
    //     if (nextPage) {
    //         console.log('next---',nextPage);
    //       const result = await GeAllPosts(nextPage); // Use nextPage URL
    //       if ("data" in result) {
    //         const Data = result?.data;
    //         if (Data?.status) {
    //           dispatch(setPostData(Data.results)); // Update posts with new data
    //           dispatch(setPreviousPage(Data.previous)); // Store posts in Redux
    //             dispatch(setNextPage(Data.next)); // Store posts in Redux

    //         }
    //       }
    //     }
    //   };

    //   const fetchPreviousPage = async () => {
    //     if (previousPage) {
    //       const result = await GeAllPosts(previousPage); // Use previousPage URL
    //       if ("data" in result) {
    //         const Data = result?.data;
    //         if (Data?.status) {
    //           dispatch(setPostData(Data.results)); // Update posts with new data
    //           dispatch(setPreviousPage(Data.previous)); // Store posts in Redux
    //             dispatch(setNextPage(Data.next)); // Store posts in Redux
    //         }
    //       }
    //     }
    //   };

    const handleCommentsClick = (post) => {

        console.log('post check', post)
        setSelectedPost(post);
        GetComments(post.id);
        setPostby(post.post_by)
        setPostid(post.id)
        setOpenModal(true);

    };


    // getall comments of specific post
    const GetComments = async (id) => {
        setOpenModal(true)
        try {
            const result = await GeAllComments(id);
            if ("data" in result) {
                const Data = result?.data
                if (Data?.status) {
                    dispatch(setCurrentPostComments(Data.results)); // Reset the video URL or any other cleanup action
                    // dispatch(LoadMoreComments(Data.results)); // Reset the video URL or any other cleanup action
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
            // setLoader(false);
        }
    };

    const fetchMoreComments = async () => {
        setIsLoading(true);
        if (!cmtNextpage) {
            setIsLoading(false);

            dispatch(setNoMorePosts('No more comments to fetch...')); // Example action to update the state
            return;
        }

        if (!loadingRef2.current) {
            loadingRef2.current = true; // Prevent further calls while loadingsetCurrentPostComments
            const result = await GeAllComments(undefined, cmtNextpage); // Use nextPage URL
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    dispatch(LoadMoreComments(Data.results)); // Reset the video URL or any other cleanup action
                    // dispatch((Data.results)); // Reset the video URL or any other cleanup action
                    dispatch(setCmtNextPage(Data.next));
                    dispatch(setCmtPrevPage(Data.previous));
                    setIsLoading(false);
                    if (!Data.next) {
                        dispatch(setNoMorePosts('Data fetching complete: no more comments.')); // Example action to update the state
                    }
                }
            }
            loadingRef2.current = false; // Allow further calls after loading is done
        }
    };

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
    }, [cmtNextpage]); // Ensure nextPage is defined and changes

    // get replay on  specific comments 
    const ReplySpecificCmt = async (id) => {
        try {
            const result = await SpecificReply(id);
            if ("data" in result) {
                const Data = result?.data
                if (Data?.status) {
                    setRepliesData(prev => ({ ...prev, [id]: Data.data })); // Store replies for this comment
                    setShowReplies(prev => ({ ...prev, [id]: true })); //
                }
            }
            else {
                toast.error(result.message || "Error occurred");
            }

        }
        catch (error) {
            toast.error('something went wrong')
            console.error("Signup error", error);
            console.log('catch', error)
            // setLoader(false);
        }
    };

    // Function to toggle replies visibility
    const toggleReplies = (id) => {
        setShowReplies(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // post comments 
    const AddComment = async () => {
        // Trim the comment input to avoid empty spaces
        const trimmedComment = comnt.trim();

        // Check if the comment is empty
        if (!trimmedComment) {
            toast.error('Please fill in your comment before submitting.');
            return; // Exit the function early
        }

        setLoader(true);
        const values = { comnt: trimmedComment, postid }; // Gather form data into values
        try {
            const result = await AddComments(values); // Make async API call
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    console.log('add comt', Data);
                    dispatch(UpdatePost({ postid, comnt: Data.data }));
                    setComnt(''); // Clear the input field

                    // Optional: Close the modal or show a success message

                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };


    // post LIKE 
    const AddLikes = async (id) => {
        setLoader(true);

        try {
            const result = await LikePost(id); // Make async API call
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    // Safely find the post and increment the likes count
                    const currentPost = posts.find(post => post.id === id);
                    if (currentPost) {
                        dispatch(updatePostLikes({ postId: id, likesCount: currentPost.likes_count + 1, isMyLike: true, }));
                    }
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error("Error adding comment", error);
            setLoader(false);
        }
    };

    // DELte comment 
    const handleDeleteComment = async (id) => {
        setLoader(true);

        try {
            const result = await DeleteMyComment(id); // Make async API call
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    console.log('delete===', Data)
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

    const AddSpecificReply = async () => {
        // Trim the comment input to avoid empty spaces
        const trimmedComment = reply.trim();
        // Check if the comment is empty
        if (!trimmedComment) {
            toast.error('Please fill in your comment before submitting.');
            return; // Exit the function early
        }

        setLoader(true);
        const values = { comnt: trimmedComment, replyid }; // Gather form data into values
        try {
            const result = await ReplySpecificComment(values); // Make async API call
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    console.log('add specific reply', Data);
                    GetComments(postid)
                    // Update the reply count and add the new reply to repliesData
                    setRepliesData(prev => ({
                        ...prev,
                        [replyid]: [...(prev[replyid] || []), Data.data], // Add the new reply to the existing replies
                    }));

                    // Increment the reply count for the specific comment
                    setShowReplies(prev => ({
                        ...prev,
                        [replyid]: true, // Ensure the replies are shown
                    }));
                    setReply(''); // Clear the input field
                    setReplyid('')
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
        console.log("safdar====", id)
    }

    // Delete my post 
    const DeleteMyPost = async (id) => {
        setLoader(true);
        try {
            const result = await DeletePost(id); // Make async API call
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {
                    console.log('delete post===', Data)
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

    // Like COmment 

    const AddLikestoComment = async (id) => {
        setLoader(true);
        try {
            const result = await LikeComment(id); // Make async API call
            setLoader(false);
            if ("data" in result) {
                const Data = result.data;
                if (Data?.status) {

                    const currentPostCmts = CurrentComments.find(comment => comment.id === id);
                    console.log('currentPostCmts===',currentPostCmts)
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
    return (
        <div ref={scrollableRef} style={{ overflowY: 'auto', maxHeight: '500px' }}>
            <div className="rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 py-4">
                {/* <Image src={'/assets/forum.png' } alt="forum" width={1000} height={500} /> */}
                {/* Show placeholders while loading */}
                {isLoading && Array.from({ length: 4 }).map((_, index) => <PostPlaceholder key={index} />)}
                {posts?.map(post => (
                    <div key={post.id} className="p-4 flex gap-2 items-start rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 bg-gray-500">
                        <div className="py-4">
                            <Image src={post?.user_profile_url === null ? '' : post.user_profile_url} alt={post.post_by} width={70} height={70} />
                        </div>
                        <div className="w-full">
                            <div className="flex flex-col border-b py-4">
                                <div className="flex justify-between ">
                                    <div className="flex gap-4">
                                        <h1 className="text-[#27AAE1]">{post.post_by}</h1>
                                        <h4 className="text-[#5aaa7c]">following</h4>
                                    </div>
                                    <div className="flex gap-4 cursor-pointer">
                                        {/* <div className="text-[#5aaa7c] flex gap-2 items-center">
                                            <ThumbsUp stroke="none" fill="#5aaa7c" /> {post.likes_count}
                                        </div> */}
                                        {post.is_my_post == true ?
                                            <div className="text-red-7 flex gap-2 items-center" onClick={() => DeleteMyPost(post.id)}>
                                                <MdDelete size={25} fill="white" />
                                            </div> : ""}
                                    </div>
                                </div>
                                <div className="opacity-70 text-[13px]">Published a photo on {post.post_at_date} at {post.post_at_time}</div>
                            </div>

                            <p className="border-b py-4">{post.caption}</p>
                            {post.image !== null ?
                                <Image src={post?.image === null ? '/assets/forum.png' : post.image} alt={post.caption} width={500} height={300} /> : ""}
                            <div className="flex items-center justify-center gap-2 w-[100%] mt-1">
                                {/* <button onClick={() => setOpenModal(true)} className="bg-[#5aaa7c] px-3 py-2 rounded-xl w-full">
                                    {post?.likes_count}   Likes
                                </button> */}

                                <button
                                    onClick={() => {
                                        if (!post.is_my_like) {
                                            AddLikes(post.id);
                                            // Update the likes count directly in the post data if needed
                                        }
                                    }}
                                    disabled={post.is_my_like} // D
                                    className={`px-3 py-2 rounded-xl w-full flex items-center ${post.is_my_like ? 'bg-[#5aaa7c] cursor-not-allowed' : 'bg-[#5aaa7c] hover:bg-[#9B229B]'}`}
                                >
                                    {/* Render profile pictures of the first three likers */}
                                    <div className="flex items-center mr-2">
                                        {likesByPost[post.id]?.map(like => (
                                            <img
                                                key={like.id}
                                                src={like.userProfileUrl}
                                                alt={`Profile of ${like.id}`} // Improved alt text
                                                className="w-8 h-8 rounded-full border-2 border-white mr-1"
                                            />
                                        ))}
                                    </div>
                                    {/* Display the like icon if the user has liked the post */}
                                    {post.is_my_like ? (
                                        <span className="text-white mr-2">👍</span> // You can replace this with any icon you prefer
                                    ) : null}
                                    {/* Display the likes count */}
                                    {post?.likes_count} Likes
                                </button>

                                {/* <button onClick={() => handleCommentsClick(post)} className="bg-[#5aaa7c] px-3 py-2 rounded-xl w-full">
                                  {post?.comments_count}  Comments
                                </button> */}
                                <button onClick={() => handleCommentsClick(post)} className="bg-[#5aaa7c] px-3 py-2 rounded-xl w-full flex items-center">
                                    {/* Render profile pictures of the first three commenters */}
                                    <div className="flex items-center mr-2">
                                        {profilePicturesByPost[post.id]?.map(profile => (
                                            <img
                                                key={profile.id}
                                                src={profile.userProfileUrl}
                                                alt={`Profile of ${profile.id}`} // Improved alt text
                                                className="w-8 h-8 rounded-full border-2 border-white mr-1"
                                            />
                                        ))}
                                    </div>
                                    {/* Display the comments count */}
                                    {post.comments_count} Comments
                                </button>
                            </div>
                            {post?.comments.map(comment => (
                                <Comment key={comment.id} {...comment} />
                            ))}
                        </div>
                    </div>
                ))}
                {nextPage == null ?
                    <div className="flex items-center justify-center gap-2 w-[100%] mt-1">
                        <h2 className="text-[25px] font-bold">{nomorePosts}</h2>
                    </div> : ""}

                {/* View Comments  */}
                {/* // Inside your modal */}
                <Modal className="z-[70]" show={openModal} size="lg" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header className="bg-[#2c353d] flex justify-center items-center">
                        <h3 className="text-xl font-medium text-white"> {postby} Comments</h3>
                    </Modal.Header>
                    <Modal.Body className="text-white bg-[#2c353d]" >
                        <div ref={scrollableModalRef} className="space-y-6" style={{ overflowY: 'auto', maxHeight: '500px' }} >
                            {isLoading && (
                                <div className="flex flex-col space-y-4">
                                    {/* Placeholders for selected post */}
                                    <PostPlaceholder />
                                </div>
                            )}
                            {selectedPost && !isLoading && (
                                <div className="p-4 flex gap-2 items-start rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 ">
                                    <div className="py-4">
                                        <Image className="rounded-full" src={selectedPost.user_profile_url || ''} alt={selectedPost.post_by} width={70} height={70} />
                                    </div>
                                    <div className="w-full">
                                        <div className="flex flex-col border-b py-4">
                                            <div className="flex justify-between ">
                                                <div className="flex gap-4">
                                                    <h1 className="text-[#27AAE1]">{selectedPost.post_by}</h1>
                                                    <h4 className="text-[#5aaa7c]">following</h4>
                                                </div>
                                                <div className="flex gap-4 cursor-pointer">
                                                    <div className="text-[#5aaa7c] flex gap-2 items-center">
                                                        <ThumbsUp stroke="none" fill="#5aaa7c" /> {selectedPost.likes_count}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-70 text-[13px]">Published on {selectedPost.post_at_date} at {selectedPost.post_at_time}</div>
                                        </div>

                                        <p className="border-b py-4">{selectedPost.caption}</p>
                                        {selectedPost.image && (
                                            <Image src={selectedPost.image} alt={selectedPost.caption} width={500} height={300} />
                                        )}
                                    </div>
                                </div>
                            )}
                            {CurrentComments?.map((comment) => (
                                <div key={comment.id} className="relative flex items-start gap-1 rounded-lg">
                                    <div>
                                        <Image src={comment.user_profile_url ? comment.user_profile_url : '/assets/user.png'} alt={comment?.comment_by} width={50} height={50} className="rounded-full" />
                                    </div>
                                    <div className="flex-col  flex-1 justify-center items-center relative">

                                        {selectedPost?.is_my_post ? (
                                            // If the post belongs to the user, show the delete button for all comments
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="absolute bg-[#5aaa7c] p-1 rounded-full -top-2 right-[1px] text-white hover:text-red-500"
                                                aria-label="Delete comment"
                                            >
                                                <MdDelete />
                                            </button>
                                        ) : comment.is_my_comment ? (
                                            // If the post does not belong to the user, show the delete button only for user's comments
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="absolute bg-[#5aaa7c] p-1 rounded-full -top-2 right-[1px] text-white hover:text-red-500"
                                                aria-label="Delete comment"
                                            >
                                                <MdDelete />
                                            </button>
                                        ) : null}
                                        <div className="flex-1 bg-gray-500 rounded-md p-2 ">
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold">{comment?.comment_by}</span>
                                                <div className="opacity-70 text-[16px]">
                                                    <span>{comment?.comment}</span>
                                                </div>
                                            </div>
                                            {/* Replies Section */}
                                            {showReplies[comment.id] && repliesData[comment.id]?.length > 0 && (
                                                <div className="mt-2">
                                                    {repliesData[comment.id]?.map((reply) => (
                                                        <div key={reply.id}>
                                                            <div className="flex items-start gap-1 rounded-lg">
                                                                <div>
                                                                    <Image
                                                                        src={reply.user_profile_url ? reply.user_profile_url : '/assets/user.png'}
                                                                        alt={reply.comment_by}
                                                                        width={40}
                                                                        height={40}
                                                                        className="rounded-full"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 bg-gray-600 rounded-md p-2 mt-2">
                                                                    <span className="text-white font-bold text-[16px]">{reply?.comment_by}</span>
                                                                    <div className="opacity-70 text-[16px]">
                                                                        <span>{reply?.comment}</span>
                                                                    </div>
                                                                    {/* <div className="opacity-70 text-[12px]">
                                                                    <span>{reply?.comment_at_date} at {reply?.comment_at_time}</span>
                                                                </div> */}
                                                                </div>
                                                            </div>
                                                            {/* <div className="flex justify-around items-center mt-2">
                                                                <span className="text-[#27AAE1] cursor-pointer text-[10px]">17hr Like</span>
                                                                <span className="opacity-70 text-[10px]">{reply?.comment_at_time}</span>
                                                                <span className="opacity-70 text-[10px]">Reply</span>

                                                            </div> */}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {/* Show "View All Replies" or "Show Less Replies" */}
                                            {comment.is_any_reply && (
                                                <p className="text-white cursor-pointer text-[12px]" onClick={() => {
                                                    if (!showReplies[comment.id]) {
                                                        ReplySpecificCmt(comment.id); // Fetch replies if not already shown
                                                    }
                                                    toggleReplies(comment.id); // Toggle replies visibility
                                                }}>
                                                    {showReplies[comment.id] ? "Show less " : `View all ${comment.reply_count} replies `}
                                                </p>
                                            )}
                                        </div>
                                        {/* Likes and Timestamp Section */}
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-[#27AAE1] cursor-pointer text-[10px] " onClick={() => ShowReplay(comment.id)}>Reply</span>

                                            <span
                                                className={`text-[#27AAE1] cursor-pointer text-[10px] ${comment.is_my_like ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                onClick={() => {
                                                    if (!comment.is_my_like) {
                                                        AddLikestoComment(comment.id);
                                                    }
                                                }}
                                            >
                                             {comment.is_my_like ? (
                                        <span className="text-white mr-2">👍</span> // You can replace this with any icon you prefer
                                    ) : null}
                                       {comment?.likes_count} Like
                                            </span>
                                            <span className="opacity-70 text-[10px]">{comment?.comment_at_time}</span>
                                        </div>

                                        {replyid === comment.id && (
                                            <div className="flex items-center gap-2 w-full mt-2">
                                                <input
                                                    value={reply}
                                                    onChange={(e) => setReply(e.target.value)}
                                                    placeholder="Write a reply..."
                                                    className="bg-gray-500 p-2 rounded-md w-[100%]"
                                                />
                                                <button onClick={() => AddSpecificReply()} className="bg-[#5aaa7c] px-3 py-2 rounded-xl">
                                                    {loader ? "Posting..." : <IoIosSend size={20} />}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex flex-col space-y-4">
                                    {/* Placeholders for comments */}
                                    {Array.from({ length: 3 }).map((_, index) => <PostPlaceholder key={index} />)}
                                </div>
                            )}

                            <div className="flex items-center gap-2 w-[100%]">
                                {/* <Image src={"/assets/user.png"} alt="user" width={50} height={50} /> */}
                                <input
                                    value={comnt}
                                    onChange={(e) => setComnt(e.target.value)}
                                    placeholder="write a comment..."
                                    className="bg-gray-500 p-2 rounded-md w-[100%]"
                                />
                                <button onClick={() => AddComment()} className="bg-[#5aaa7c] px-3 py-2 rounded-xl">
                                    {loader ? "Posting..." : <IoIosSend size={20} />}
                                </button>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </div >
        </div >

    );
};
;

export default ForumCard;
