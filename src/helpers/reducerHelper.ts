export const deleteElement = (transactions, id) => {
  transactions.delete(id);
  return new Map(transactions);
};

export const addElement = (transactions, transaction) => {
  transactions.set(transaction.id, transaction);
  return new Map(transactions);
};
