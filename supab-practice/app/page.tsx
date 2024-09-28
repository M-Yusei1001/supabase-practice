import Link from "next/link";
import PostType from "./types";
import Header from "@/app/header";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

const fetchAllBlogs = async () => {
  const res = await fetch(`http://localhost:3000/api/blog`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.posts;
};

export default async function Home() {
  const posts = await fetchAllBlogs();

  return (
    <main className="w-full h-full">
      <Button color="primary" radius="full" className="flex mx-auto">
        <Link href={"/blog/add"}>新規作成</Link>
      </Button>

      <div className="w-full mx-auto flex flex-col items-center">
        {posts.map((post: PostType) => {
          return (
            <Card key={post.id} className="flex my-4 p-4 w-1/2">
              <CardHeader>
                <h2 className="mr-auto font-semibold">{post.titile}</h2>
                <Button color="primary" radius="full">
                  <Link href={`/blog/edit/${post.id}`}>編集</Link>
                </Button>
              </CardHeader>
              <CardBody>
                <div className="mr-auto">
                  <h2>{post.description}</h2>
                </div>
              </CardBody>
              <CardFooter>
                <div>
                  <blockquote className="font-bold text-slate-700">
                    {new Date(post.date).toDateString()}
                  </blockquote>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
