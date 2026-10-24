import { redirect } from "next/navigation";

export default async function RootPage({
  searchParams
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {
  const sp = searchParams ? await searchParams : undefined;
  const redir = sp?.redirect;

  // Preserve valid redirect targets if provided, otherwise default directly to /login
  if (redir && redir !== "/" && redir !== "/login") {
    redirect(`/login?redirect=${encodeURIComponent(redir)}`);
  }

  redirect("/login");
}
