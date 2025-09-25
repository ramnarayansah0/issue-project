"use client"
import * as React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@radix-ui/themes";

// Define User type
interface User {
	id: string;
	name: string;
}

// Minimal shape of Issue needed for this component
interface IssueForAssign {
	id: number;
	assignedToUserId?: string | null;
}

const SelectDemo = ({issue}:{issue: IssueForAssign}) => {
	const {data: users, error, isLoading} = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => axios.get('/api/users').then(res => res.data),
		staleTime: 60 * 1000,
		retry:3
	});
	if(isLoading) return <Skeleton/>
	if(error) return <span className="text-red-600 text-sm">Failed to load users</span>

	return (
		
		<Select.Root
		defaultValue={issue.assignedToUserId ?? 'unassigned'}
		onValueChange={(userId)=>{
			const payloadId = userId === 'unassigned' ? null : userId;
			axios.patch('/api/issues/'+issue.id,{AssignedToUserId: payloadId});
		}}>
			<Select.Trigger
				className="inline-flex items-center justify-between gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm leading-none text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[placeholder]:text-gray-400 w-56"
				aria-label="Food"
			>
				<Select.Value placeholder="Assign" />
				<Select.Icon>
					<ChevronDownIcon />
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
					position="popper"
				>
					<Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700">
						<ChevronUpIcon />
					</Select.ScrollUpButton>
					<Select.Viewport className="p-1">
						<Select.Group>
							<SelectItem key="unassigned" value="unassigned">Unassigned</SelectItem>
							{users?.map((user: User) => (
								<SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
							))}
						</Select.Group>
					</Select.Viewport>
					<Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700">
						<ChevronDownIcon />
					</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};

type SelectItemRef = React.ElementRef<typeof Select.Item>;
type SelectItemProps = React.ComponentPropsWithoutRef<typeof Select.Item>;

const SelectItem = React.forwardRef<SelectItemRef, SelectItemProps>(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<Select.Item
				className={classnames(
					"relative flex select-none items-center rounded px-8 py-2 text-sm text-gray-900 outline-none data-[highlighted]:bg-gray-100 data-[disabled]:text-gray-300",
					className,
				)}
				{...props}
				ref={forwardedRef}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className="absolute left-2 inline-flex items-center">
					<CheckIcon />
				</Select.ItemIndicator>
			</Select.Item>
		);
	},
);
SelectItem.displayName = "SelectItem";

export default SelectDemo;
