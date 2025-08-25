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
            // 隱藏不必要的元素
            const youtubePlayer = document.getElementById('youtube-player2');
            const saveButton = document.getElementById('save-button');
            const tabBox = document.querySelector('.tabBox');
            const items = document.querySelectorAll('.item');
            youtubePlayer.style.display = 'none';
            saveButton.style.display = 'none';
            tabBox.style.display = 'none';
            items.forEach(item => item.style.display = 'none');

            // 使用 html2canvas 捕獲 #wrap
            html2canvas(document.getElementById('wrap'), {
                useCORS: true,
                scale: 2 // 提高圖片質量
            }).then(canvas => {
                // 恢復隱藏的元素
                youtubePlayer.style.display = 'block';
                saveButton.style.display = 'block';
                tabBox.style.display = 'flex';
                items.forEach(item => {
                    if (item.classList.contains(document.querySelector('input[name="tab"]:checked')?.id)) {
                        item.style.display = 'flex';
                    }
                });

                // 生成並下載圖片
                const link = document.createElement('a');
                link.download = 'outfit.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            }).catch(error => {
                console.error('截圖失敗:', error);
                // 恢復隱藏的元素
                youtubePlayer.style.display = 'block';
                saveButton.style.display = 'block';
                tabBox.style.display = 'flex';
                items.forEach(item => {
                    if (item.classList.contains(document.querySelector('input[name="tab"]:checked')?.id)) {
                        item.style.display = 'flex';
                    }
                });
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

