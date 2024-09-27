import Link from "next/link";
import PostType from "./types";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Button} from "@nextui-org/react";

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
      <Navbar position="static">
        <NavbarBrand>
          <p className="font-bold">Supabase-Practice</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="#">Content1</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button variant="shadow" radius="full">Sign Up</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {/* Link */}
      <div className="flex my-5">
        <Link
          href={"/blog/add"}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
        >
          ブログ新規作成
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {posts.map((post: PostType) => {
          return (
            <div
              key={post.id}
              className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-300 flex flex-col justify-center"
            >
              <div className="flex items-center my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-semibold">{post.titile}</h2>
                </div>
                <Link
                  href={`/blog/edit/${post.id}`}
                  className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
                >
                  編集
                </Link>
              </div>

              <div className="mr-auto my-1">
                <blockquote className="font-bold text-slate-700">
                  {new Date(post.date).toDateString()}
                </blockquote>
              </div>

              <div className="mr-auto my-1">
                <h2>{post.description}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
