import { Button, TextArea, TextField } from "@radix-ui/themes";

export default function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Slot>
          <input placeholder="Title" />
        </TextField.Slot>
      </TextField.Root>

      <TextArea placeholder="Description" />

      <Button>Submit New Issue</Button>

     
    </div>
  );
}