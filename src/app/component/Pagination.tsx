"use client"
import { ArrowLeftIcon, ArrowRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import {Text, Flex, Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props{
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

export default function Pagination({itemCount, pageSize, currentPage}: Props){
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const pageCount = Math.ceil(itemCount / pageSize);
    if(pageCount <= 1) return null;
    
    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    }

    return(
        <>
        <Flex className="items-center gap-3">
            <Text>Page {currentPage} of {pageCount}</Text>
            <Button variant="soft" disabled={currentPage === 1} onClick={()=>changePage(1)}>
                <DoubleArrowLeftIcon ></DoubleArrowLeftIcon>
            </Button>



            <Button variant="soft" disabled={currentPage === 1} onClick={()=>changePage(currentPage - 1)}>
            <ArrowLeftIcon></ArrowLeftIcon>
            </Button>


            <Button variant="soft" disabled={currentPage === pageCount} onClick={()=>changePage(currentPage + 1)}>
            <ArrowRightIcon></ArrowRightIcon>
            </Button>


            <Button variant="soft" disabled={currentPage === pageCount} onClick={()=>changePage(pageCount)}>
            <DoubleArrowRightIcon></DoubleArrowRightIcon>
            </Button>
        </Flex>
        </>
    )
}   