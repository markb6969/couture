function toggleMenu() {
    const dropdownMenu = document.getElementById("dropdown-menu");
    if (dropdownMenu.classList.contains("hidden")) {
        dropdownMenu.classList.remove("hidden");
        dropdownMenu.style.maxHeight = "600px"; // Adjust height as needed
    } else {
        dropdownMenu.classList.add("hidden");
        dropdownMenu.style.maxHeight = "0px";
    }
}