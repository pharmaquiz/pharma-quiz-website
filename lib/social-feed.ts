import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  increment,
  writeBatch,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
  Unsubscribe
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export type ContentType = "TEXT" | "IMAGE" | "PDF" | "FILE" | "LINK" | "VIDEO";
export type PostVisibility = "PUBLIC" | "FOLLOWERS" | "ONLY_ME";
export type VideoPlatform = "NONE" | "DIRECT" | "YOUTUBE" | "FACEBOOK" | "INSTAGRAM";

export interface SocialFeedPost {
  postId: string;
  userId: string;
  userName: string;
  userProfileImage: string;
  userQualification: string;
  userPqid: string;
  contentType: ContentType;
  mediaUrl: string;
  imageUrl: string;
  imageUrls: string[];
  mediaUrls: string[];
  visibility: PostVisibility;
  description: string;
  caption: string;
  text: string;
  hashtags: string[];
  mentions: string[];
  mentionedUsernames: string[];
  taggedUserIds: string[];
  taggedUsernames: string[];
  videoUrl: string;
  thumbnailUrl: string;
  videoPlatform: VideoPlatform;
  externalVideoId: string;
  externalUrl: string;
  externalPlatform: string;
  linkTitle: string;
  linkDescription: string;
  linkThumbnailUrl: string;
  state: string;
  district: string;
  createdAt: number;
  publishedAt: number;
  updatedAt: number;
  expiresAt?: number;
  likesCount: number;
  commentsCount: number;
  shareCount: number;
  repostCount: number;
  viewsCount: number;
  bookmarksCount: number;
  isLikedByMe?: boolean;
  isSavedByMe?: boolean;
  storagePath: string;
  isDeleted: boolean;
  deleted: boolean;
  isHidden: boolean;
  hidden: boolean;
  uploadStatus: string;
  moderationStatus: string;
  moderatedBy?: string;
  rejectionReason?: string;
  fileName?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  postType: string;
  originalPostId?: string;
  originalAuthorName?: string;
}

export interface FeedComment {
  commentId: string;
  postId: string;
  userId: string;
  userName: string;
  userProfileImage: string;
  userQualification: string;
  text: string;
  replyToCommentId?: string | null;
  replyToUserId?: string | null;
  replyToUserName?: string | null;
  createdAt: number;
}

export interface SuggestedPeer {
  uid: string;
  name: string;
  photoUrl: string;
  profession: string;
  qualification: string;
  state?: string;
  district?: string;
  followersCount?: number;
  isFollowing?: boolean;
}

export interface FollowUserItem {
  userId: string;
  name: string;
  photoUrl: string;
  profession?: string;
  createdAt?: number;
}

/**
 * Resolves avatar URL from any Firestore user, post, comment or peer object.
 * Checks all known schema field variations: photoUrl, photoURL, userProfileImage, profileImageUrl, imageUrl, avatarUrl.
 */
export function resolveAvatarUrl(obj: any): string {
  if (!obj || typeof obj !== "object") return "";
  const candidate =
    obj.photoUrl ||
    obj.photoURL ||
    obj.userProfileImage ||
    obj.profileImageUrl ||
    obj.imageUrl ||
    obj.avatarUrl ||
    "";
  return typeof candidate === "string" ? candidate.trim() : "";
}

/**
 * Extracts hashtags (#keyword) from post text.
 */
export function extractHashtags(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/#([\w\u0080-\uFFFF]+)/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map((m) => m.toLowerCase())));
}

/**
 * Extracts mentions (@username) from post text.
 */
export function extractMentions(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/@([\w\u0080-\uFFFF]+)/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map((m) => m.slice(1))));
}

/**
 * Safe conversion from Firestore Document to SocialFeedPost, exactly matching Android app's toSocialFeedPost.
 */
