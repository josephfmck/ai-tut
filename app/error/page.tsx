// 5 https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
import Link from 'next/link';

export default function ErrorPage() {
    console.log("rendering errorpage");
    return (
      <div>
        <p>Sorry, something went wrong</p>
        <Link href="/">
          <a style={{ color: 'blue', textDecoration: 'underline' }}>Go back to Home</a>
        </Link>
      </div>
    )
}
  