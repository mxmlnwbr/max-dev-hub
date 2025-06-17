import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  const posts = await prisma.post.findMany()
  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
 
export async function POST(request: Request) {
  console.log("request", request)
  const body = await request.json();
  const content = body.content;
 
  if (!content) {
    return new Response(JSON.stringify({ error: 'Content is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
 
  const newPost = await prisma.post.create({ data: { content } });
 
  return new Response(JSON.stringify({ id: newPost.id }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}