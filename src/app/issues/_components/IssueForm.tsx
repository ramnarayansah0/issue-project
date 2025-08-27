"use client";

import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {zodResolver} from "@hookform/resolvers/zod"
import { createIssueSchema } from "@/app/ValidationSchema";
import { z } from "zod";
import Spinner from "@/app/component/Spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>
interface IssueProp {
  id: number;
  title: string;
  description: string;
}
interface Props{
  issue?: IssueProp
}

export default function IssueForm({ issue }: Props) {
  const router = useRouter();
  const {register, control, handleSubmit,formState:{ errors}} =  useForm<IssueFormData>({resolver: zodResolver(createIssueSchema)});
  console.log(register('title'))

  const [error, setError] = useState("");
  const [submit,setSubmit]= useState(false);
  
  const onSubmit=handleSubmit(async(data)=>{
    try {
      setSubmit(true)
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError("An unexpected error occurred.");
      setSubmit(false)
    }
  })

  return (
    <div className="max-w-xl">
      {error && <Callout.Root color="red" className="mb-5">{error}</Callout.Root>}
       
    <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
      <TextField.Root>
        <TextField.Slot>
          <input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
        </TextField.Slot>
      </TextField.Root>
      {errors.title && <Text color ="red">{errors.title.message}</Text>}
 
             <Controller
         name="description"
         control={control}
         defaultValue={issue?.description}
         render={({field})=><SimpleMDE placeholder="Description" {...field}/>}
       />
       {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}

      <Button  disabled={submit}>Submit New Issue{submit && <Spinner></Spinner>} </Button>
    </form>
    </div>
  
);
}