'use strict';

function printReceipt(inputs) {
  let allItemList = loadAllItems();
  let itemList = inputs.map(code => matchItemWithCode(code, allItemList));
  let receipt = calculateReceipt(itemList);
  let formattedReceipt = formatReceiptString(receipt);
  console.log(formattedReceipt);
}

function matchItemWithCode(code, itemList) {
  return itemList.find(({ barcode }) => barcode === code);
}

function calculateReceipt(itemList) {
  let receiptDetailList = calculateReceiptDetail(itemList);
  return {
    receiptDetailList: receiptDetailList,
    total: sumTotal(receiptDetailList),
  };
}

function calculateReceiptDetail(itemList) {
  let itemCount = countItem(itemList);
  return Array.from(itemCount).map(([item, count]) => {
    return {
      item: item,
      count: count,
      subtotal: calculateSubtotal(item, count),
    };
  });
}

function countItem(itemList) {
  return itemList.reduce((itemCount, item) => {
    if (typeof itemCount.get(item) === 'undefined') {
      itemCount.set(item, 0);
    }
    itemCount.set(item, itemCount.get(item) + 1);
    return itemCount;
  }, new Map());
}

function calculateSubtotal({ price }, count) {
  return price * count;
}

function sumTotal(receiptDetailList) {
  return receiptDetailList.reduce((total, receiptDetail) => total += receiptDetail.subtotal, 0);
}

function formatReceiptString({ receiptDetailList, total }) {
  const FIXED_DIGIT = 2;
  let formattedReceipt = `***<store earning no money>Receipt ***`;
  receiptDetailList.forEach(receiptDetail => {
    formattedReceipt = `${formattedReceipt}
Name: ${receiptDetail.item.name}, Quantity: ${receiptDetail.count} ${receiptDetail.item.unit}, Unit: ${receiptDetail.item.price.toFixed(FIXED_DIGIT)} (yuan), Subtotal: ${receiptDetail.subtotal.toFixed(FIXED_DIGIT)} (yuan)`;
  });
  formattedReceipt = `${formattedReceipt}
----------------------
Total: ${total.toFixed(FIXED_DIGIT)} (yuan)
**********************`;
  return formattedReceipt;
}
