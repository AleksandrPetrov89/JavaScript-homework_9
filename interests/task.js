const checkboxes = document.querySelectorAll(".interest__check");
for (let checkbox of checkboxes) {
    checkbox.addEventListener("click", listManagement, true);
};


function listManagement (e) {
    // Функция-обработчик события. Устанавливает соответствующие значения у флагов и вниз, и вверх по дереву
    checkDown(e.target);
    checkUp(e.target);
};

function checkDown (element) {
    // Функция, которая устанавливает на все дочерние флаги то же значение, что и у родительского
    let checkboxes = element.closest(".interest").querySelectorAll(".interest__check");
    for (let checkbox of checkboxes) {
        checkbox.checked = element.checked;
        checkbox.indeterminate = false;
    };
};

function checkUp (element) {
    // Функция, которая устанавливает соответствующие значения флагов вверх по дереву
    if (element.closest(".interests_active")) {
        let upUpInterest = element.closest(".interest").parentElement.closest(".interest");
        let parentCheckbox = upUpInterest.querySelector(".interest__check");
        let allNeighbors = element.closest(".interests_active").children;
        for (let interest of allNeighbors) {
            let checkbox = interest.querySelector(".interest__check");
            if (element.checked != checkbox.checked || element.indeterminate != checkbox.indeterminate) {
                parentCheckbox.indeterminate = true;
                checkUp(parentCheckbox);
                return;
            };
        };
        parentCheckbox.indeterminate = false;
        parentCheckbox.checked = element.checked;
        checkUp(parentCheckbox);
    };
};