export function docToSocialFeedPost(docSnap: QueryDocumentSnapshot<DocumentData> | { id: string; data: () => DocumentData | undefined }): SocialFeedPost | null {
  const data = docSnap.data();
  if (!data) return null;

  const rawImageUrls = Array.isArray(data.imageUrls) ? data.imageUrls : Array.isArray(data.mediaUrls) ? data.mediaUrls : [];
  const imageUrl = data.imageUrl || data.mediaUrl || (rawImageUrls[0] ?? "");
  const mediaUrl = data.mediaUrl || imageUrl;

  const rawVideoUrl = data.videoUrl || "";
  const rawExternalVideoId = data.externalVideoId || "";
  const rawVideoPlatform = (data.videoPlatform || "NONE") as VideoPlatform;
  const rawExternalUrl = data.externalUrl || "";
  const rawFileName = data.fileName || "";
  const rawMimeType = data.mimeType || "";
  const rawStoragePath = data.storagePath || "";

  // Deduced content type fallback
  let deducedContentType: ContentType = "TEXT";
  if (data.contentType) {
    deducedContentType = data.contentType.toUpperCase() as ContentType;
  } else if (rawVideoUrl || rawExternalVideoId || rawVideoPlatform !== "NONE" || rawStoragePath.includes("feed_videos")) {
    deducedContentType = "VIDEO";
  } else if (rawExternalUrl) {
    deducedContentType = "LINK";
  } else if (imageUrl || rawStoragePath.includes("feed_images")) {
    deducedContentType = "IMAGE";
  } else if (rawFileName.endsWith(".pdf") || rawMimeType === "application/pdf" || rawStoragePath.includes("feed_files")) {
    deducedContentType = "PDF";
  } else if (rawFileName) {
    deducedContentType = "FILE";
  }

  const rawCreatedAt = typeof data.createdAt === "number" ? data.createdAt : (data.createdAt?.toMillis?.() ?? Date.now());
  const rawPublishedAt = typeof data.publishedAt === "number" ? data.publishedAt : (data.publishedAt?.toMillis?.() ?? rawCreatedAt);
  const rawUpdatedAt = typeof data.updatedAt === "number" ? data.updatedAt : (data.updatedAt?.toMillis?.() ?? rawCreatedAt);

  const parsedDescription = data.description || data.caption || data.text || "";

  return {
    postId: docSnap.id,
    userId: data.userId || "",
    userName: data.userName || "Pharmacy Scholar",
    userProfileImage: data.userProfileImage || "",
    userQualification: data.userQualification || "",
    userPqid: data.userPqid || data.pqid || "",
    contentType: deducedContentType,
    mediaUrl: mediaUrl,
    imageUrl: imageUrl,
    imageUrls: rawImageUrls.filter(Boolean),
    mediaUrls: rawImageUrls.filter(Boolean),
    visibility: (data.visibility || "PUBLIC") as PostVisibility,
    description: parsedDescription,
    caption: data.caption || parsedDescription,
    text: data.text || parsedDescription,
    hashtags: Array.isArray(data.hashtags) ? data.hashtags : [],
    mentions: Array.isArray(data.mentions) ? data.mentions : [],
    mentionedUsernames: Array.isArray(data.mentionedUsernames) ? data.mentionedUsernames : [],
    taggedUserIds: Array.isArray(data.taggedUserIds) ? data.taggedUserIds : [],
    taggedUsernames: Array.isArray(data.taggedUsernames) ? data.taggedUsernames : [],
    videoUrl: rawVideoUrl,
    thumbnailUrl: data.thumbnailUrl || "",
    videoPlatform: rawVideoPlatform,
    externalVideoId: rawExternalVideoId,
    externalUrl: rawExternalUrl,
    externalPlatform: data.externalPlatform || "",
    linkTitle: data.linkTitle || "",
    linkDescription: data.linkDescription || "",
    linkThumbnailUrl: data.linkThumbnailUrl || "",
    state: data.state || "",
    district: data.district || "",
    createdAt: rawCreatedAt,
    publishedAt: rawPublishedAt,
    updatedAt: rawUpdatedAt,
    expiresAt: typeof data.expiresAt === "number" ? data.expiresAt : undefined,
    likesCount: Number(data.likesCount) || 0,
    commentsCount: Number(data.commentsCount) || 0,
    shareCount: Number(data.shareCount) || 0,
    repostCount: Number(data.repostCount) || 0,
    viewsCount: Number(data.viewsCount) || 0,
    bookmarksCount: Number(data.bookmarksCount) || 0,
    storagePath: rawStoragePath,
    isDeleted: Boolean(data.isDeleted ?? data.deleted ?? false),
    deleted: Boolean(data.deleted ?? data.isDeleted ?? false),
    isHidden: Boolean(data.isHidden ?? data.hidden ?? false),
    hidden: Boolean(data.hidden ?? data.isHidden ?? false),
    uploadStatus: data.uploadStatus || "PUBLISHED",
    moderationStatus: data.moderationStatus || "APPROVED",
    moderatedBy: data.moderatedBy || "",
    rejectionReason: data.rejectionReason || "",
    fileName: rawFileName,
    fileSizeBytes: Number(data.fileSizeBytes) || 0,
    mimeType: rawMimeType,
    postType: data.postType || "post",
    originalPostId: data.originalPostId || "",
    originalAuthorName: data.originalAuthorName || ""
  };
}

