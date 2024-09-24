"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const editBlog = async (
  id: number,
  titile: string | undefined,
  description: string | undefined,
) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, titile, description }),
    });
    return res.json();
  } catch (e) {
    return new Error(e);
  }
};

const deleteBlog = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (e) {
    return new Error(e);
  }
};

const getBlogById = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`);
    const data = await res.json();
    return data.post;
  } catch (e) {
    return new Error(e);
  }
};

function Edit({ params }: { params: { id: number } }) {
  const router = useRouter();
  //useRefはrefを付けた属性の値を取得できる
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("更新中です…", { id: "1" });
    await editBlog(
      params.id,
      titleRef.current?.value,
      descriptionRef.current?.value,
    );
    toast.success("更新に成功しました！", { id: "1" });
    //useRouterでリダイレクト
    router.push("/");
    router.refresh();
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("削除中です...", { id: "1" });
    await deleteBlog(params.id);
    toast.success("削除しました", { id: "1" });
    //useRouterでリダイレクト
    router.push("/");
    router.refresh();
    console.log("delete redirect");
  };

  useEffect(() => {
    toast.loading("記事を取得しています…", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.titile;
          descriptionRef.current.value = data.description;
        }
      })
      .then(() => {
        toast.success("記事を取得しました", { id: "1" });
      })
      .catch((e) => {
        if (e) toast.error("エラーが発生しました", { id: "1" });
      });
  });

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            ブログの編集 🚀
          </p>
          <form>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
            >
              更新
            </button>
            <button
              onClick={handleDelete}
              className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100"
            >
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
