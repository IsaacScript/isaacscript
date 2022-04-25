/* eslint-disable no-array-any/no-array-any */

const FIRST_DOC_PAGE_TITLE = "Features | IsaacScript";

const keyMap = new Map();

initHotkeys();

function initHotkeys() {
  initKeyMap();
  document.onkeydown = onKeyDown;
}

function initKeyMap() {
  keyMap.set("Enter", () => {
    if (isOnLandingPage()) {
      navigateForward();
    }
  });
  keyMap.set("ArrowLeft", navigateBackward);
  keyMap.set("ArrowRight", navigateForward);
  keyMap.set("f", () => {
    window.location = "/docs/function-signatures";
  });
}

function onKeyDown(event) {
  // Debugging
  // console.log("Key pressed:", e.key);

  // Do not do anything if we have any modifier keys pressed down
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
    return;
  }

  // Do not do anything if we have the search box focused
  if (isSearchBarFocused()) {
    return;
  }

  const keyFunction = keyMap.get(event.key);
  if (keyFunction !== undefined) {
    keyFunction();
  }
}

function isSearchBarFocused() {
  const searchInputElements =
    document.getElementsByClassName("DocSearch-Input");
  for (const searchInputElement of searchInputElements) {
    if (document.activeElement === searchInputElement) {
      return true;
    }
  }

  return false;
}

function navigateBackward() {
  if (isOnLandingPage()) {
    return;
  }

  if (isOnFirstDocPage()) {
    clickOnNavBarTitle();
    return;
  }

  clickFirstNavButton();
}

function navigateForward() {
  if (isOnLandingPage()) {
    clickOnFirstLandingPageButton();
    return;
  }

  clickSecondNavButton();
}

function isOnFirstDocPage() {
  return document.title === FIRST_DOC_PAGE_TITLE;
}

function isOnLandingPage() {
  const titles = document.getElementsByClassName("hero__title");
  return titles.length >= 1;
}

function clickOnNavBarTitle() {
  const navBarTitle = document.getElementsByClassName("navbar__title");
  const navBarTitleElement = navBarTitle[0];
  if (navBarTitleElement !== undefined) {
    navBarTitleElement.click();
  }
}

function clickOnFirstLandingPageButton() {
  const buttons = document.getElementsByClassName("button--lg");
  const firstButton = buttons[0];
  if (firstButton === undefined) {
    return;
  }

  firstButton.click();
}

function clickFirstNavButton() {
  clickNavButton(0);
}

function clickSecondNavButton() {
  clickNavButton(1);
}

function clickNavButton(i) {
  const navButtonsCollection =
    document.getElementsByClassName("pagination-nav");
  const navButtons = navButtonsCollection[0];
  if (navButtons === undefined) {
    return;
  }

  const buttonDiv = navButtons.children[i];
  if (buttonDiv === undefined) {
    return;
  }

  const buttonLink = buttonDiv.children[0];
  if (buttonLink === undefined) {
    return;
  }

  buttonLink.click();
}
