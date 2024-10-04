"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { Button, Input, Textarea } from "@nextui-org/react";

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
      <div className="w-full">
        <div className="flex container mx-auto py-4 justify-center">
          <p className="text-2xl text-slate-200 font-bold p-3">
            ブログの編集 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="title"
              className="p-4"
              ref={titleRef}
              label="タイトル"
              placeholder="タイトルを入力"
            />
            <Textarea
              type="text"
              name="description"
              className="p-4"
              ref={descriptionRef}
              label="内容"
              placeholder="内容を入力"
            />
            <Button type="submit" color="primary" radius="full" className="p-4">
              更新
            </Button>
            <Button color="danger" radius="full" className="p-4">
              削除
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