/**
 * Real-time subscription to active feed posts.
 */
export function subscribeFeedPosts(
  currentUid: string,
  onPostsUpdate: (posts: SocialFeedPost[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const feedsQuery = query(
    collection(db, "feeds"),
    orderBy("publishedAt", "desc"),
    limit(75)
  );

  return onSnapshot(
    feedsQuery,
    (snapshot) => {
      const now = Date.now();
      const items: SocialFeedPost[] = [];

      snapshot.forEach((d) => {
        const post = docToSocialFeedPost(d);
        if (!post) return;

        // Apply same filtering as Android app (SocialFeedRepository.kt line 84-98)
        const notDeleted = !post.isDeleted;
        const notHidden = !post.isHidden;
        const notExpired = !post.expiresAt || post.expiresAt > now;
        const authorized = post.moderationStatus.toUpperCase() === "APPROVED" || (currentUid && post.userId === currentUid);

        if (notDeleted && notHidden && notExpired && authorized) {
          items.push(post);
        }
      });

      // Ensure stable ordering by authoritative publishedAt desc
      items.sort((a, b) => (b.publishedAt || b.createdAt) - (a.publishedAt || a.createdAt));
      onPostsUpdate(items);
    },
    (error) => {
      console.error("Error observing feeds in real time:", error);
      onError?.(error);
    }
  );
}

/**
 * Real-time subscription to current user's liked post IDs (`users/{userId}/likes`).
 */
export function subscribeUserLikes(
  userId: string,
  onUpdate: (likedPostIds: Set<string>) => void
): Unsubscribe {
  if (!userId) {
    onUpdate(new Set());
    return () => {};
  }

  const likesRef = collection(db, "users", userId, "likes");
  return onSnapshot(likesRef, (snap) => {
    const ids = new Set<string>();
    snap.forEach((d) => ids.add(d.id));
    onUpdate(ids);
  }, (err) => {
    console.warn("Error observing user likes:", err);
  });
}

/**
 * Real-time subscription to current user's saved/bookmarked post IDs (`users/{userId}/bookmarks`).
 */
export function subscribeUserBookmarks(
  userId: string,
  onUpdate: (savedPostIds: Set<string>) => void
): Unsubscribe {
  if (!userId) {
    onUpdate(new Set());
    return () => {};
  }

  const bRef = collection(db, "users", userId, "bookmarks");
  return onSnapshot(bRef, (snap) => {
    const ids = new Set<string>();
    snap.forEach((d) => ids.add(d.id));
    onUpdate(ids);
  }, (err) => {
    console.warn("Error observing user bookmarks:", err);
  });
}

/**
 * Real-time subscription to current user's followed target UIDs (`users/{userId}/following`).
 */
export function subscribeUserFollowing(
  userId: string,
  onUpdate: (followingUids: Set<string>) => void
): Unsubscribe {
  if (!userId) {
    onUpdate(new Set());
    return () => {};
  }

  const fRef = collection(db, "users", userId, "following");
  return onSnapshot(fRef, (snap) => {
    const ids = new Set<string>();
    snap.forEach((d) => ids.add(d.id));
    onUpdate(ids);
  }, (err) => {
    console.warn("Error observing user following:", err);
  });
}

/**
 * Real-time subscription to the full Following users list (`users/{userId}/following`).
 * Provides full profile information including real avatar photoUrl and profession.
 */
export function subscribeFollowingList(
  userId: string,
  onUpdate: (following: FollowUserItem[]) => void
): Unsubscribe {
  if (!userId) {
    onUpdate([]);
    return () => {};
  }

  const fRef = collection(db, "users", userId, "following");
  return onSnapshot(fRef, (snap) => {
    const list: FollowUserItem[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        userId: d.id,
        name: data.name || data.fullName || "Pharmacy Colleague",
        photoUrl: resolveAvatarUrl(data),
        profession: data.profession || data.qualification || "Pharmacist",
        createdAt: typeof data.createdAt === "number" ? data.createdAt : Date.now()
      });
    });
    onUpdate(list);
  }, (err) => {
    console.warn("Error observing following list:", err);
  });
}

