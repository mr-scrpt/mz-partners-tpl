import $ from "jquery";
$(document).ready(() => {
  const maxHeight = 160;
  const $box = $(".item-t");
  setHeightAttr($box);
  setHeightMax($box, maxHeight);
  handlerClick($box, maxHeight);
});

const setHeightAttr = ($box) => {
  $box.each((_, item) => {
    const $item = $(item);

    const $body = $item.find(".item-t__body");
    const height = $body.height();

    $body.attr("data-height", height);
  });
};

const setHeightMax = ($box, maxHeight) => {
  $box.each((_, item) => {
    const $item = $(item);
    const $body = $item.find(".item-t__body");
    $body.height(maxHeight);
  });
};

const handlerClick = ($box, maxHeight) => {
  $box.each((_, item) => {
    const $item = $(item);
    $item.on("click", () => {
      if (!$item.hasClass("item-t_open")) {
        $item.removeClass("item-t_close");
        $item.addClass("item-t_open");
        const toHeight = getHeightAttr($item);
        heightAnimationUp($item, toHeight);
      } else {
        $item.removeClass("item-t_open");
        $item.addClass("item-t_close");
        heightAnimationDown($item, maxHeight);
      }
    });
  });
};

const getHeightAttr = ($item) =>
  $item.find(".item-t__body").attr("data-height");

const setHeight = ($item, height) => {
  $item.find(".item-t__body").height(height);
};

const heightAnimationUp = async ($item, toHeight) => {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const $body = $item.find(".item-t__body");
  let startHeight = $body.height();

  while (startHeight < toHeight) {
    $body.height(startHeight);
    startHeight = startHeight + 2;
    await timer(1);
  }
};

const heightAnimationDown = async ($item, maxHeight) => {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const $body = $item.find(".item-t__body");

  let startHeight = $body.height();

  while (startHeight > maxHeight) {
    $body.height(startHeight);
    startHeight = startHeight - 2;
    await timer(1);
  }
};
