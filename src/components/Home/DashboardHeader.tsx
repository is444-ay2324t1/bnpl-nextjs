import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "../ui/Badge";
import { PortfolioModal } from "../PortfolioModal";
import { formatPercentage, formatUsd } from "@/utils/functions";
import { TotalCreditChart } from "./TotalCreditChart";

export const DashboardHeader = () => {
  const [showBalance, setShowBalance] = useState(true);

  const [userCreditData, setuserCreditData] = useState({
    availableCredit: 1200,
    totalCredit: 2000,
  });
  return (
    <div className="space-y-= rounded-lg bg-white">
      <h2 className="text-2xl font-semibold text-primary">BNPL Dashboard</h2>

      <div className="space-y-2">
        {/* Balance */}
        <div className="flex gap-x-2">
          <p className="text-lg text-foreground">Available Credit</p>
          <div className="flex cursor-pointer items-center">
            {/* Toggle visibility of balance */}
            <div
              className={`${showBalance ? "bg-opacity-100" : "bg-opacity-20"}`}
              onClick={() => setShowBalance(!showBalance)}
            >
              <Image src="/eye-icon.png" alt="" width={20} height={20} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {showBalance ? (
            <p className="text-2xl font-bold tracking-wider text-black sm:text-3xl">
              {formatUsd(userCreditData.availableCredit)}
            </p>
          ) : (
            <p className="text-2xl font-bold text-black sm:text-3xl">
              •••••••••
            </p>
          )}
        </div>
        <div className="text-gray-500 italic text-small">
          Total Credit: {formatUsd(userCreditData.totalCredit)}
        </div>
      </div>
    </div>
  );
};
