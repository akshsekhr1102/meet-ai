"use client"

import { DataTable } from "@/components/data-table";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";

export function MeetingsView() {
    const trpc = useTRPC()
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
  return (
    <div className="p-4 md:p-6 lg:p-8 flex-1 flex flex-col gap-y-4">
      <DataTable  columns={columns} data={data?.items} />
      {
              data?.items.length === 0 ? (
                <EmptyState
                  title="Create your first meeting"
                  description="You don't have any meetings yet. Create one to get started"
                />
              ) : null
            }
    </div> 
  );
}



export const MeetingsViewLoading = () => {
    return (
      <LoadingState
        title="Loading meetings"
        description="Please wait while we load the meetings"
      />
    );
  };
  
  export const MeetingsViewError = () => {
    return (
      <ErrorState
        title="Error loading meetings"
        description="Please try again later"
      />
    );
  };
  