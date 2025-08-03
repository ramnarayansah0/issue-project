"use client";

import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Slot>
          <input placeholder="Title" />
        </TextField.Slot>
      </TextField.Root>

      <SimpleMDE placeholder="Description" />

      <Button>Submit New Issue</Button>
    </div>
  );
}