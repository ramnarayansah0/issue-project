import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button } from "@radix-ui/themes";

export default function DeleteIssueButton({issueId}:{issueId:number}) {
    return(
        <>
        <AlertDialog.Root>
		<AlertDialog.Trigger >
        <Button color="red" ><TrashIcon/> Delete Issue</Button>
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
						<button className="Button red">Yes, delete account</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		
	</AlertDialog.Root>
        
        </>
    )
}
