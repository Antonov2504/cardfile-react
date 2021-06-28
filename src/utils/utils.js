export const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.text();
}
