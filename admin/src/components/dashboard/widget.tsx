import { TrendingDown, TrendingUp } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

type Props = {
  color: string;
  heading: string;
  value?: number;
  percent: number;
  amount?: number;
};

const Widget = ({ color, heading, value, percent, amount }: Props) => {
  return (
    <div className="border flex justify-between items-center rounded-lg max-w-80 p-6">
      <div className="space-y-2">
        <h4 className="font-light text-gray-500">{heading}</h4>
        <h2 className="text-2xl font-semibold">{amount ? <span>$ {amount}</span> : <span>{value}</span>}</h2>

        {percent> 0 ? (
          <span className="flex items-center text-green-500 gap-1">
            <TrendingUp size={15} />+{percent}%
          </span>
        ) : (
          <span className="flex items-center text-red-500 gap-1">
            <TrendingDown size={15} /> <p className="">{percent}%</p>
          </span>
        )}
      </div>

      {/* radialProgress  */}
     <div className="h-24 w-24">
     <CircularProgressbar
        value={Math.abs(percent)}
        text={`${Math.abs(percent)}%`}
        styles={buildStyles({
          textColor:color,
        pathColor:color,
        trailColor: "#eeeff3"
        })}/>
     </div>
    </div>
  );
};

export default Widget;