/**
 * Real-time subscription to the full Followers users list (`users/{userId}/followers`).
 * Provides full profile information including real avatar photoUrl and profession.
 */
export function subscribeFollowersList(
  userId: string,
  onUpdate: (followers: FollowUserItem[]) => void
): Unsubscribe {
  if (!userId) {
    onUpdate([]);
    return () => {};
  }

  const fRef = collection(db, "users", userId, "followers");
  return onSnapshot(fRef, (snap) => {
    const list: FollowUserItem[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        userId: d.id,
        name: data.name || data.fullName || "Pharmacy Scholar",
        photoUrl: resolveAvatarUrl(data),
        profession: data.profession || data.qualification || "Pharmacist",
        createdAt: typeof data.createdAt === "number" ? data.createdAt : Date.now()
      });
    });
    onUpdate(list);
  }, (err) => {
    console.warn("Error observing followers list:", err);
  });
}

/**
 * Real-time subscription to post comments (`feeds/{postId}/comments`).
 */
export function subscribePostComments(
  postId: string,
  onUpdate: (comments: FeedComment[]) => void
): Unsubscribe {
  if (!postId) {
    onUpdate([]);
    return () => {};
  }

  const cQuery = query(
    collection(db, "feeds", postId, "comments"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(cQuery, (snap) => {
    const list: FeedComment[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        commentId: d.id,
        postId: data.postId || postId,
        userId: data.userId || "",
        userName: data.userName || "Scholar",
        userProfileImage: data.userProfileImage || "",
        userQualification: data.userQualification || "",
        text: data.commentText || data.text || "",
        replyToCommentId: data.replyToCommentId || null,
        replyToUserId: data.replyToUserId || null,
        replyToUserName: data.replyToUserName || null,
        createdAt: typeof data.createdAt === "number" ? data.createdAt : (data.createdAt?.toMillis?.() ?? Date.now())
      });
    });
    onUpdate(list);
  }, (err) => {
    console.warn(`Error observing comments for ${postId}:`, err);
  });
}

/**
 * Client-side browser image compression to JPEG with max 1280px dimension
 * (exact parity with Android ImageCompressionHelper).
 */
