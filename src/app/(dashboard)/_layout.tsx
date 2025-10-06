import useFetchAuth from "@/src/entities/auth/hook/useFetchUser";
import DashboardNavigation from "@/src/entities/dashboard/DashboardNavigation";
export default function DashboardLayout() {
  const { data, error, isLoading } = useFetchAuth();
  console.log("--errors", data);
  return <DashboardNavigation />;
}
