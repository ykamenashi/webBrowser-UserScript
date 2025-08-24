/*
名前 スプシでCtrl-G無効化
対象URL https://docs.google.com/spreadsheets/d/*

背景 MacでAquaSKKを使っていて、変換の中断のためにctrl-Gを押すと、それがスプシの「行を移動」コマンドに吸われてしまい、未確定文字列が確定されてしまう。この非常に不快な動作を改善する。
*/

( function () {
'use strict';
document .addEventListener('keydown', function (e) {
// Ctrlキーと'G'キーが同時に押された場合
    if (e.ctrlKey && e.key.toLowerCase() === 'g'
    ) {
      e.stopImmediatePropagation(); // イベントの 伝播をここで完全に停止
    }
  }, true ); // イベントをキャプチャフェーズで捕捉するためにtrueを指定
})();