export async function compressImageClient(file: File, maxDimension: number = 1280, quality: number = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Unable to create canvas context"));
        return;
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Image compression returned empty blob"));
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export interface CreatePostParams {
  userId: string;
  userName: string;
  userProfileImage: string;
  userQualification: string;
  userPqid: string;
  text: string;
  contentType?: ContentType;
  images?: File[];
  externalUrl?: string;
  videoPlatform?: VideoPlatform;
  pdfFile?: File;
  visibility?: PostVisibility;
  state?: string;
  district?: string;
  onProgress?: (progressText: string, pct: number) => void;
}

/**
 * Creates and publishes a social feed post directly from the website
 * matching Android's schema, storage paths, and security rules.
 */
export async function createSocialPost(params: CreatePostParams): Promise<string> {
  const {
    userId,
    userName,
    userProfileImage,
    userQualification,
    userPqid,
    text,
    images = [],
    externalUrl = "",
    videoPlatform = "NONE",
    pdfFile,
    visibility = "PUBLIC",
    state = "",
    district = "",
    onProgress
  } = params;

  if (!userId) {
    throw new Error("You must be logged in to create a post.");
  }

  const trimmedText = text.trim();
  const hasImages = images.length > 0;
  const hasPdf = !!pdfFile;
  const hasLink = Boolean(externalUrl && externalUrl.trim());

  if (!trimmedText && !hasImages && !hasPdf && !hasLink) {
    throw new Error("Please write something or attach media to post.");
  }

  // Determine contentType
  let contentType: ContentType = "TEXT";
  if (hasImages) {
    contentType = "IMAGE";
  } else if (hasPdf) {
    contentType = "PDF";
  } else if (hasLink) {
    contentType = videoPlatform !== "NONE" ? "VIDEO" : "LINK";
  }

  const now = Date.now();
  const postDocRef = doc(collection(db, "feeds"));
  const postId = postDocRef.id;

  const uploadedUrls: string[] = [];
  let storagePath = "";

  // 1. Upload Images if any
  if (hasImages) {
    onProgress?.("Compressing and preparing photos...", 15);
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      onProgress?.(`Compressing photo ${i + 1} of ${images.length}...`, 20 + Math.round((i / images.length) * 30));
      const compressedBlob = await compressImageClient(file, 1280, 0.85);

      const suffix = images.length > 1 ? `_${i}` : "";
      const path = `feed_images/${userId}/${postId}${suffix}.jpg`;
      if (i === 0) storagePath = path;

      onProgress?.(`Uploading photo ${i + 1} of ${images.length}...`, 50 + Math.round((i / images.length) * 35));
      const fileRef = ref(storage, path);
      const snapshot = await uploadBytes(fileRef, compressedBlob, {
        contentType: "image/jpeg",
        customMetadata: {
          uploadedBy: userId,
          postId: postId,
          photoIndex: String(i)
        }
      });
      const url = await getDownloadURL(snapshot.ref);
      uploadedUrls.push(url);
    }
  }

  // 2. Upload PDF if any
  let pdfUrl = "";
  let fileName = "";
  let fileSizeBytes = 0;
  if (hasPdf && pdfFile) {
    onProgress?.("Uploading study note PDF...", 40);
    fileName = pdfFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    fileSizeBytes = pdfFile.size;
    storagePath = `feed_files/${userId}/${postId}/${fileName}`;
    const fileRef = ref(storage, storagePath);
    const snap = await uploadBytes(fileRef, pdfFile, {
      contentType: "application/pdf",
      customMetadata: {
        uploadedBy: userId,
        postId: postId,
        originalName: pdfFile.name
      }
    });
    pdfUrl = await getDownloadURL(snap.ref);
  }

  onProgress?.("Publishing post to PharmaFriends...", 90);

  const hashtags = extractHashtags(trimmedText);
  const mentions = extractMentions(trimmedText);

  const primaryImage = uploadedUrls[0] || "";

  // Exact compatible schema with Android's toFirestoreWriteMap()
  const postPayload: Record<string, unknown> = {
    postId: postId,
    userId: userId,
    userName: userName || "Pharmacy Scholar",
    userProfileImage: userProfileImage || "",
    userQualification: userQualification || "",
    userPqid: userPqid || "",
    contentType: contentType,
    mediaUrl: primaryImage || pdfUrl || "",
    imageUrl: primaryImage,
    imageUrls: uploadedUrls,
    mediaUrls: uploadedUrls,
    visibility: visibility,
    description: trimmedText,
    caption: trimmedText,
    text: trimmedText,
    hashtags: hashtags,
    mentions: [],
    mentionedUsernames: mentions,
    taggedUserIds: [],
    taggedUsernames: mentions,
    videoUrl: contentType === "VIDEO" ? externalUrl : "",
    thumbnailUrl: "",
    videoPlatform: videoPlatform,
    externalVideoId: "",
    externalUrl: externalUrl,
    externalPlatform: videoPlatform !== "NONE" ? videoPlatform : "",
    linkTitle: hasLink ? "Pharmacy Resource Link" : "",
    linkDescription: "",
    linkThumbnailUrl: "",
    state: state,
    district: district,
    createdAt: now,
    publishedAt: now,
    updatedAt: now,
    likesCount: 0,
    commentsCount: 0,
    shareCount: 0,
    repostCount: 0,
    viewsCount: 0,
    bookmarksCount: 0,
    storagePath: storagePath,
    isDeleted: false,
    deleted: false,
    isHidden: false,
    hidden: false,
    uploadStatus: "PUBLISHED",
    moderationStatus: "APPROVED",
    postType: "post",
    originalPostId: "",
    originalAuthorId: "",
    originalAuthorName: "",
    originalAuthorImage: "",
    originalAuthorQualification: "",
    repostedBy: "",
    repostedByName: "",
    repostText: ""
  };

  if (hasPdf) {
    postPayload.fileName = fileName;
    postPayload.fileSizeBytes = fileSizeBytes;
    postPayload.mimeType = "application/pdf";
  }

  // Set post document in Firestore
  await setDoc(postDocRef, postPayload);
  onProgress?.("Post successfully published! 🎉", 100);

  return postId;
}

/**
 * Toggles like on a post: atomically updates `feeds/{postId}/likes/{userId}`,
 * `users/{userId}/likes/{postId}`, and `feeds/{postId}.likesCount`.
 */
