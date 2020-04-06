'use strict';

function printReceipt(inputs) {
  let allItemList = loadAllItems();
  let itemList = inputs.map(code => matchItemWithCode(code, allItemList));
  let receiptDetailList = calculateReceiptDetail(itemList);
  let total = sumTotal(receiptDetailList);
  let formattedReceipt = formatReceiptString(receiptDetailList, total);
  console.log(formattedReceipt);
}

function matchItemWithCode(code, itemList) {
  return itemList.find(item => item.barcode === code);
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

function calculateSubtotal(item, count) {
  return item.price * count;
}

function sumTotal(receiptDetailList) {
  return receiptDetailList.reduce((total, receiptDetail) => total += receiptDetail.subtotal, 0);
}

function formatReceiptString(receiptDetailList, total) {
  let formattedReceipt = `***<store earning no money>Receipt ***`;
  receiptDetailList.forEach(receiptDetail => {
    formattedReceipt = `${formattedReceipt}
Name: ${receiptDetail.item.name}, Quantity: ${receiptDetail.count} ${receiptDetail.item.unit}, Unit: ${receiptDetail.item.price.toFixed(2)} (yuan), Subtotal: ${receiptDetail.subtotal.toFixed(2)} (yuan)`;
  });
  formattedReceipt = `${formattedReceipt}
----------------------
Total: ${total.toFixed(2)} (yuan)
**********************`;
  return formattedReceipt;
}
