import  { AgentsViewError,
     AgentsViewLoading,
     AgentsView } from "@/modules/agents/ui/views/agents-view";


import { ErrorBoundary } from "react-error-boundary"
import { trpc,getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";

interface Props {
  searchParams: Promise<SearchParams>
}

export default async function page({searchParams}: Props) {

  const filters = await loadSearchParams(searchParams)

 const session = await auth.api.getSession({
     headers: await headers(),
   });
 
   if (!session) {
     redirect("/sign-in");
   }
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
     ...filters
    }))

  return (
    <>
    <AgentsListHeader />
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />} >
      <ErrorBoundary fallback={<AgentsViewError />}>
        <AgentsView />
      </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
    );
}



