export function getUser(): string {
  const user = localStorage.getItem('user');
  return user || '';
}
