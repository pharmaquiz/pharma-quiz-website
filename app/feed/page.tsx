"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  SocialFeedPost,
  FeedComment,
  SuggestedPeer,
  subscribeFeedPosts,
  subscribeUserLikes,
  subscribeUserBookmarks,
  subscribeUserFollowing,
  subscribePostComments,
  createSocialPost,
  togglePostLike,
  togglePostBookmark,
  addPostComment,
  deletePostComment,
  deleteFeedPost,
  followPeerUser,
  unfollowPeerUser,
  fetchSuggestedPeers,
  formatRelativeTime
} from "@/lib/social-feed";
import { formatCapsules } from "@/lib/capsules";
import { TRENDING_TOPICS, COMMUNITY_CHANNELS, SITE_CONFIG } from "@/lib/constants";
import {
  Image as ImageIcon,
  FileText,
  Video,
  HelpCircle,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Trash2,
  X,
  ExternalLink,
  Download,
  Users,
  Compass,
  Sparkles,
  Flame,
  Search,
  Filter,
  Check,
  AlertCircle,
  Loader2,
  Globe,
  Lock,
  PlusCircle,
  UserCheck,
  UserPlus,
  Play,
  FileCheck,
  Radio,
  Clock,
  ArrowUpRight
} from "lucide-react";

type FilterTab = "ALL" | "FOLLOWING" | "IMAGE" | "PDF" | "QUESTION" | "LINK" | "SAVED" | "MY_POSTS";

function FeedPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, capsules, loading: authLoading } = useAuth();

  // Feed state
  const [posts, setPosts] = useState<SocialFeedPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set());
  const [followingUids, setFollowingUids] = useState<Set<string>>(new Set());
  const [suggestedPeers, setSuggestedPeers] = useState<SuggestedPeer[]>([]);

  // Filter & Navigation state
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Post composer state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [isQuestionPost, setIsQuestionPost] = useState(false);
  const [visibility, setVisibility] = useState<"PUBLIC" | "FOLLOWERS">("PUBLIC");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState("");
  const [uploadProgressPct, setUploadProgressPct] = useState(0);
  const [composerError, setComposerError] = useState("");

  // Active comments drawer
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [postComments, setPostComments] = useState<FeedComment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  // Modal Lightbox
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Auth Guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/feed");
    }
  }, [authLoading, user, router]);

  // Real-time Feed Listener
  useEffect(() => {
    if (!user) return;

    setLoadingPosts(true);
    const unsubscribeFeed = subscribeFeedPosts(
      user.uid,
      (updatedPosts) => {
        setPosts(updatedPosts);
        setLoadingPosts(false);
      },
      (err) => {
        console.error("Feed error:", err);
        setLoadingPosts(false);
      }
    );

    const unsubscribeLikes = subscribeUserLikes(user.uid, setLikedPostIds);
    const unsubscribeBookmarks = subscribeUserBookmarks(user.uid, setSavedPostIds);
    const unsubscribeFollowing = subscribeUserFollowing(user.uid, setFollowingUids);

    fetchSuggestedPeers(user.uid).then(setSuggestedPeers);

    return () => {
      unsubscribeFeed();
      unsubscribeLikes();
      unsubscribeBookmarks();
      unsubscribeFollowing();
    };
  }, [user]);

  // Real-time Comments Listener for opened post
  useEffect(() => {
    if (!activeCommentPostId) {
      setPostComments([]);
      return;
    }

    const unsubscribeComments = subscribePostComments(activeCommentPostId, (list) => {
      setPostComments(list);
    });

    return () => unsubscribeComments();
  }, [activeCommentPostId]);

  // Handle Image Selection
  const handleImagesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 4); // Up to 4 images
    setSelectedImages(files);

    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviewUrls(previews);
    setSelectedPdf(null);
  };

  const removeSelectedImage = (index: number) => {
    const updatedFiles = [...selectedImages];
    updatedFiles.splice(index, 1);
    setSelectedImages(updatedFiles);

    const updatedPreviews = [...imagePreviewUrls];
    updatedPreviews.splice(index, 1);
    setImagePreviewUrls(updatedPreviews);
  };

  // Handle PDF Selection
  const handlePdfSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (file.size > 25 * 1024 * 1024) {
      setComposerError("PDF document cannot exceed 25MB.");
      return;
    }
    setSelectedPdf(file);
    setSelectedImages([]);
    setImagePreviewUrls([]);
  };

  // Submit Post
  const handleCreatePost = async () => {
    if (!user) return;
    setComposerError("");

    let trimmed = postText.trim();
    if (isQuestionPost && !trimmed.startsWith("❓")) {
      trimmed = `❓ ${trimmed}`;
    }

    if (!trimmed && selectedImages.length === 0 && !selectedPdf && !externalUrl.trim()) {
      setComposerError("Please enter some text or attach an image, study note, or link.");
      return;
    }

    setIsSubmitting(true);
    setUploadProgressText("Preparing post...");
    setUploadProgressPct(10);

    try {
      // Determine video platform if external url provided
      let videoPlatform: "NONE" | "DIRECT" | "YOUTUBE" | "FACEBOOK" | "INSTAGRAM" = "NONE";
      const cleanUrl = externalUrl.trim();
      if (cleanUrl) {
        if (/youtube\.com|youtu\.be/i.test(cleanUrl)) {
          videoPlatform = "YOUTUBE";
        } else if (/instagram\.com/i.test(cleanUrl)) {
          videoPlatform = "INSTAGRAM";
        } else if (/facebook\.com/i.test(cleanUrl)) {
          videoPlatform = "FACEBOOK";
        }
      }

      await createSocialPost({
        userId: user.uid,
        userName: profile?.fullName || profile?.name || user.displayName || "Pharmacy Scholar",
        userProfileImage: profile?.photoUrl || user.photoURL || "",
        userQualification: profile?.qualification || profile?.profession || "Pharmacist",
        userPqid: profile?.pqid || "PQID",
        text: trimmed,
        images: selectedImages,
        pdfFile: selectedPdf || undefined,
        externalUrl: cleanUrl,
        videoPlatform: videoPlatform,
        visibility: visibility,
        state: profile?.state || "",
        district: profile?.district || "",
        onProgress: (msg, pct) => {
          setUploadProgressText(msg);
          setUploadProgressPct(pct);
        }
      });

      // Reset form
      setPostText("");
      setSelectedImages([]);
      setImagePreviewUrls([]);
      setSelectedPdf(null);
      setExternalUrl("");
      setIsQuestionPost(false);
      setIsComposerOpen(false);
      showToast("Post published to PharmaFriends social feed!");
    } catch (err: unknown) {
      console.error("Create post error:", err);
      const message = err instanceof Error ? err.message : "Failed to publish post.";
      setComposerError(message);
    } finally {
      setIsSubmitting(false);
      setUploadProgressText("");
      setUploadProgressPct(0);
    }
  };

  // Like / Unlike Post (Optimistic UI)
  const handleToggleLike = async (postId: string) => {
    if (!user) return;
    const isLiked = likedPostIds.has(postId);

    // Optimistic toggle
    setLikedPostIds((prev) => {
      const next = new Set(prev);
      if (isLiked) next.delete(postId);
      else next.add(postId);
      return next;
    });

    setPosts((prev) =>
      prev.map((p) => {
        if (p.postId === postId) {
          return {
            ...p,
            likesCount: Math.max(0, p.likesCount + (isLiked ? -1 : 1))
          };
        }
        return p;
      })
    );

    try {
      await togglePostLike(postId, {
        uid: user.uid,
        name: profile?.fullName || profile?.name || user.displayName || "Scholar"
      });
    } catch (err) {
      console.error("Error toggling like:", err);
      // Rollback on failure
      setLikedPostIds((prev) => {
        const next = new Set(prev);
        if (isLiked) next.add(postId);
        else next.delete(postId);
        return next;
      });
      setPosts((prev) =>
        prev.map((p) => {
          if (p.postId === postId) {
            return {
              ...p,
              likesCount: Math.max(0, p.likesCount + (isLiked ? 1 : -1))
            };
          }
          return p;
        })
      );
    }
  };

  // Bookmark / Save Post (Optimistic UI)
  const handleToggleBookmark = async (postId: string) => {
    if (!user) return;
    const isSaved = savedPostIds.has(postId);

    setSavedPostIds((prev) => {
      const next = new Set(prev);
      if (isSaved) next.delete(postId);
      else next.add(postId);
      return next;
    });

    try {
      await togglePostBookmark(postId, user.uid);
      showToast(isSaved ? "Post removed from Saved" : "Post saved to your collection");
    } catch (err) {
      console.error("Error toggling bookmark:", err);
      setSavedPostIds((prev) => {
        const next = new Set(prev);
        if (isSaved) next.add(postId);
        else next.delete(postId);
        return next;
      });
    }
  };

  // Add Comment
  const handleAddComment = async (postId: string) => {
    if (!user || !commentInput.trim()) return;

    setCommentSubmitting(true);
    try {
      await addPostComment(postId, commentInput, {
        uid: user.uid,
        name: profile?.fullName || profile?.name || user.displayName || "Scholar",
        photoUrl: profile?.photoUrl || user.photoURL || "",
        qualification: profile?.qualification || profile?.profession || "Pharmacist"
      });
      setCommentInput("");

      // Update post comments count optimistically
      setPosts((prev) =>
        prev.map((p) => (p.postId === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p))
      );
    } catch (err) {
      console.error("Failed to add comment:", err);
      showToast("Unable to submit comment. Please check your connection.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Delete Comment
  const handleDeleteComment = async (postId: string, commentId: string) => {
    try {
      await deletePostComment(postId, commentId);
      setPosts((prev) =>
        prev.map((p) => (p.postId === postId ? { ...p, commentsCount: Math.max(0, p.commentsCount - 1) } : p))
      );
      showToast("Comment deleted.");
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  // Delete Post (Author only)
  const handleDeletePost = async (post: SocialFeedPost) => {
    if (!user || post.userId !== user.uid) return;
    if (!window.confirm("Are you sure you want to permanently delete this post?")) return;

    try {
      await deleteFeedPost(post.postId, user.uid, post.storagePath);
      setPosts((prev) => prev.filter((p) => p.postId !== post.postId));
      showToast("Post deleted successfully.");
    } catch (err) {
      console.error("Failed to delete post:", err);
      showToast("Unable to delete post.");
    }
  };

  // Share Post
  const handleSharePost = async (post: SocialFeedPost) => {
    const postUrl = typeof window !== "undefined" ? `${window.location.origin}/feed#${post.postId}` : "";
    const shareData = {
      title: `${post.userName} on PharmaFriends`,
      text: post.description.slice(0, 100),
      url: postUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast("Post shared successfully!");
      } catch {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(postUrl);
      showToast("Post link copied to clipboard!");
    }
  };

  // Follow / Unfollow Peer
  const handleToggleFollowPeer = async (peer: SuggestedPeer) => {
    if (!user) return;
    const isFollowing = followingUids.has(peer.uid);

    // Optimistic
    setFollowingUids((prev) => {
      const next = new Set(prev);
      if (isFollowing) next.delete(peer.uid);
      else next.add(peer.uid);
      return next;
    });

    try {
      if (isFollowing) {
        await unfollowPeerUser(user.uid, peer.uid);
        showToast(`Unfollowed ${peer.name}`);
      } else {
        await followPeerUser(
          {
            uid: user.uid,
            name: profile?.fullName || profile?.name || user.displayName || "Scholar",
            photoUrl: profile?.photoUrl || user.photoURL || "",
            profession: profile?.qualification || profile?.profession || "Pharmacist"
          },
          {
            uid: peer.uid,
            name: peer.name,
            photoUrl: peer.photoUrl,
            profession: peer.profession
          }
        );
        showToast(`Now following ${peer.name}`);
      }
    } catch (err) {
      console.error("Error toggling follow:", err);
      // Rollback
      setFollowingUids((prev) => {
        const next = new Set(prev);
        if (isFollowing) next.add(peer.uid);
        else next.delete(peer.uid);
        return next;
      });
    }
  };

  // Filtered Posts Calculation
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Hashtag filter
      if (selectedHashtag) {
        const cleanTag = selectedHashtag.toLowerCase().replace("#", "");
        const hasTag = post.hashtags.some((t) => t.toLowerCase().includes(cleanTag)) ||
          post.description.toLowerCase().includes(`#${cleanTag}`);
        if (!hasTag) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText = post.description.toLowerCase().includes(q) ||
          post.userName.toLowerCase().includes(q) ||
          post.userQualification.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      // Tab filter
      switch (activeTab) {
        case "FOLLOWING":
          return followingUids.has(post.userId) || (user && post.userId === user.uid);
        case "IMAGE":
          return post.contentType === "IMAGE" || post.imageUrl || post.imageUrls.length > 0;
        case "PDF":
          return post.contentType === "PDF" || post.fileName?.endsWith(".pdf");
        case "QUESTION":
          return post.description.includes("❓") || post.text.includes("?");
        case "LINK":
          return post.contentType === "LINK" || post.contentType === "VIDEO" || post.externalUrl;
        case "SAVED":
          return savedPostIds.has(post.postId);
        case "MY_POSTS":
          return user && post.userId === user.uid;
        case "ALL":
        default:
          return true;
      }
    });
  }, [posts, activeTab, selectedHashtag, searchQuery, followingUids, savedPostIds, user]);

  // Loading Screen for Auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070C18] flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 animate-ping absolute"></div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-xl shadow-rose-500/30">
            <span className="text-2xl font-black text-white">Rx</span>
          </div>
        </div>
        <p className="mt-5 text-sm font-medium text-slate-400">Loading PharmaFriends Social Feed...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070C18] text-slate-100 pt-20 pb-16 selection:bg-rose-500/30">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-rose-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-slideUp">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></div>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr_320px] gap-5 items-start">
          
          {/* ======================================================== */}
          {/* LEFT SIDEBAR: Navigation & Communities                   */}
          {/* ======================================================== */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-24">
            {/* User Profile Summary Card */}
            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl shadow-black/40 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-rose-500/10 blur-2xl group-hover:bg-rose-500/20 transition-all"></div>
              
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 p-0.5 shadow-md shadow-rose-500/20">
                    <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-950 flex items-center justify-center">
                      {profile?.photoUrl || user?.photoURL ? (
                        <Image
                          src={profile?.photoUrl || user?.photoURL || ""}
                          alt="Profile"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-black text-rose-400">
                          {(profile?.fullName || user?.displayName || "P")[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900"></div>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white truncate">
                      {profile?.fullName || profile?.name || user?.displayName || "Pharmacist"}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      {profile?.pqid || "PQID"}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 truncate">
                    {profile?.qualification || profile?.profession || "Pharmacy Scholar"}
                  </span>
                </div>
              </div>

              {/* Wallet pill */}
              <Link
                href="/wallet"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 transition-all text-xs"
              >
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span>💊</span>
                  <span>Capsules</span>
                </span>
                <span className="font-extrabold text-teal-400">
                  {formatCapsules(capsules)} <span className="text-[10px] text-teal-500">CAPS</span>
                </span>
              </Link>
            </div>

            {/* Quick Actions & Feed Categories */}
            <div className="p-3 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl shadow-black/40 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => {
                  setIsComposerOpen(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-2.5 px-4 mb-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-transform transform active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Post</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("ALL");
                  setSelectedHashtag(null);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "ALL" && !selectedHashtag
                    ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span>All Feeds</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400">
                  {posts.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("FOLLOWING");
                  setSelectedHashtag(null);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "FOLLOWING"
                    ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Following</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400">
                  {followingUids.size}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("MY_POSTS");
                  setSelectedHashtag(null);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "MY_POSTS"
                    ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <span>My Posts</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400">
                  {posts.filter((p) => user && p.userId === user.uid).length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("SAVED");
                  setSelectedHashtag(null);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "SAVED"
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span>Saved Posts</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400">
                  {savedPostIds.size}
                </span>
              </button>
            </div>

            {/* Communities */}
            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl shadow-black/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Communities</span>
              </h3>
              <div className="flex flex-col gap-2">
                {COMMUNITY_CHANNELS.map((ch) => (
                  <div
                    key={ch.name}
                    className="p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors truncate">
                        {ch.name}
                      </span>
                      <span className="text-[10px] text-slate-500">{ch.members}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20">
                      Join
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics (Left column widget) */}
            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl shadow-black/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>Trending Topics</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {TRENDING_TOPICS.map((topic) => (
                  <button
                    key={topic.tag}
                    type="button"
                    onClick={() => {
                      setSelectedHashtag(selectedHashtag === topic.tag ? null : topic.tag);
                    }}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-xl transition-all ${
                      selectedHashtag === topic.tag
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105"
                        : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/50"
                    }`}
                  >
                    #{topic.tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* CENTER COLUMN: Composer, Filters & Social Posts Feed     */}
          {/* ======================================================== */}
          <main className="w-full flex flex-col gap-4 min-w-0">
            {/* Real-time Status / Active Tag Banner */}
            {selectedHashtag && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-500/20 to-purple-600/20 border border-rose-500/40 backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300">Filtering posts tagged with:</span>
                  <span className="text-xs font-bold text-rose-400">#{selectedHashtag}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedHashtag(null)}
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Filter</span>
                </button>
              </div>
            )}

            {/* Post Composer Card */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-4 shadow-xl shadow-black/40">
              {/* Trigger Input Row */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700 flex items-center justify-center">
                  {profile?.photoUrl || user?.photoURL ? (
                    <Image
                      src={profile?.photoUrl || user?.photoURL || ""}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-base font-bold text-rose-400">
                      {(profile?.fullName || user?.displayName || "P")[0].toUpperCase()}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsComposerOpen(true)}
                  className="flex-1 text-left px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 text-xs sm:text-sm font-medium transition-colors border border-slate-700/60"
                >
                  What&apos;s on your clinical mind, {profile?.fullName?.split(" ")[0] || "Scholar"}? Share notes, cases, or questions...
                </button>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between sm:justify-start gap-1 sm:gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setIsComposerOpen(true);
                    setTimeout(() => fileInputRef.current?.click(), 100);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800 text-emerald-400 text-xs font-semibold transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsComposerOpen(true);
                    setTimeout(() => pdfInputRef.current?.click(), 100);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800 text-blue-400 text-xs font-semibold transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Study Note</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsComposerOpen(true);
                    setIsQuestionPost(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800 text-amber-400 text-xs font-semibold transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Question</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsComposerOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800 text-purple-400 text-xs font-semibold transition-colors"
                >
                  <Video className="w-4 h-4" />
                  <span>Video / Link</span>
                </button>
              </div>

              {/* Expanded Composer Form */}
              {isComposerOpen && (
                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-3 animate-fadeIn">
                  {/* Visibility selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Post Visibility:</span>
                      <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value as "PUBLIC" | "FOLLOWERS")}
                        className="bg-slate-800 border border-slate-700 rounded-lg text-xs px-2.5 py-1 text-slate-200 focus:outline-none focus:border-rose-500"
                      >
                        <option value="PUBLIC">🌍 Public (All PharmaFriends Scholars)</option>
                        <option value="FOLLOWERS">👥 Followers Only</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsComposerOpen(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder={
                      isQuestionPost
                        ? "Post a challenging clinical MCQ or pharmaceutical doubt for peer discussion..."
                        : "Write your study update, clinical observation, research takeaway, or GPAT notes..."
                    }
                    rows={4}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                  />

                  {/* Quick Hashtag Insertion Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-500 font-medium">Add tag:</span>
                    {["Pharmacology", "GPAT2026", "ClinicalPharmacy", "DrugInteractions"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          if (!postText.includes(`#${t}`)) {
                            setPostText((prev) => `${prev.trim()} #${t} `);
                          }
                        }}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 font-medium border border-slate-700/80"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>

                  {/* External URL Input */}
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <input
                      type="url"
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      placeholder="Optional link (YouTube video, Instagram Reel, or research paper)..."
                      className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Hidden File Inputs */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImagesSelected}
                  />
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handlePdfSelected}
                  />

                  {/* Selected Images Preview Grid */}
                  {imagePreviewUrls.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {imagePreviewUrls.map((url, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-slate-800">
                          <img src={url} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeSelectedImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Selected PDF Preview */}
                  {selectedPdf && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-950/30 border border-blue-800/40">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-blue-200 truncate">{selectedPdf.name}</span>
                          <span className="text-[10px] text-blue-400">
                            {(selectedPdf.size / (1024 * 1024)).toFixed(2)} MB • PDF Study Note
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedPdf(null)}
                        className="text-slate-400 hover:text-rose-400 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Error display */}
                  {composerError && (
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{composerError}</span>
                    </div>
                  )}

                  {/* Upload Progress Bar */}
                  {isSubmitting && (
                    <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-rose-400 font-medium">{uploadProgressText}</span>
                        <span className="text-slate-400 font-mono font-bold">{uploadProgressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-300"
                          style={{ width: `${uploadProgressPct}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button Row */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-colors"
                        title="Add Photos"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => pdfInputRef.current?.click()}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
                        title="Attach PDF Notes"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsQuestionPost(!isQuestionPost)}
                        className={`p-2 rounded-xl transition-colors ${
                          isQuestionPost ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "bg-slate-800 hover:bg-slate-700 text-amber-400"
                        }`}
                        title="Mark as Question"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleCreatePost}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/20 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <span>Publish</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Feed Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: "ALL", label: "All Posts", icon: Flame },
                { id: "FOLLOWING", label: "Following", icon: Users },
                { id: "IMAGE", label: "Photos", icon: ImageIcon },
                { id: "PDF", label: "Study Notes", icon: FileText },
                { id: "QUESTION", label: "Questions", icon: HelpCircle },
                { id: "LINK", label: "Videos & Links", icon: Video }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id as FilterTab);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105"
                        : "bg-slate-900/80 hover:bg-slate-800/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ======================================================== */}
            {/* POSTS LIST (Real-time Firestore stream)                  */}
            {/* ======================================================== */}
            {loadingPosts ? (
              // Skeletons
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-800"></div>
                      <div className="flex flex-col gap-1.5">
                        <div className="w-28 h-3.5 rounded bg-slate-800"></div>
                        <div className="w-20 h-2.5 rounded bg-slate-800/60"></div>
                      </div>
                    </div>
                    <div className="w-full h-4 rounded bg-slate-800 mb-2"></div>
                    <div className="w-3/4 h-4 rounded bg-slate-800/60 mb-4"></div>
                    <div className="w-full h-48 rounded-2xl bg-slate-800/40"></div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              // Empty Feed
              <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center justify-center my-4 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">No Posts in This Stream</h3>
                <p className="text-xs text-slate-400 max-w-sm mb-4">
                  Be the first to share pharmacy notes, clinical questions, or case discussions with your peers!
                </p>
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(true)}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/20"
                >
                  Create First Post
                </button>
              </div>
            ) : (
              // Render Feed Posts
              <div className="flex flex-col gap-4">
                {filteredPosts.map((post) => {
                  const isLiked = likedPostIds.has(post.postId);
                  const isSaved = savedPostIds.has(post.postId);
                  const isAuthor = user?.uid === post.userId;
                  const isCommentsOpen = activeCommentPostId === post.postId;

                  const allImages = post.imageUrls.length > 0 ? post.imageUrls : post.imageUrl ? [post.imageUrl] : [];

                  return (
                    <article
                      key={post.postId}
                      id={post.postId}
                      className="rounded-3xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl p-4 sm:p-5 shadow-xl shadow-black/40 hover:border-slate-700/80 transition-all duration-300"
                    >
                      {/* Post Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Author Avatar */}
                          <div className="w-11 h-11 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 flex-shrink-0 flex items-center justify-center shadow-md">
                            {post.userProfileImage ? (
                              <Image
                                src={post.userProfileImage}
                                alt={post.userName}
                                width={44}
                                height={44}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-base font-bold text-rose-400">
                                {post.userName[0]?.toUpperCase() || "P"}
                              </span>
                            )}
                          </div>

                          {/* Author Info */}
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-sm text-white hover:text-rose-400 transition-colors truncate">
                                {post.userName}
                              </span>
                              {post.userPqid && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/20">
                                  {post.userPqid}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                              <span>{post.userQualification || "Scholar"}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-slate-500">
                                <Clock className="w-3 h-3" />
                                <span>{formatRelativeTime(post.publishedAt || post.createdAt)}</span>
                              </span>
                              {post.visibility === "PUBLIC" ? (
                                <span title="Public">
                                  <Globe className="w-3 h-3 text-slate-500" />
                                </span>
                              ) : (
                                <span title="Followers only">
                                  <Lock className="w-3 h-3 text-slate-500" />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Dropdown Options */}
                        <div className="relative flex items-center gap-1">
                          {isAuthor && (
                            <button
                              type="button"
                              onClick={() => handleDeletePost(post)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                              title="Delete Post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleToggleBookmark(post.postId)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isSaved
                                ? "text-amber-400 bg-amber-400/10"
                                : "text-slate-500 hover:text-amber-400 hover:bg-slate-800"
                            }`}
                            title={isSaved ? "Saved" : "Save Post"}
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      </div>

                      {/* Post Text Description */}
                      {post.description && (
                        <div className="text-sm text-slate-200 leading-relaxed mb-3 whitespace-pre-wrap break-words">
                          {post.description.split(" ").map((word, idx) => {
                            if (word.startsWith("#")) {
                              const tagClean = word.replace(/[^a-zA-Z0-9]/g, "");
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setSelectedHashtag(tagClean)}
                                  className="text-rose-400 hover:text-rose-300 font-semibold mr-1 transition-colors"
                                >
                                  {word}{" "}
                                </button>
                              );
                            }
                            if (word.startsWith("@")) {
                              return (
                                <span key={idx} className="text-cyan-400 font-semibold mr-1">
                                  {word}{" "}
                                </span>
                              );
                            }
                            return word + " ";
                          })}
                        </div>
                      )}

                      {/* Media Display: Images */}
                      {allImages.length > 0 && (
                        <div className="mb-3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                          {allImages.length === 1 ? (
                            <div
                              className="relative max-h-[500px] w-full cursor-pointer overflow-hidden flex items-center justify-center bg-black/40 group"
                              onClick={() => setFullscreenImage(allImages[0])}
                            >
                              <img
                                src={allImages[0]}
                                alt="Post media"
                                className="w-full max-h-[500px] object-contain group-hover:scale-[1.01] transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/50">
                              {allImages.slice(0, 4).map((imgUrl, i) => (
                                <div
                                  key={i}
                                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group bg-slate-900"
                                  onClick={() => setFullscreenImage(imgUrl)}
                                >
                                  <img
                                    src={imgUrl}
                                    alt={`Post media ${i + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    loading="lazy"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Media Display: PDF / Study Document */}
                      {post.fileName && (
                        <div className="mb-3 p-3.5 rounded-2xl bg-blue-950/20 border border-blue-900/40 flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-blue-200 truncate">{post.fileName}</span>
                              <span className="text-[10px] text-blue-400">Pharmacy Study Material • PDF</span>
                            </div>
                          </div>
                          {post.mediaUrl && (
                            <a
                              href={post.mediaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </a>
                          )}
                        </div>
                      )}

                      {/* Media Display: External Link / Video */}
                      {post.externalUrl && (
                        <a
                          href={post.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-3 p-3 rounded-2xl bg-purple-950/20 hover:bg-purple-950/30 border border-purple-900/40 flex items-center justify-between transition-colors block group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                              {post.videoPlatform !== "NONE" ? (
                                <Play className="w-5 h-5 fill-current" />
                              ) : (
                                <ExternalLink className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-purple-200 group-hover:text-purple-300 truncate">
                                {post.linkTitle || post.videoPlatform + " Resource"}
                              </span>
                              <span className="text-[10px] text-purple-400 truncate">{post.externalUrl}</span>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        </a>
                      )}

                      {/* Engagement Metrics Summary */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3 px-1 pt-1 border-t border-slate-800/60">
                        <span>{post.likesCount} {post.likesCount === 1 ? "like" : "likes"}</span>
                        <div className="flex items-center gap-3">
                          <span>{post.commentsCount} comments</span>
                          <span>{post.shareCount} shares</span>
                        </div>
                      </div>

                      {/* Interactive Action Bar */}
                      <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-800/80">
                        {/* Like Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleLike(post.postId)}
                          className={`py-2 px-1 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            isLiked
                              ? "text-rose-500 bg-rose-500/10 font-bold"
                              : "text-slate-400 hover:text-rose-400 hover:bg-slate-800/60"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-current scale-110" : ""}`} />
                          <span className="hidden sm:inline">Like</span>
                        </button>

                        {/* Comment Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveCommentPostId(isCommentsOpen ? null : post.postId)
                          }
                          className={`py-2 px-1 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            isCommentsOpen
                              ? "text-cyan-400 bg-cyan-400/10"
                              : "text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60"
                          }`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">Comment</span>
                        </button>

                        {/* Share Button */}
                        <button
                          type="button"
                          onClick={() => handleSharePost(post)}
                          className="py-2 px-1 rounded-xl text-xs font-semibold text-slate-400 hover:text-purple-400 hover:bg-slate-800/60 flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Share</span>
                        </button>

                        {/* Bookmark Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleBookmark(post.postId)}
                          className={`py-2 px-1 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            isSaved
                              ? "text-amber-400 bg-amber-400/10 font-bold"
                              : "text-slate-400 hover:text-amber-400 hover:bg-slate-800/60"
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                          <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
                        </button>
                      </div>

                      {/* Real-time Comments Drawer */}
                      {isCommentsOpen && (
                        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-3 animate-fadeIn">
                          {/* Comments List */}
                          {postComments.length === 0 ? (
                            <p className="text-xs text-slate-500 text-center py-2">
                              No comments yet. Start the clinical conversation!
                            </p>
                          ) : (
                            <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
                              {postComments.map((comment) => (
                                <div
                                  key={comment.commentId}
                                  className="flex items-start gap-2.5 p-2 rounded-2xl bg-slate-950/60 border border-slate-850"
                                >
                                  <div className="w-7 h-7 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-300">
                                    {comment.userProfileImage ? (
                                      <Image
                                        src={comment.userProfileImage}
                                        alt={comment.userName}
                                        width={28}
                                        height={28}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      (comment.userName[0] || "P").toUpperCase()
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-slate-200">
                                        {comment.userName}
                                      </span>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] text-slate-500">
                                          {formatRelativeTime(comment.createdAt)}
                                        </span>
                                        {user && comment.userId === user.uid && (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleDeleteComment(post.postId, comment.commentId)
                                            }
                                            className="text-slate-500 hover:text-rose-500 p-0.5"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-xs text-slate-300 mt-0.5 whitespace-pre-wrap break-words">
                                      {comment.text}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* New Comment Input */}
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="text"
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAddComment(post.postId);
                                }
                              }}
                              placeholder="Write a clinical insight or response..."
                              className="flex-1 bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                            />
                            <button
                              type="button"
                              disabled={commentSubmitting || !commentInput.trim()}
                              onClick={() => handleAddComment(post.postId)}
                              className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 transition-colors"
                            >
                              {commentSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </main>

          {/* ======================================================== */}
          {/* RIGHT SIDEBAR: Suggested Peers & App Promotion           */}
          {/* ======================================================== */}
          <aside className="hidden xl:flex flex-col gap-5 sticky top-24">
            {/* Suggested Pharmacy Peers */}
            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl shadow-black/40">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <UserPlus className="w-3.5 h-3.5 text-blue-400" />
                  <span>Suggested Scholars</span>
                </h3>
              </div>

              {suggestedPeers.length === 0 ? (
                <p className="text-xs text-slate-500 py-2">Discovering pharmacy peers...</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {suggestedPeers.map((peer) => {
                    const isFollowing = followingUids.has(peer.uid);
                    return (
                      <div key={peer.uid} className="flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-xs text-slate-300">
                            {peer.photoUrl ? (
                              <Image
                                src={peer.photoUrl}
                                alt={peer.name}
                                width={36}
                                height={36}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              (peer.name[0] || "P").toUpperCase()
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-200 truncate">{peer.name}</span>
                            <span className="text-[10px] text-slate-500 truncate">
                              {peer.profession || peer.qualification}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleFollowPeer(peer)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                            isFollowing
                              ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                              : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-md shadow-blue-500/20"
                          }`}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PharmaFriends App Promotion Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0A1224] border border-teal-500/30 backdrop-blur-xl shadow-xl shadow-black/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all"></div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-sm">
                  <span className="font-black text-lg">Rx</span>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">PharmaFriends App</h4>
                  <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">
                    Official Android Companion
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Access 10,000+ MCQs, Offline Pharma Library, Real-time Battle Quizzes, and push notifications directly on your phone!
              </p>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800 mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">Play Store Rating</span>
                  <span className="text-sm font-black text-amber-400">4.8 ★★★★★</span>
                </div>
                <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center">
                  <Image
                    src="/images/qr-code.svg"
                    alt="App QR Code"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <a
                href={SITE_CONFIG.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-transform transform active:scale-95 text-center"
              >
                <Download className="w-4 h-4" />
                <span>Download on Google Play</span>
              </a>
            </div>

            {/* Quick Links & Copyright */}
            <div className="px-2 text-[11px] text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
              <Link href="/about" className="hover:text-slate-400">About</Link>
              <Link href="/features" className="hover:text-slate-400">Features</Link>
              <Link href="/privacy-policy" className="hover:text-slate-400">Privacy</Link>
              <Link href="/terms-and-conditions" className="hover:text-slate-400">Terms</Link>
              <Link href="/contact" className="hover:text-slate-400">Help</Link>
              <span>•</span>
              <span>© 2026 {SITE_CONFIG.brandName}</span>
            </div>
          </aside>
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            type="button"
            onClick={() => setFullscreenImage(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-white hover:bg-rose-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default function FeedPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#070C18] flex flex-col items-center justify-center text-white">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 animate-ping absolute"></div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-xl shadow-rose-500/30">
              <span className="text-2xl font-black text-white">Rx</span>
            </div>
          </div>
          <p className="mt-5 text-sm font-medium text-slate-400">Loading PharmaFriends Social Feed...</p>
        </div>
      }
    >
      <FeedPageContent />
    </React.Suspense>
  );
}
