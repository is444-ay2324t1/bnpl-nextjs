import React, { useState } from "react";
import Image from "next/image";
import { formatUsd } from "@/utils/functions";
import { type } from "os";

export type DashboardHeaderProps = {
  loading: boolean;
  totalDue: number;
};

export const DashboardHeader = ({
  loading,
  totalDue,
}: DashboardHeaderProps) => {
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
              {loading ? "-" : formatUsd(2000 - totalDue)}
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
