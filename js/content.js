addElements();

/**
 * ページを読み込んだ時に発行先の組織？をページ左上部に表示させる
 */
/* WARNING: おそらくBootstrapのCSS関係で一部のサイトにてnavbarのレイアウトが崩れる */
function addElements() {
    if (!addButtons('Hello!')) {
        setTimeout(addElements, 500); // retry after 500 milliseconds
    } else {
        removeButtonsAfterFewSeconds(5);
    }
}

/**
 * ページの左上部に指定されたテキストが表示されるボタンを追加する
 * @param {String} printText ボタンに表示するテキスト
 * @returns {boolean} ボタン追加成功 or 失敗
 */
function addButtons(printText) {
    if (!($('body').length)) return false; // the html was not ready yet

    let btn = $('<button>', { type: 'button', id: 'printOrg', class: 'btn btn-success', text: printText });
    $('body').prepend(btn);

    return true;
}

/**
 * 追加されたボタンを指定した秒数後に削除する
 * @param {Number} seconds 削除する秒数
 * @returns {Boolean} ボタン削除成功 or 失敗
 */
function removeButtonsAfterFewSeconds(seconds) {
    if (!($('#printOrg').length)) {
        console.log("The element does not exist.")
        return false;
    }
    window.setTimeout(() => {
        $('#printOrg').fadeOut(1000, function () {
            $(this).remove();
        });
        console.log("The element removed.")
    }, seconds * 1000);
    return true;
}
