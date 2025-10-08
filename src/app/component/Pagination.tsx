import { ArrowLeftIcon, ArrowRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import {Text, Flex, Button } from "@radix-ui/themes";

interface Props{
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

export default function Pagination({itemCount, pageSize, currentPage}: Props){
    
    const pageCount = Math.ceil(itemCount / pageSize);
    if(pageCount <= 1) return null;

    return(
        <>
        <Flex className="items-center gap-3">
            <Text>Page {currentPage} of {pageCount}</Text>
            <Button variant="soft" disabled={currentPage === 1}>
                <DoubleArrowLeftIcon ></DoubleArrowLeftIcon>
            </Button>



            <Button variant="soft" disabled={currentPage === 1}>
            <ArrowLeftIcon></ArrowLeftIcon>
            </Button>


            <Button variant="soft" disabled={currentPage === pageCount}>
            <ArrowRightIcon></ArrowRightIcon>
            </Button>


            <Button variant="soft" disabled={currentPage === pageCount}>
            <DoubleArrowRightIcon></DoubleArrowRightIcon>
            </Button>
        </Flex>
        </>
    )
}   