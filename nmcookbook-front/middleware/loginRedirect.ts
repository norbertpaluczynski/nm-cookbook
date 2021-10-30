export default function (context: any) {
  console.log(context)
  if (context.route.fullPath.includes('login')) {
    context.$auth.loginWith('keycloak')
  }
  if (context.route.fullPath.includes('undefined')) {
    context.redirect('/')
  }
}
