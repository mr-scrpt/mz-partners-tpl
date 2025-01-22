import $ from "jquery";
$(document).ready(() => {
  /* Настройки */
  const mainClass = `block-s`;
  /* Настройки КОНЕЦ*/

  const $menuCollection = $(`.${mainClass}`);
  $menuCollection.each((idx, item) => {
    const $menu = $(item);
    let mobileSize = $(item).attr("data-adaptive-width");
    const $inner = $menu.children(`.${mainClass}__inner`);
    const $body = $inner.children(`.${mainClass}__body`);
    const $controller = $menu.find(`.${mainClass}__controller`);
    clearClassAndStyle($menu, $body, mainClass, mobileSize);
    controllMenu($controller, mainClass, mobileSize);
    closeOutsideMenu($body, mainClass);
    adaptiveMode(mobileSize, $body);
    offsetBody($inner, $body, mobileSize);

    $(window).resize(() => {
      mobileSize = $(item).attr("data-adaptive-width");
      clearClassAndStyle($menu, $body, mainClass, mobileSize);
      adaptiveMode(mobileSize, $body);
      offsetBody($inner, $body, mobileSize);
      controllMenu($controller, mainClass);
    });
  });
});

const checkMobileMode = (mobileSize) => {
  let width = getSize();
  if (width < mobileSize) {
    return true;
  }
  return false;
};

const offsetBody = ($inner, $body, mobileSize) => {
  const mode = checkMobileMode(mobileSize);
  let width = getSize();
  if (mode) {
    const height = $inner.outerHeight();
    $body.css({ top: height });
    console.log("-> set height", width);
  } else {
    $body.css({ top: "auto" });
    console.log("-> unset height", width);
  }
};

const adaptiveMode = (mobileSize, $body) => {
  const mode = checkMobileMode(mobileSize);
  if (!mode) {
    $body.css({ position: "relative", transform: "translateX(0)" });
  } else {
    $body.removeAttr("style");
  }
};

const controllMenu = ($controller, mainClass, mobileSize) => {
  $controller.on("click", (e) => {
    e.stopPropagation();
    console.log("-> click", mobileSize);
    const mode = checkMobileMode(mobileSize);
    console.log("-> mode in", mode);
    if (mode) {
      const $currentMenu = $(e.target).closest(`.${mainClass}`);

      $currentMenu.hasClass(`${mainClass}_open`)
        ? $currentMenu.removeClass(`${mainClass}_open`) &&
          $currentMenu.addClass(`${mainClass}_close`)
        : $currentMenu.removeClass(`${mainClass}_close`) &&
          $currentMenu.addClass(`${mainClass}_open`);
    }
  });
};

const closeOutsideMenu = ($body, mainClass) => {
  $body.on("click", (e) => {
    e.stopPropagation();
  });

  $("html").click(function () {
    const $openMenu = $(`.${mainClass}_open`);
    $openMenu.each(function (_, item) {
      $(item).hasClass(`${mainClass}_open`) &&
        $(item).removeClass(`${mainClass}_open`) &&
        $(item).addClass(`${mainClass}_close`);
    });
  });
};

const clearClassAndStyle = ($menu, $body, mainClass, mobileSize) => {
  let width = getSize();
  if (width >= mobileSize) {
    if ($menu.hasClass(`${mainClass}_close`)) {
      $menu.removeClass(`${mainClass}_close`);
    }

    if ($menu.hasClass(`${mainClass}_open`)) {
      $menu.removeClass(`${mainClass}_open`);
    }

    $body.removeAttr("style");
  }
};

const getSize = () => $(window).width();
