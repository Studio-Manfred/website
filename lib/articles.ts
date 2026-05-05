import { supabase } from './supabase'

export type Article = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author_id: string
  published: boolean
  published_at: string
  created_at: string
  author: string
}

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, profiles(full_name)')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) throw error
  return data.map((post) => ({
    ...post,
    image: post.cover_image_url,
    author: post.profiles?.full_name ?? 'Unknown'
  }))
}

export async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, profiles(full_name)')
    .eq('slug', slug)
    .single()

  if (error) return null
  return {
    ...data,
    image: data.cover_image_url,
    author: data.profiles?.full_name ?? 'Unknown'
  }
}