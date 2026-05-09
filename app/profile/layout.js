import AuthProvider from "@/components/partials/providers/AuthProvider";
import SidebarProfile from "@/components/templates/Profile/SidebarProfile";

export default function ProfileLayout({ children }) {
  return (
    <AuthProvider>
      <div className="container mx-auto py-10 flex gap-8">
        <SidebarProfile />

        <div className="flex-1">{children}</div>
      </div>
    </AuthProvider>
  );
}
