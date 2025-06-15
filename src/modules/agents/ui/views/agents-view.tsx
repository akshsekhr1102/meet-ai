"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";



export function AgentsView() {
  const trpc = useTRPC();
  const { data: agents } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 w-full p-4 md:p-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={agents} />
      {
        agents.length === 0 ? (
          <EmptyState
            title="Create your first agent"
            description="You don't have any agents yet. Create one to get started"
          />
        ) : null
      }
    </div>
  );
}

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading agents"
      description="Please wait while we load the agents"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
};