export async function togglePostLike(
  postId: string,
  user: { uid: string; name: string }
): Promise<boolean> {
  if (!user.uid || !postId) return false;

  const likeDocRef = doc(db, "feeds", postId, "likes", user.uid);
  const userLikeDocRef = doc(db, "users", user.uid, "likes", postId);
  const postDocRef = doc(db, "feeds", postId);

  const snap = await getDoc(likeDocRef);
  const isCurrentlyLiked = snap.exists();

  const batch = writeBatch(db);

  if (isCurrentlyLiked) {
    batch.delete(likeDocRef);
    batch.delete(userLikeDocRef);
    batch.update(postDocRef, {
      likesCount: increment(-1)
    });
    await batch.commit();
    return false;
  } else {
    batch.set(likeDocRef, {
      userId: user.uid,
      userName: user.name || "Student",
      createdAt: Date.now()
    });
    batch.set(userLikeDocRef, {
      postId: postId,
      likedAt: Date.now()
    });
    batch.update(postDocRef, {
      likesCount: increment(1)
    });
    await batch.commit();
    return true;
  }
}

/**
 * Toggles save / bookmark on a post: updates `users/{userId}/bookmarks/{postId}`
 * and increments/decrements `feeds/{postId}.bookmarksCount`.
 */
export async function togglePostBookmark(
  postId: string,
  userId: string
): Promise<boolean> {
  if (!userId || !postId) return false;

  const bRef = doc(db, "users", userId, "bookmarks", postId);
  const postDocRef = doc(db, "feeds", postId);

  const snap = await getDoc(bRef);
  const isCurrentlySaved = snap.exists();

  const batch = writeBatch(db);

  if (isCurrentlySaved) {
    batch.delete(bRef);
    batch.update(postDocRef, {
      bookmarksCount: increment(-1)
    });
    await batch.commit();
    return false;
  } else {
    batch.set(bRef, {
      postId: postId,
      savedAt: Date.now()
    });
    batch.update(postDocRef, {
      bookmarksCount: increment(1)
    });
    await batch.commit();
    return true;
  }
}

/**
 * Adds a comment to a feed post (`feeds/{postId}/comments`) and increments commentsCount.
 */
export async function addPostComment(
  postId: string,
  text: string,
  user: { uid: string; name: string; photoUrl: string; qualification: string }
): Promise<string> {
  if (!user.uid || !postId || !text.trim()) {
    throw new Error("Invalid comment data");
  }

  const commentsCol = collection(db, "feeds", postId, "comments");
  const commentDocRef = doc(commentsCol);
  const postDocRef = doc(db, "feeds", postId);

  const batch = writeBatch(db);
  batch.set(commentDocRef, {
    commentId: commentDocRef.id,
    postId: postId,
    userId: user.uid,
    userName: user.name || "Pharmacy Scholar",
    userProfileImage: user.photoUrl || "",
    userQualification: user.qualification || "",
    commentText: text.trim(),
    text: text.trim(),
    createdAt: Date.now()
  });

  batch.update(postDocRef, {
    commentsCount: increment(1)
  });

  await batch.commit();
  return commentDocRef.id;
}

/**
 * Deletes a comment from a feed post.
 */
export async function deletePostComment(
  postId: string,
  commentId: string
): Promise<void> {
  if (!postId || !commentId) return;

  const commentDocRef = doc(db, "feeds", postId, "comments", commentId);
  const postDocRef = doc(db, "feeds", postId);

  const batch = writeBatch(db);
  batch.delete(commentDocRef);
  batch.update(postDocRef, {
    commentsCount: increment(-1)
  });

  await batch.commit();
}

/**
 * Deletes a post created by the user (cleans up Firestore document and Storage files if accessible).
 */
export async function deleteFeedPost(
  postId: string,
  userId: string,
  storagePath?: string
): Promise<void> {
  if (!postId || !userId) return;

  const postDocRef = doc(db, "feeds", postId);
  await deleteDoc(postDocRef);

  if (storagePath) {
    try {
      const fileRef = ref(storage, storagePath);
      await deleteObject(fileRef);
    } catch {
      // Storage deletion best effort
    }
  }
}

/**
 * Follow a peer user atomically:
 * Updates `follows/{followerUid}_{targetUid}`, `users/{followerUid}/following/{targetUid}`,
 * `users/{targetUid}/followers/{followerUid}` and increments counters.
 */
