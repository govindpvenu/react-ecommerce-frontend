import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin size-20">
        <Loader className="size-20" />
      </div>
    </div>
  );
}
