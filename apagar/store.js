// const validations = (sales) => {
//   sales.some(async ({ productId, quantity }) => {
//     if (!ObjectId.isValid(productId)) return true;
//     if (quantity < 1 || typeof quantity !== 'number') return true;
//     if (quantity > productId) return 'oi';
//     const stock = await productModel.findById(productId);
//     console.log('stock aqui', stock.quantity);
//     if (!stock || stock.quantity < quantity) return true;
//     return false;
//   });
// };

// // by mauricio
// const createSales = async (sales) => {
//   const checkSale = sales.map(async (sale) => {
//     if (!ObjectId.isValid(sale.productId)) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//     if (sale.productId < 1 || typeof sale.productId !== 'number') return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//     const stock = await productModel.findById(sale.productId);
//     console.log('stock aqui', stock.quantity);
//     if (!stock || stock.quantity < sale.quantity) return errorMessage('stock_problem', 'Such amount is not permitted to sell');
//     console.log('stock aqui 2', stock.quantity, sale.quantity);
//     console.log(sales);
//     return sales;
//   });
//   await Promise.all(checkSale);
//   return salesModel.insertSale(sales);
// };


// // meu ultimo
// const validations = (sales) => {
//   const validSale = sales.some(({ productId, quantity }) => {
//     console.log('linha 9 b', productId);
//     if (!ObjectId.isValid(productId)) return false;
//     if (quantity < 1 || typeof quantity !== 'number') return false;
//     return true;
//   });
//   return validSale;
// };

// const validateStock = async (sale) => {
//   const saleMade = sale.map((prod) => prod.productId); // pegando da venda cadastrada
//   console.log('validateStock', saleMade);
  // const product = await productModel.findById(prod.productId);
  // console.log('produto no service', product);
};

// const createSale = async (sales) => {
//   const isValid = validations(sales);
//   console.log('is valid', isValid);
//   if (!isValid) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//   // validateStock(sales);
//   return salesModel.insertSale(sales);
// };

// const validateSale = (sales) =>
//   sales.forEach(({ productId, quantity }) => {
//     console.log('linha 9 b', productId);
//     if (!ObjectId.isValid(productId)) return true;
//     if (quantity < 1 || typeof quantity !== 'number') return true;
//     console.log('validade sale', sales);
//     return sales;
//   });

// const validateStock = async (sales) => {
//   sales.some({ productId, quantity }) => {
//     if (!ObjectId.isValid(productId) || !product) return false;

//   }
//   const product = productModel.findById(productId);
//   console.log('stock linha 10', product);
//   return true;
// };

// const createSale = async (sales) => {
//   const validSale = validateSale(sales);
//   console.log('is valid', validSale);
//   if (!validSale) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//   const validStock = sales.forEach(async (el) => {
//     const prodFromStock = await validateStock(el.productId);
//     if (!prodFromStock) return ('stock_problem', 'Such amount is not permitted to sell');
//     return validStock;
//   });
//   return salesModel.insertSale(sales);
// };

// const createSale = async (sales) => {
//   const isValid = await validateSale(sales);
//   console.log(isValid);
//   if (isValid) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//   return salesModel.insertSale(sales);
// };

// const createSale = async (sales) => {
//   sales.forEach(async (sale) => {
//     console.log(sale.quantity, sale.productId);
//     if (!ObjectId.isValid(sale.productId)) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//     console.log('Entre condicoes', sale.productId);
//     if (sale.productId < 1 || typeof sale.productId !== 'number') return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//     console.log('condicao 2', sale.productId);
//     const checkStock = await stock(sale.productId);
//     console.log('stock aqui', checkStock);
//     if (!checkStock || checkStock.quantity < sale.quantity) return errorMessage('stock_problem', 'Such amount is not permitted to sell');
//     console.log('stock aqui 2');
//     return sales;
//   });

//   return salesModel.insertSale(sales);
// };

// const getAllSales = async () => {
//   const allSales = await salesModel.findAllSales();
//   if (!allSales) return errorMessage('not_found', 'Sale not found');
//   return allSales;
// };

// 16h23
// const createSale = async (sales) => {
//   sales.some(async ({ productId, quantity }) => {
//     if (!ObjectId.isValid(productId)) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//     console.log('createSale line 18', productId);
//     if (quantity < 1 || typeof quantity !== 'number') return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//     const product = await productModel.findById(productId);
//     console.log('line 13', quantity, product.quantity);
//     if (product.quantity < quantity) return errorMessage('stock_problem', 'Such amount is not permitted to sell');
//     console.log('validade sale', sales);
//     return sales;
//   });
//   return salesModel.insertSale(sales);
// };

// esse aqui deu certo tipo mau
// const createSale = async (saleList) => {
//   const checkSales = saleList.map(async (sale) => {
//     const validProduct = ObjectId.isValid(sale.productId);
//     if (!validProduct) throw ('invalid_data', 'Wrong product ID or invalid quantity');
//     const productExists = await productModel.findById(sale.productId);
//     console.log(productExists);
//     if (!productExists || sale.quantity <= 0 || typeof sale.quantity !== 'number') return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
//     if (sale.quantity > productExists.quantity) return errorMessage('stock_problem', 'Such amount is not permitted to sell');
//     return saleList;
//   });
//   await Promise.all(checkSales);
//   return salesModel.insertSale(saleList);
// };