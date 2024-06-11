import Sidebar from "../sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6 p-5 px-8">{children}</div>
    </div>
  );
};

export default MainLayout;
