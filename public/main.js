const closeBtn = document.getElementById("btn_close");
const sideBar = document.getElementById("sidebar");
const closeBtbIcon = closeBtn.querySelector("i");




closeBtn.addEventListener("click", ()=>{
      sideBar.classList.toggle("open")

      const isOpen = sideBar.classList.contains("open");

      closeBtbIcon.setAttribute("class" , isOpen ? "ri-arrow-right-double-line": "ri-close-circle-line" )

});

