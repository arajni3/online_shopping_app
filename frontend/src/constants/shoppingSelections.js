class ShoppingSelection {
    constructor(type, src, cost) {
        this.type = type;
        this.src = src;
        this.cost = cost;
    }
};

// using free-to-use stock photos from .pexels.com
const shoppingSelections = [
    new ShoppingSelection("Men's Black T-Shirt", "https://images.pexels.com/photos/9558581/pexels-photo-9558581.jpeg", 20.25),
    new ShoppingSelection("Men's Red Shorts", "https://images.pexels.com/photos/5429325/pexels-photo-5429325.jpeg", 15.95),
    new ShoppingSelection("Men's White Baseball Cap", "https://images.pexels.com/photos/7181334/pexels-photo-7181334.jpeg", 10.99),
    new ShoppingSelection("Women's Pink Shirt", "https://images.pexels.com/photos/9558261/pexels-photo-9558261.jpeg", 24.25),
    new ShoppingSelection("Women's Gray Sweatpants", "https://images.pexels.com/photos/6311650/pexels-photo-6311650.jpeg", 26.00),
    new ShoppingSelection("Women's White Scarf", "https://images.pexels.com/photos/5215631/pexels-photo-5215631.jpeg", 16.95),
    new ShoppingSelection("Outdoor Dog Shirt", "https://images.pexels.com/photos/6729390/pexels-photo-6729390.jpeg", 9.95),
    new ShoppingSelection("Dog Pyjamas", "https://images.pexels.com/photos/7347556/pexels-photo-7347556.jpeg", 10.25),
    new ShoppingSelection("Dog Hat", "https://images.pexels.com/photos/5731788/pexels-photo-5731788.jpeg", 5.50),
    new ShoppingSelection("Cat Sweater", "https://images.pexels.com/photos/7288641/pexels-photo-7288641.jpeg", 10.95),
    new ShoppingSelection("Cat Hat", "https://images.pexels.com/photos/4444018/pexels-photo-4444018.jpeg", 4.25),
    new ShoppingSelection("Cat Crown", "https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg", 30.00)
];

export default shoppingSelections;