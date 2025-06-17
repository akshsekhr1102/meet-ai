"use client"

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import AgentIdViewHeader from "./agent-id-view-header";
import GeneratedAvatar from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface Props {
    agentId: string
}

export default function AgentIdViews({agentId}: Props) {
    const trpc = useTRPC()
    const {data: agent} = useSuspenseQuery(trpc.agents.getOne.queryOptions({
        id: agentId
    }))
  return (
    <div className="flex-1 w-full p-4 md:px-8 flex flex-col gap-y-4">
      <AgentIdViewHeader
      agentId={agentId}
      agentName={agent.name}
      onEdit={() => {}}
      onRemove={() => {}}
      />
      <div className="bg-white  rounded-lg border">
        <div className="flex flex-col col-span-5 p-4 gap-y-5 ">
         <div className="flex items-center gap-x-3">
            <GeneratedAvatar variant="botttsNeutral" seed={agent.name} className="size-10"/>
            <h2 className="text-lg font-medium">{agent.name}</h2>
         </div>
         <Badge variant="outline" className="flex items-center gap-x-2">
            <VideoIcon className="mr-2 h-4 w-4 text-blue-700" />
            {agent.meetingCount} {agent.meetingCount === 1 ? "Meeting" : "Meetings"}
         </Badge>
         <div className="flex flex-col gap-y-4">
            <p className="text-lg font-medium">Instructions</p>
            <p className="text-neutral-800">{agent.instructions}</p>
         </div>
        </div>
      </div>
    </div>
  );
}


export const AgentIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading agent"
      description="Please wait while we load the agent"
    />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Error loading agent"
      description="Please try again later"
    />
  );
};
