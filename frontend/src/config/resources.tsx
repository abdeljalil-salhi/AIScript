// Dependencies
import { IResourceItem } from "@refinedev/core";
import { DashboardOutlined, ProjectOutlined } from "@ant-design/icons";

/**
 * This is the list of resources that will be available in the dashboard.
 */
export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "tasks",
    list: "/tasks",
    create: "/tasks/new",
    edit: "/tasks/edit/:id",
    meta: {
      label: "Tasks",
      icon: <ProjectOutlined />,
    },
  },
];
