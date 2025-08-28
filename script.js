document.querySelectorAll('input[type=radio][name^="item-"]').forEach(input => {
  input.addEventListener('change', function() {
    const name = this.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(i =>
      i.closest('label.selectable-item')?.classList.remove('selected')
    );
    this.closest('label.selectable-item')?.classList.add('selected');
  });
});

       document.getElementById('save-button').addEventListener('click', function() {
    // 取得背景圖片元素與其他UI元素
    const bgImg = document.getElementById('wrap-bg-img'); // 預設在wrap內的背景img，需自行新增
    const youtubePlayer = document.getElementById('youtube-player2');
    const saveButton = document.getElementById('save-button');
    const tabBox = document.querySelector('.tabBox');
    const items = document.querySelectorAll('.item');

    // 保存當前完整狀態
    const currentState = {
        youtubePlayerDisplay: youtubePlayer.style.display || 'block',
        saveButtonDisplay: saveButton.style.display || 'block',
        tabBoxDisplay: tabBox.style.display || 'flex',
        checkedTab: document.querySelector('input[name="tab"]:checked')?.id || null,
        selectedItems: []
    };

    // 儲存目前選中的所有項目
    const allInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    allInputs.forEach(input => {
        if (input.checked) {
            currentState.selectedItems.push({
                id: input.id,
                name: input.name,
                type: input.type,
                checked: true
            });
        }
    });

    // 顯示背景圖確保被截取
    if (bgImg) {
        bgImg.style.display = 'block';
    }

    // 隱藏其它 UI 干擾項目
    youtubePlayer.style.display = 'none';
    saveButton.style.display = 'none';
    tabBox.style.display = 'none';
    items.forEach(item => item.style.display = 'none');

    // 恢復 UI 函數
    const restoreUI = () => {
        if (bgImg) bgImg.style.display = 'none';

        youtubePlayer.style.display = currentState.youtubePlayerDisplay;
        saveButton.style.display = currentState.saveButtonDisplay;
        tabBox.style.display = currentState.tabBoxDisplay;

        items.forEach(item => item.style.display = '');

        // 恢復所有選中的項目狀態及其視覺選中效果
        currentState.selectedItems.forEach(itemState => {
            const input = document.getElementById(itemState.id);
            if (input) {
                input.checked = itemState.checked;
                const labelImg = document.querySelector(`label[for="${itemState.id}"] img`);
                if (labelImg) {
                    labelImg.classList.add('selected-item');
                }
            }
        });

        // 恢復選項卡狀態
        if (currentState.checkedTab) {
            const checkedInput = document.getElementById(currentState.checkedTab);
            if (checkedInput) {
                checkedInput.checked = true;
            }
        }
    };

    // 使用 html2canvas 截圖 #wrap
    html2canvas(document.getElementById('wrap'), {
        useCORS: true,
        scale: 2,
        logging: false
    }).then(canvas => {
        restoreUI();
        const link = document.createElement('a');
        link.download = 'outfit.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(error => {
        console.error('截圖失敗:', error);
        restoreUI();
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // 支持單選的類別
    const radioCategories = ['item-hair', 'item-emoji', 'item-top', 'item-bottom', 'item-acc_B', 'item-all'];

    radioCategories.forEach(category => {
        const inputs = document.querySelectorAll(`input[name="${category}"]`);
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                if (input.type === 'radio') {
                    // 單選：先移除全部同類項目的選中樣式
                    const categoryName = category.replace('item-', '');
                    const allLabels = document.querySelectorAll(`label[for^="${categoryName}"] img`);
                    allLabels.forEach(img => {
                        img.classList.remove('selected-item');
                    });
                    // 新選項加藍色邊框
                    if (this.checked) {
                        const labelImg = document.querySelector(`label[for="${this.id}"] img`);
                        if (labelImg) {
                            labelImg.classList.add('selected-item');
                        }
                    }
                } else if (input.type === 'checkbox') {
                    // 多選：獨立添加/移除選中樣式
                    const labelImg = document.querySelector(`label[for="${this.id}"] img`);
                    if (labelImg) {
                        if (this.checked) {
                            labelImg.classList.add('selected-item');
                        } else {
                            labelImg.classList.remove('selected-item');
                        }
                    }
                }
            });

            // 初始化時設定正確的選中狀態
            if (input.checked) {
                const labelImg = document.querySelector(`label[for="${input.id}"] img`);
                if (labelImg) {
                    labelImg.classList.add('selected-item');
                }
            }
        });
    });

    // 原先支持的配件A 多選
    const accACheckboxes = document.querySelectorAll('input[name="item-acc_A"]');
    accACheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const labelImg = document.querySelector(`label[for="${this.id}"] img`);
            if (labelImg) {
                if (this.checked) {
                    labelImg.classList.add('selected-item');
                } else {
                    labelImg.classList.remove('selected-item');
                }
            }
        });
        if (checkbox.checked) {
            const labelImg = document.querySelector(`label[for="${checkbox.id}"] img`);
            if (labelImg) {
                labelImg.classList.add('selected-item');
            }
        }
    });
});
document.querySelector('input[name="item-all"]').addEventListener('change', function(e){
  if(e.target.checked){
    document.querySelectorAll('input[name^="item-top"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name^="item-bottom"]').forEach(input => input.checked = false);
  }
});

// 選擇全身的任何item時，取消上衣和下裝的所有選取
document.querySelectorAll('input[name="item-all"]').forEach(input => {
  input.addEventListener('change', function() {
    if(this.checked) {
      document.querySelectorAll('input[name^="item-top"]').forEach(i => i.checked = false);
      document.querySelectorAll('input[name^="item-bottom"]').forEach(i => i.checked = false);

      // 移除上衣和下裝的選中樣式
      document.querySelectorAll('label[for^="top"] img, label[for^="bottom"] img').forEach(img => {
        img.classList.remove('selected-item');
      });
    }
  });
});

// 選擇上衣或下裝item時，取消全身所有item勾選
function clearAllItems() {
  document.querySelectorAll('input[name="item-all"]').forEach(i => {
    i.checked = false;
    const labelImg = document.querySelector(`label[for="${i.id}"] img`);
    if(labelImg) labelImg.classList.remove('selected-item');
  });
}

document.querySelectorAll('input[name^="item-top"]').forEach(input => {
  input.addEventListener('change', function() {
    if(this.checked) {
      clearAllItems();
    }
  });
});

document.querySelectorAll('input[name^="item-bottom"]').forEach(input => {
  input.addEventListener('change', function() {
    if(this.checked) {
      clearAllItems();
    }
  });
});
