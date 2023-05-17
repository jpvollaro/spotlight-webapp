export function copyToClipboard(url) {
  const copiedElement = document.createElement('textarea');
  copiedElement.style.position = 'fixed';
  copiedElement.style.left = '0';
  copiedElement.style.top = '0';
  copiedElement.style.opacity = '0';
  copiedElement.value = url;
  document.body.appendChild(copiedElement);
  copiedElement.focus();
  copiedElement.select();
  document.execCommand('copy');
  document.body.removeChild(copiedElement);
}
