"use client"
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteIssueButton({issueId}:{issueId:number}) {
    const router = useRouter();
	const [error,setError] = useState(false);
	const [loading,setLoading] = useState(false);
	const issuedelete = async()=>
		{
			try {
				setLoading(true);
				await axios.delete(`/api/issues/`+issueId);
				router.push("/issues");
				router.refresh();
				
			} catch (error) {
				setError(true);
				
			}
			 
	}
		
	return(
        <>
        <AlertDialog.Root>
		<AlertDialog.Trigger >
        <Button disabled={loading} color="red" ><TrashIcon/>{loading && <Spinner/>} Delete Issue</Button>
		</AlertDialog.Trigger>
<AlertDialog.Content className="AlertDialogContent">
				<AlertDialog.Title className="AlertDialogTitle">
					Are you absolutely sure?
				</AlertDialog.Title>
				<AlertDialog.Description className="AlertDialogDescription">
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialog.Description>
				<div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
					<AlertDialog.Cancel >
						<button className="Button mauve">Cancel</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<button onClick={issuedelete} className="Button red">Yes, delete account</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		
	</AlertDialog.Root>

	<AlertDialog.Root open={error}>
		<AlertDialog.Content>
			<AlertDialog.Title>Error</AlertDialog.Title>
			<AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
			<Button onClick={()=>setError(false)} color ="gray" variant="soft">Ok</Button>
		</AlertDialog.Content>
		</AlertDialog.Root>        
        </>
    )
}
