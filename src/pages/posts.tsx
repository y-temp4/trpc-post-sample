import { type NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";

const Posts: NextPage = () => {
  const postGetAllQuery = api.post.getAll.useQuery();
  const addPostMutation = api.post.addPost.useMutation();
  const utils = api.useContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  if (postGetAllQuery.isLoading) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPostMutation.mutate(
      { title, content },
      {
        onSuccess: (result) => {
          utils.post.getAll.setData(undefined, (old) => {
            return [result, ...(old ?? [])];
          });
        },
      }
    );
    setTitle("");
    setContent("");
  };

  return (
    <div style={{ padding: "10px" }}>
      <div>記事の追加</div>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button>追加</button>
      </form>
      <h1>記事一覧</h1>
      {postGetAllQuery.data?.map((post) => (
        <div
          key={post.id}
          style={{ border: "1px solid", padding: "10px", margin: "10px" }}
        >
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div>{post.createdAt.toISOString()}</div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
