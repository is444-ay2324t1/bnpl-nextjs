import Sidebar from "./Sidebar";
import { TailwindIndicator } from "./TailwindIndicator";
import { Toaster } from "./ui/Toaster/Toaster";

interface LayoutProps {
  children?: React.ReactElement[] | React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-auto">
      <Sidebar />
      <div className="grow overflow-y-auto overflow-x-hidden">
        <div className="mx-auto max-w-2xl h-full px-5 pt-14 pl-0 md:pl-5 lg:max-w-4xl xl:max-w-6xl">
          {children}
        </div>
      </div>
      <Toaster />
      <TailwindIndicator />
    </div>
  );
}
