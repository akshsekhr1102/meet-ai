import { getQueryClient, trpc } from "@/trpc/server";

import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from "@/modules/meetings/ui/views/meetings-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loadSearchParams } from "@/modules/meetings/params";
import type { SearchParams } from "nuqs/server";


interface Props {
    searchParams: Promise<SearchParams>
}

export default async function Meetings({searchParams}: Props) {
  const filters = await loadSearchParams(searchParams)

  const queryClient = getQueryClient()
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({...filters})
  )
  return (
    <>
    <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
        <ErrorBoundary fallback={<MeetingsViewError />}>
          <MeetingsView />
        </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
