import  { AgentsViewError,
     AgentsViewLoading,
     AgentsView } from "@/modules/agents/ui/views/agents-view";


import { ErrorBoundary } from "react-error-boundary"
import { trpc,getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function page() {
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />} >
      <ErrorBoundary fallback={<AgentsViewError />}>
        <AgentsView />
      </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}