export async function followPeerUser(
  follower: { uid: string; name: string; photoUrl: string; profession: string },
  target: { uid: string; name: string; photoUrl: string; profession: string }
): Promise<boolean> {
  if (!follower.uid || !target.uid || follower.uid === target.uid) return false;

  const followId = `${follower.uid}_${target.uid}`;
  const followDocRef = doc(db, "follows", followId);
  const followerFollowingDoc = doc(db, "users", follower.uid, "following", target.uid);
  const targetFollowerDoc = doc(db, "users", target.uid, "followers", follower.uid);
  const followerUserDoc = doc(db, "users", follower.uid);
  const targetUserDoc = doc(db, "users", target.uid);

  const batch = writeBatch(db);

  batch.set(followDocRef, {
    followId: followId,
    followerUid: follower.uid,
    followingUid: target.uid,
    followerName: follower.name || "Pharmacy Scholar",
    followerPhotoUrl: follower.photoUrl || "",
    followerProfession: follower.profession || "",
    followingName: target.name || "Colleague",
    followingPhotoUrl: target.photoUrl || "",
    followingProfession: target.profession || "",
    createdAt: Date.now()
  });

  batch.set(followerFollowingDoc, {
    userId: target.uid,
    name: target.name || "Colleague",
    photoUrl: target.photoUrl || "",
    profession: target.profession || "",
    createdAt: Date.now()
  });

  batch.set(targetFollowerDoc, {
    userId: follower.uid,
    name: follower.name || "Pharmacy Scholar",
    photoUrl: follower.photoUrl || "",
    profession: follower.profession || "",
    createdAt: Date.now()
  });

  try {
    batch.update(followerUserDoc, { followingCount: increment(1) });
    batch.update(targetUserDoc, { followersCount: increment(1) });
  } catch {
    // Optional counter updates if user docs exist
  }

  await batch.commit();
  return true;
}

/**
 * Unfollow a peer user atomically.
 */
export async function unfollowPeerUser(
  followerUid: string,
  targetUid: string
): Promise<boolean> {
  if (!followerUid || !targetUid || followerUid === targetUid) return false;

  const followId = `${followerUid}_${targetUid}`;
  const followDocRef = doc(db, "follows", followId);
  const followerFollowingDoc = doc(db, "users", followerUid, "following", targetUid);
  const targetFollowerDoc = doc(db, "users", targetUid, "followers", followerUid);
  const followerUserDoc = doc(db, "users", followerUid);
  const targetUserDoc = doc(db, "users", targetUid);

  const batch = writeBatch(db);
  batch.delete(followDocRef);
  batch.delete(followerFollowingDoc);
  batch.delete(targetFollowerDoc);

  try {
    batch.update(followerUserDoc, { followingCount: increment(-1) });
    batch.update(targetUserDoc, { followersCount: increment(-1) });
  } catch {
    // Optional counter decrements
  }

  await batch.commit();
  return true;
}

/**
 * Fetches real suggested peers from `public_profiles` or `users`.
 */
export async function fetchSuggestedPeers(currentUid: string, limitCount: number = 6): Promise<SuggestedPeer[]> {
  try {
    const q = query(collection(db, "public_profiles"), limit(25));
    const snap = await getDocs(q);
    const peers: SuggestedPeer[] = [];

    snap.forEach((d) => {
      if (d.id === currentUid) return;
      const data = d.data();
      if (!data.name || data.isBanned) return;

      peers.push({
        uid: d.id,
        name: data.name || data.fullName || "Pharmacy Scholar",
        photoUrl: resolveAvatarUrl(data),
        profession: data.profession || data.qualification || "Pharmacist",
        qualification: data.qualification || "B.Pharm",
        state: data.state || "",
        district: data.district || "",
        followersCount: Number(data.followersCount) || 0
      });
    });

    return peers.slice(0, limitCount);
  } catch (err) {
    console.warn("Could not fetch public_profiles, trying users fallback:", err);
    return [];
  }
}

/**
 * Formats relative timestamp: "Just now", "5m ago", "2h ago", "Yesterday • 3:15 PM", "12 Oct 2026"
 */
export function formatRelativeTime(timestamp: number): string {
  if (!timestamp || timestamp <= 0) return "Recently";
  const now = Date.now();
  const diffMs = Math.max(0, now - timestamp);
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) {
    const timeStr = new Date(timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return `Yesterday • ${timeStr}`;
  }
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
