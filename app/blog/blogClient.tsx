"use client";

import { Permissions } from "@/types/next-auth";
import { hasPagePermission } from "@/utils/permissions";
import { useState } from "react";

const initialBlogPosts = [
  { id: 1, title: "First Post", content: "This is the first blog post." },
  { id: 2, title: "Second Post", content: "This is the second blog post." },
];

interface BlogClientProps {
  session: {
    user?: {
      permissions?: Permissions;
    };
  } | null;
}

export default function BlogClient({ session }: BlogClientProps) {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  
  const canCreate = hasPagePermission(session?.user?.permissions || {}, "blog", "POST");
  const canUpdate = hasPagePermission(session?.user?.permissions || {}, "blog", "PUT");
  const canDelete = hasPagePermission(session?.user?.permissions || {}, "blog", "DELETE");

  const handleCreate = () => {
    if (!newPost.title || !newPost.content) return;

    const newPostWithId = {
      id: blogPosts.length + 1,
      title: newPost.title,
      content: newPost.content,
    };

    setBlogPosts([...blogPosts, newPostWithId]);
    setNewPost({ title: "", content: "" });
  };

  const handleUpdate = (id: number, updatedTitle: string, updatedContent: string) => {
    const updatedPosts = blogPosts.map((post) =>
      post.id === id ? { ...post, title: updatedTitle, content: updatedContent } : post
    );
    setBlogPosts(updatedPosts);
  };

  const handleDelete = (id: number) => {
    const filteredPosts = blogPosts.filter((post) => post.id !== id);
    setBlogPosts(filteredPosts);
  };

  return (
    <div className="p-8 m-auto">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

      {canCreate && (
        <div className="mb-6">
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
