"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const postBlog = async (
  titile: string | undefined,
  description: string | undefined,
) => {
  try {
    const res = await fetch("http://localhost:3000/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titile, description }),
    });
    return res.json();
  } catch (e) {
    return new Error(e);
  }
};

function Add() {
  const router = useRouter();

  //useRefはrefを付けた属性の値を取得できる
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading("投稿中です…", { id: "1" });
    await postBlog(titleRef.current?.value, descriptionRef.current?.value);

    toast.success("投稿に成功しました！", { id: "1" });

    //useRouterでリダイレクト
    router.push("/");
    router.refresh();
  };

  return (
    <div className="bg-slate-400 pb-10">
      <Toaster />
      <div className="container mx-auto flex">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            ブログ新規作成 🚀
          </p>
          <form onSubmit={handleSubmit}>
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
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              投稿
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
