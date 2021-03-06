import shoppingSelections from "../constants/shoppingSelections.js";

export const getShoppingItems = (selections) => {
    let obj = {};
    for (let i = 0; i < selections.length; ++i) {
        for (let j = 0; j < shoppingSelections.length; ++j) {
            let curType = selections[i];
            if (curType === shoppingSelections[j].type) {
                if (obj.hasOwnProperty(curType)) {
                    obj[curType].count++;
                } else {
                    obj[curType] = ({type: curType, cost: shoppingSelections[j].cost, count: 1});
                }
            }
        }
    }
    return obj;
};

export const getTotal = (selectionsObject) => {
    let sum = 0;
    for (const type in selectionsObject) {
        let selectionObject = selectionsObject[type];
        sum += selectionObject.cost * selectionObject.count;
    }
    return sum;
};