import type { IUser } from "../../../stores/global-store";
import {
  SidebarContent,
  SidebarContentItem,
  admin,
  user as User,
  reseller,
} from "./sidebar-contents";

export function detectSidebar(
  user: IUser | null
): (SidebarContent | SidebarContentItem)[] {
  if (!user) {
    return [];
  }
  const { role } = user;
  switch (role) {
    case "ADMINISTRATOR": {
      return admin;
    }
    case "RESELLER": {
      return reseller;
    }
    default: {
      return User;
    }
  }
}
