import ContentNav from "./courseContentNavigation.js";

const node = document.querySelector('.content-tab1');
const currSection = document.querySelector('.overview-content');
new ContentNav(node, currSection);