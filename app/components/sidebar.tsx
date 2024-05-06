import Image from "next/image";
import Sidebarheader from "./ui/sidebar/sidebar-header";
import FileUpload from "./ui/sidebar/fileupload";

export default function Sidebar() {
  return (
    <div className="w-[22%] space-y-4 max-w-5xl h-full">
    <div className="rounded-xl w-full h-full bg-slate-100 shadow-xl flex flex-col items-center p-5 space-y-4">
        <Sidebarheader/>
        <FileUpload/>
    </div>
</div>
  );
}
