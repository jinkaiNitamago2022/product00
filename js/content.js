addElements();

/**
 * ページを読み込んだ時に発行先の組織？をページ左上部に表示させる
 */
function addElements() {
    if (!addButtons()) {
        setTimeout(addElements, 500); // 追加できなかったら0.5秒に再度試す
    }
}

/**
 * ページの左上部に指定されたテキストが表示されるボタンを追加する
 * @returns {boolean} ボタン追加成功 or 失敗
 */
function addButtons() {
    if (!($('body').length)) return false; // htmlのbodyがなければ追加をやめる

    let request = {
        type: "getCommonNameAndOrganization",
        value: ""
    };
    chrome.runtime.sendMessage(request, (receive) => {
        console.log(receive)
        if (!receive.print_flag) { // ドメインが同じなら何もせずに正常終了
            return true;
        }

        // organizationが不明なら簡易的な警告を出す
        let printText = receive.organization;
        if (receive.organization == "unknown") {
            printText = "組織が不明です。"
        }

        let btn = $('<button>', { type: 'button', id: 'printOrg', text: printText });
        $('body').prepend(btn);

        // 5秒後に追加したボタンを削除する
        if (!removeButtonsAfterFewSeconds(5)) {
            setTimeout(function () { removeButtonsAfterFewSeconds(5); }, 500); // 削除できなかったら0.5秒に再度試す
        }
    });

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
    } // 追加されたボタンがない場合

    // 指定された秒数だけ待ったあと，フェードアウトしながら削除する
    window.setTimeout(() => {
        $('#printOrg').fadeOut(1000, function () {
            $(this).remove();
        });
        console.log("The element removed.")
    }, seconds * 1000);
    return true;
}
