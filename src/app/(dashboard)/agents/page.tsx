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

export default async function page() {

 const session = await auth.api.getSession({
     headers: await headers(),
   });
 
   if (!session) {
     redirect("/sign-in");
   }
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

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



