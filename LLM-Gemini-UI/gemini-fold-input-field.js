/*
名前 Geminiの入力欄を自動的に隠す・出す
対象URL https://gemini.google.com/app/*

TODO 変数bottomPointがマジックナンバーになってるので、環境に合わせて動的に生成する
*/

window.setTimeout(function(){
  userscriptMain();
}, 3000);

const userscriptMain = ()=>{
    // Geminiの入力欄要素
    const el = document.querySelector('input-container');
    // Geminiのスクロールコンテナ要素
    const ct = document.querySelectorAll('infinite-scroller')[1];
    // ct.scrollTop : 現在位置
    
    const hideUI = ()=>{
        el.style.display = 'none';
    }
    
    const showUI = ()=>{
        el.style.display = 'block';
    }
    
    const html = document.querySelector('html');
    const bodyHeight = ct.scrollHeight; // bodyの高さを取得
    const windowHeight = window.innerHeight; // windowの高さを取得
    const bottomPoint = bodyHeight - 854; // ページ最下部までスクロールしたかを判定するための位置を計算
    
    hideUI();
    
    ct.addEventListener('scroll', () => {
        let currentPos = ct.scrollTop; // スクロール量を取得
        //console.log('scrolled');
        if (bottomPoint <= currentPos) { // スクロール量が最下部の位置を過ぎたかどうか
            showUI();
        } else {
            hideUI();
        }
    })
}