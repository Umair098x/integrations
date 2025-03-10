export function getRoutes(type, param) {
  const routes = [
    //========== visitor routes ========
    {
      name: "Home",
      path: `/`,
      type: "visitor",
    },
    {
      name: "Roadmap",
      path: `/roadmap`,
      type: "visitor",
    },
    {
      name: "Blogs",
      path: `/blog`,
      type: "visitor",
    },
    {
      name: "Signup",
      path: `/signup`,
      type: "visitor",
    },
    {
      name: "Signin",
      path: `/signin`,
      type: "visitor",
    },
    //========== sidebar routes ========

    {
      icon: "bi bi-speedometer2",
      name: "Dashboard",
      path: `/`,
      type: "sidebar",
    },
    {
      icon: "bi bi-tag",
      name: param?.isFreePlanActivated ? "Pricing" : "Manage Subscription",
      path: param?.isFreePlanActivated ? "/pricing" : "",
      to: param?.isFreePlanActivated ? null : param?.upgradePlan,
      type: "sidebar",
    },
    //========== routes ========
    {
      name: "Change Password",
      path: `/change-password`,
    },
  ].filter((r) => (type ? r?.type == type : r));

  return routes;
}
