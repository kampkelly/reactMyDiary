export const checkNotice = () => {
  const pageUrl = window.location.href;
  const url = new URL(pageUrl);
  const notice = url.searchParams.get('notice');
  if (notice) {
    if (notice.length >= 1) {
      document.querySelector('#flash-message').style.display = 'block';
      document.querySelector('#flash-message p').textContent = notice;
      if (url.searchParams.get('warning')) {
        document.querySelector('#flash-message').style.backgroundColor = '#e00a1e';
      }
    }
  }
}