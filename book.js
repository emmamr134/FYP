document.getElementById("cast-btn").addEventListener("click", () => {
    document.getElementById("cast-popup").classList.remove("hidden");
  });
  
  function closeCast() {
    document.getElementById("cast-popup").classList.add("hidden");
  }
  
  function openTab(tabId) {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
  
    tabs.forEach(tab => tab.classList.remove("active"));
    contents.forEach(content => content.classList.add("hidden"));
  
    document.querySelector(`.tab[onclick*="${tabId}"]`).classList.add("active");
    document.getElementById(tabId).classList.remove("hidden");
  }
  