"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const router = useRouter();
  const {register, control, handleSubmit} =  useForm<IssueForm>();
  console.log(register('title'))

  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && <Callout.Root color="red" className="mb-5">{error}</Callout.Root>}
       
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async(data)=>{
      try {
        
        await axios.post('/api/issues', data);
        router.push('/issues');
      } catch (error) {
        setError("An unexpected error occurred.");
        
      }
    })}>
      <TextField.Root>
        <TextField.Slot>
          <input placeholder="Title" {...register('title')} />
        </TextField.Slot>
      </TextField.Root>
 
             <Controller
         name="description"
         control={control}
         render={({field})=><SimpleMDE placeholder="Description" {...field}/>}
       />

      <Button>Submit New Issue</Button>
    </form>
    </div>
  
);
}