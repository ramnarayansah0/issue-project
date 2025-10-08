import Image from "next/image";
import Pagination from "./component/Pagination";

export default function Home() {
  return (
    <>
    <div>home page </div>
    <Pagination itemCount={100} pageSize={10} currentPage={1}/> 
    </>

  );
}
