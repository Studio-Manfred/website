import { supabase } from "./supabase";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author_id: string;
  published: boolean;
  published_at: string;
  created_at: string;
  author: string;
};

export function cleanContent(html: string): string {
  return html
    .replace(/\[caption[^\]]*\]/g, '<figure>')
    .replace(/\[\/caption\]/g, '</figure>')
    .replace(/\[\/?\w+[^\]]*\]/g, '')
    .trim()
}

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, profiles(full_name)")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data.map((post) => ({
    ...post,
    image: post.cover_image_url,
    author: post.profiles?.full_name ?? "Unknown",
    excerpt: stripHtml(post.excerpt ?? ""),
  }));
}

export async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, profiles(full_name)")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return {
    ...data,
    image: data.cover_image_url,
    author: data.profiles?.full_name ?? "Unknown",
    excerpt: stripHtml(data.excerpt ?? ""),
    content: cleanContent(data.content ?? ""),
  };
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
