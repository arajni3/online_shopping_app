const formattedCost = (cost) => cost + (cost % 1 === 0)? "" : ".00";
export default formattedCost;