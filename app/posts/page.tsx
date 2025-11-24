'use client';

import { useState, useEffect } from 'react';

interface Post {
    id: number;
    title: string;
    content: string | null;
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });
        setTitle('');
        setContent('');
        fetchPosts();
    };

    const handleDelete = async (id: number) => {
        await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        fetchPosts();
    };

    return (
        <div className="p-8 font-sans max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Posts</h1>

            <form onSubmit={handleSubmit} className="mb-8 space-y-4 border p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div>
                    <label className="block mb-2 font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full rounded text-black"
                        required
                        placeholder="Enter post title"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-medium">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border p-2 w-full rounded text-black"
                        rows={3}
                        placeholder="Enter post content"
                    />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                    Add Post
                </button>
            </form>

            <div className="space-y-4">
                {posts.length === 0 && <p className="text-gray-500 text-center">No posts yet.</p>}
                {posts.map((post) => (
                    <div key={post.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold">{post.title}</h2>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">{post.content}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded border border-red-200 hover:border-red-400"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
