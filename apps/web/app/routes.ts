import {
  index,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("home", "routes/home.tsx"),
  ...prefix("packages", [route(":scope?/:name", "routes/packages.$name.tsx")]),
] satisfies RouteConfig;
