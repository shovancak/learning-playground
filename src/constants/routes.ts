enum RouteName {
  LandingPage = 'LandingPage',
  SignUp = 'SignUp',
  SignIn = 'SignIn',
  Dashboard = 'Dashboard',
}

export const Routes = {
  [RouteName.LandingPage]: () => '/',
  [RouteName.SignUp]: () => '/sign-up/',
  [RouteName.SignIn]: () => '/sign-in/',
  [RouteName.Dashboard]: () => '/dashboard/',
}
