import Widget from "../components/dashboard/widget";
import MainLayout from "../components/shared/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { SearchNormal1 } from "iconsax-react";

const Dashboard = () => {
  return <MainLayout>

    <div className="flex items-center justify-between">
    <h2 className="text-xl">Dashboard</h2>
    
    <div className="flex items-center space-x-4">
      {/* Search  */}
    <div className="flex items-center border rounded-lg px-4">
    <SearchNormal1 size={18} className="text-gray-400" />
     <Input type="text" className=" focus-visible:ring-0 border-none shadow-none placeholder:text-gray-400" placeholder="Search here"/>
    </div>

    {/* user avatar  */}
    <Avatar className="h-8 w-8">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </div>
    </div>


    {/* widgets  */}
    <div className="grid grid-cols-4  gap-4 my-10">
      <Widget color="#92de8c" heading="Revenue" percent={55} amount={1200}/>
      <Widget value={400} color="#8C78EA" heading="Users" percent={-22} />
      <Widget value={25000} color="#ffe27d" heading="Transactions" percent={60}/>
      <Widget value={1000} color="#FBD3F5" heading="Products" percent={80}/>
    </div>


    {/* graph  */}
    <div>
      {/* bar graph  */}


      category item progress 
    </div>
    </MainLayout>;
};

export default Dashboard;