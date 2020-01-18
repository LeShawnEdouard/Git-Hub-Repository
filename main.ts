interface State {
    order: Order;

    cancelOrder();
    verifyPayment();
    shipOrder();
}

class Order {
    constructor() {

    }
}