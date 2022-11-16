var menu = new Vue({
    el: '#menu',
    data: {
        items: [
            { name: 'Pizza', price: 10, description: 'Margherita pizza with extra cheese', image: 'Images/pizza.jpg' },
            { name: 'Burger', price: 7, description: 'Single patty burger', image: 'Images/burger.jpg' },
            { name: 'Pancakes', price: 5, description: 'Sweet and fruity', image: 'Images/pancakes.jpg' },
            { name: 'Coffee', price: 2, description: 'Strong brewed coffee', image: 'Images/coffee.jpg' },
            { name: 'Milkshake', price: 3, description: 'Chocolate Milkshake', image: 'Images/milkshake.jpg' }
        ],
        cartItems: [],
        total: 0
    },
    methods: {
        addToCart: function (item) {
            if (this.cartItems.some(t => t.name === item.name)) {
                this.cartItems.find(t => t.name === item.name).quantity++;
            }
            else {
                const obj = {
                    name: item.name,
                    price: item.price,
                    quantity: 1
                }
                this.cartItems.push(obj)
            }
            this.updateTotal();
        },

        removeFromCart: function (item) {
            const result = confirm("Want to remove " + item.name + "?");
            if (result) {
                let i = this.cartItems.length;
                if (i) { //(not 0)
                    while (i--) {
                        const cRow = this.cartItems[i];
                        if (cRow.name == item.name) {
                            this.cartItems.splice(i, 1);
                        }
                    }
                }
                this.updateTotal();
            }
        },

        updateTotal: function () {
            let x = 0;
            let y = 0
            for (const food of this.cartItems) {
                x = food.price * food.quantity;
                y += x;
            }
            y = y + (y * 0.025)
            this.total = y;
        },

        purchaseClicked: function () {
            if (this.cartItems.length === 0) {
                alert('Add items to purchase')
            }
            else {
                alert('Thank you for your purchase')
                this.cartItems = [];
                this.total = 0;
            }
        }
    }
})