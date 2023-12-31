import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  CircleDollarSign,
  Gauge,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { SidebarItemType } from "@/types";
import { MenuButton } from "./Menu";
import SidebarItem from "./SidebarItem";
import { ProfileDropdownMenu } from "./ProfileDropDownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export const sidebarLinks: SidebarItemType[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Gauge />,
  },
  {
    title: "Add Order",
    href: "/add-order",
    icon: <CircleDollarSign />,
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useRouter();
  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-fit"
        } relative hidden content-between border-r border-border bg-muted p-2 pb-8 duration-300 sm:grid`}
      >
        <ChevronRight
          className={cn(
            "absolute -right-11 top-3 h-auto w-fit cursor-pointer rounded-3xl border p-1.5 text-primary hover:bg-muted",
            { hidden: open }
          )}
          onClick={() => setOpen(!open)}
        />
        <ChevronLeft
          className={cn(
            "absolute -right-11 top-3 h-auto w-fit cursor-pointer rounded-3xl border p-1.5 text-primary hover:bg-muted",
            { hidden: !open }
          )}
          onClick={() => setOpen(!open)}
        />
        <div>
          <h1 className="w-full p-2 text-center text-xl font-bold text-primary">
            {open ? "T-Buy" : "T-B"}
          </h1>
          <ul className="flex flex-col gap-y-2 pt-3">
            {sidebarLinks.map((link, index) => (
              <SidebarItem
                link={link}
                open={open}
                location={location}
                key={index}
              />
            ))}
          </ul>
        </div>

        <ProfileDropdownMenu>
          <div className="flex items-center gap-x-2 rounded-lg px-2 py-1 font-normal text-foreground hover:bg-border">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback className="border-2 bg-primary-foreground">
                A
              </AvatarFallback>
            </Avatar>
            {open ? (
              <div className="text-left">
                <p className="text-sm font-medium leading-none">
                  Alan Megargel
                </p>
                <p className="text-sm text-muted-foreground">alan@smu.edu.sg</p>
              </div>
            ) : null}
          </div>
        </ProfileDropdownMenu>
      </div>
      {/* Mobile Menu */}
      <div className="h-fit pl-1 pt-3 sm:hidden">
        <MenuButton />
      </div>
    </>
  );
};

export default Sidebar;
