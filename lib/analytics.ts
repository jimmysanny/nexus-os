export const trackSource = () => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("ref") || "direct";
    localStorage.setItem("nexus_ref", source);
  }
};