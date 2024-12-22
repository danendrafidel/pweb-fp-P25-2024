const formattedCurrentDate = new Date(Date.now()).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).split(',')[0].split('/').reverse().join('-') + 
    ' ' + 
    new Date(Date.now()).toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });

module.exports = formattedCurrentDate