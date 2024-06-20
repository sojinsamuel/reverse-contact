import SidebarMain from "@/app/ui/sidebar/sidebar-main";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex space-x-5  ">
      <SidebarMain />
      <div className="ring-2  p-5 w-full">{children}</div>
    </div>
  );
}
