"use client"
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import NewAgentDialog from './new-agent-dialog';

export function AgentsListHeader() {
    const [isDialogOpen, setIsDialogOpen]  = useState(false)
  return (
    <>
    <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    <div className="flex flex-col gap-y-4 py-4 px-4 md:px-6 lg:px-8">
      <div className='flex items-center justify-between'>
      <h5 className='text-2xl font-bold'>My Agents</h5>
      <Button onClick={()=>setIsDialogOpen(true)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        New agent
      </Button>
      </div>
    </div>
    </>
  );
}
