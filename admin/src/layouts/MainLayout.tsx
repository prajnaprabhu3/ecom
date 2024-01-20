import Sidebar from "../components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5">{children}</div>
    </div>
  );
};

export default MainLayout;
