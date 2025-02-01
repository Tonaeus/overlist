const formatToLocalDate = (utcDateString: string) => {
  return new Date(utcDateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

export {
  formatToLocalDate
}