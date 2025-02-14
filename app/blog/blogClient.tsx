"use client";

import { Permissions } from "@/types/next-auth";
import { hasPagePermission } from "@/utils/permissions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BlogClientProps {
  session: {
    user?: {
      id?: string;
      permissions?: Permissions;
    };
  } | null;
}

interface BlogPosts {
  id: string;
  title: string;
  content: string;
}

export default function BlogClient({ session }: BlogClientProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const canCreate = hasPagePermission(session?.user?.permissions || {}, "blog", "POST");
  const canUpdate = hasPagePermission(session?.user?.permissions || {}, "blog", "PUT");
  const canDelete = hasPagePermission(session?.user?.permissions || {}, "blog", "DELETE");

  useEffect(() => {
    fetch("/api/blogs", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogPosts(data);
        } else {
          setBlogPosts([]);
        }
      })
      .catch(() => setBlogPosts([]));
  }, []);

  const handleCreate = async () => {
    if (!newPost.title || !newPost.content) {
      setErrorMessage("Title and content cannot be empty");
      return;
    }

    setErrorMessage("");
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newPost.title,
        content: newPost.content,
        userId: session?.user?.id
      }),
    });

    if (!response.ok) {
      setErrorMessage("Failed to create post");
      return;
    }

    const newBlog = await response.json();
    await setBlogPosts((prev) => [...prev, newBlog]);
    setNewPost({ title: "", content: "" });
  };

  const handleUpdate = async (id: string, updatedTitle: string, updatedContent: string) => {
    const response = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
    });

    if (!response.ok) {
      alert("Failed to update post");
      return;
    }

    const updatedBlog = await response.json();
    setBlogPosts((prev) => prev.map((post) => (post.id === id ? updatedBlog : post)));
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });

    setBlogPosts(blogPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="p-8 m-auto">
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
        <button className="bg-slate-300 p-2 px-4 rounded- font-medium text-sm" onClick={() => router.push('/dashboard')}>Back</button>
      </div>

      {canCreate && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Create a New Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Post
          </button>
        </div>
      )}

      {errorMessage && <p className="text-red-500 p-2">{errorMessage}</p>}

      <div className="flex flex-col gap-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>

            <div className="mt-2 space-x-2">
              {canUpdate && (
                <button
                  onClick={() => {
                    const updatedTitle = prompt("Enter new title:", post.title);
                    const updatedContent = prompt("Enter new content:", post.content);
                    if (updatedTitle && updatedContent) {
                      handleUpdate(post.id, updatedTitle, updatedContent);
                    }
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              )}
              {canDelete && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
