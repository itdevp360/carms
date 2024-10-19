import { FaBullhorn } from "react-icons/fa6";

export default function AddFeedback({onClick=()=>{}}){
  return (
    <span onClick={onClick} 
      className="mt-2 w-full flex items-center justify-center cursor-pointer py-2 rounded bg-[#ffaf54d6] mb-2 hover:bg-[#f99d35d6] w-12">
      <FaBullhorn />
    </span>
  );
}