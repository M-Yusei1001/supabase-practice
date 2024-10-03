"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

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
    <div className="pb-10">
      <Toaster />
      <div className="w-full">
        <div className="container mx-auto py-4 text-center ">
          <p className="text-2xl text-gray-600 font-bold p-4">ブログ新規作成</p>
          <form onSubmit={handleSubmit}>
            <Input
              className="p-4"
              ref={titleRef}
              label="タイトル"
              placeholder="タイトルを入力"
            />
            <Textarea
              className="p-4"
              ref={descriptionRef}
              label="内容"
              placeholder="内容を入力"
            />
            <Button radius="full" color="primary">
              投稿
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
