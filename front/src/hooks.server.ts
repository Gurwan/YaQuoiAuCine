import { ADMIN_AUTH_PASSWORD, ADMIN_AUTH_USER } from "$env/static/private";

export const handle = async ({ event, resolve }) => {
  const protectedRoutes = ['/admin'];

  if (protectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
    const auth = event.request.headers.get('authorization');

    if (!auth || !auth.startsWith('Basic ')) {
      return new Response('Authentification requise', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secured Area"'
        }
      });
    }

    const base64Credentials = auth.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [user, pass] = credentials.split(':');

    if (
      user !== ADMIN_AUTH_USER ||
      pass !== ADMIN_AUTH_PASSWORD
    ) {
      return new Response('Accès refusé', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secured Area"'
        }
      });
    }
  }

  return resolve(event);
};
