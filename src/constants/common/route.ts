export default interface IRoute {
  path: string;
  exact: boolean;
  component: any;
  private?: boolean,
  unauthenticatedOnly?: boolean,
  redirectTo?: string
}