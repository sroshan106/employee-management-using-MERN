export default function authHeader() {
    const user = localStorage.getItem('token');
    if (user ) {
      return { 'x-access-token': user };
    } else {
      return {};
    }
}