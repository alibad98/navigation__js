/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
*/

let navbarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
// filling the navbar with list items each one represent a section.
// Build menu
function buildNavbar() {
    sections.forEach((element)=>{
        let listItem = document.createElement("li");
        listItem.classList.add("navbar__list__item");
        let sectionName = element.getAttribute("data-nav");
        let currentSectionId = element.getAttribute("id");
        listItem.innerHTML = `<a href="#${currentSectionId}" class="nav__hyperlink">${sectionName}</a>`;
        navbarList.appendChild(listItem);
    });
}


//function to determine if the section is in viewport.
function isInViewport(elem) {
    let Position = elem.getBoundingClientRect();
    return (
        //changes made to fix the active section highlighting issue on smaller devises.
        Position.top >= -300 &&
		Position.left >= 0 &&
		Position.bottom <= (1.5 * window.innerHeight || document.documentElement.clientHeight) &&
		Position.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

//apply the same active class technique to the navigation items.
function deactivateNav() {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    navbarAnchors.forEach((section)=>{
        section.classList.remove("active-nav");
    });
}

//Function to remove active classes
function deactivateSec() {
    sections.forEach((section)=>{
        section.classList.remove("your-active-class", "active");
    });
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
buildNavbar()
// Add class 'active' to section when near top of viewport
function activateSec(sec) {
    sec.classList.add("your-active-class", "active");

    deactivateNav();
    activateNav(sec.getAttribute('id'));
}

function activateNav(secId) {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
        navbarAnchors.forEach((section)=>{
            if(section.getAttribute('href') == `#${secId}`) {
                section.classList.add("active-nav");
            }
        });
}

// Scroll to anchor ID using scrollTO event

function scrollToAnchor() {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    navbarAnchors.forEach((element) => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(element.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/


// Scroll to section on link click
scrollToAnchor();

// Set sections as active
window.addEventListener('scroll', function (event) {
	event.preventDefault();
	
    sections.forEach((sec) => {
        if (isInViewport(sec)) {
            deactivateSec();
            activateSec(sec);
        } else if(window.scrollY==0) {
            deactivateSec();
            deactivateNav();
        }
    });
});