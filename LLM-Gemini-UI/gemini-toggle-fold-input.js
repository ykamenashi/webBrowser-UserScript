/*
名前 トグルボタンでGeminiのプロンプトを消す
対象URL https://gemini.google.com/app/*

ボタン操作で入力フォームを出したり閉じたりする
*/

(function() {
    // 既存のトグルボタンがなければ作成
    let toggleButton = document.getElementById('gemini-prompt-toggle-button');
    if (!toggleButton) {
        toggleButton = document.createElement('button');
        toggleButton.id = 'gemini-prompt-toggle-button';
        toggleButton.textContent = 'プロンプトを隠す'; // 初期状態
        Object.assign(toggleButton.style, {
            position: 'fixed',
            top: '10px',        // 上からの距離
            left: '50%',        // 左から50%の位置
            transform: 'translateX(-50%)', // 要素自身の幅の半分だけ左にずらして中央揃え
            zIndex: '10000',
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        });
        document.body.appendChild(toggleButton);
    }

    // プロンプトコンテナ要素を見つける関数
    const findPromptContainer = () => {
        let container = document.querySelector('.query-editor-wrapper');
        if (container) {
            while (container && !container.classList.contains('prompt-input-container') && container.parentElement) {
                if (container.parentElement.scrollHeight > container.parentElement.clientHeight + 50) {
                    return container.parentElement;
                }
                container = container.parentElement;
            }
        }
        const potentialContainers = document.querySelectorAll('div[data-response-id][data-llat-role="user"]');
        if (potentialContainers.length > 0) {
            return potentialContainers[potentialContainers.length - 1];
        }
        const textarea = document.querySelector('textarea.query-editor');
        if (textarea) {
            let parent = textarea.parentElement;
            while(parent && !parent.classList.contains('md-block')) {
                parent = parent.parentElement;
            }
            return parent;
        }
        return document.querySelector('.prompt-input-container') ||
               document.querySelector('.input-area') ||
               document.querySelector('.user-query-input');
    };

    let promptContainer = findPromptContainer();

    // トグル状態を管理 (ボタンのテキストと合わせる)
    let isPromptHidden = false;

    // トグル関数
    const togglePrompt = function() {
        if (!promptContainer) {
            promptContainer = findPromptContainer();
            if (!promptContainer) {
                console.error('Gemini入力プロンプトコンテナが見つかりませんでした。');
                return;
            }
        }

        if (isPromptHidden) {
            promptContainer.style.display = '';
            toggleButton.textContent = 'プロンプトを隠す';
            console.log('Gemini入力プロンプトが表示されました。');
        } else {
            promptContainer.style.display = 'none';
            toggleButton.textContent = 'プロンプトを表示';
            console.log('Gemini入力プロンプトが非表示になりました。');
        }
        isPromptHidden = !isPromptHidden;
    };

    // ボタンにイベントリスナーを設定
    toggleButton.onclick = togglePrompt;

    console.log('Geminiプロンプトトグルボタンが追加されました。');
})();
