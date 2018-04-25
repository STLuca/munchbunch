"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//const GeoFire = require('geofire');
const GeoFire = require("geofire");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const geoFire = new GeoFire(admin.database().ref(`/restaurants`));
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.userSignup = functions.auth.user().onCreate(event => {
    return admin.firestore().doc(`/users/${event.uid}`).set({
        id: event.uid,
        name: 'anonymous',
        pictureUrl: 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png'
        //email: event.data.email
    });
});
exports.AddRestaurantToRTDB = functions.firestore.document('/restaurants/{restaurantID}')
    .onCreate(event => {
    const location = event.data().location;
    return geoFire.set(event.data().id, [location.latitude, location.longitude]);
});
exports.updateRestaurantToRTDB = functions.firestore.document('/restaurants/{restaurantID}')
    .onUpdate(event => {
    const location = event.after.data().location;
    return geoFire.set(event.before.id, [location.latitude, location.longitude]);
});
exports.deleteRestaurantToRTDB = functions.firestore.document('/restaurants/{restaurantID}')
    .onDelete(event => {
    return geoFire.remove(event.id);
});
exports.deleteDishChildren = functions.firestore.document('/dishes/{dishID}')
    .onDelete((event, context) => db.collection('dishComments')
    .where('commenteeID', '==', context.params.dishID)
    .get()
    .then(snapshots => snapshots.forEach(snapshot => db.collection('dishComments').doc(snapshot.id)
    .delete()
    .then(x => 'success')
    .catch(x => 'failure'))));
exports.deleteMenuChildren = functions.firestore.document('menus/{menuID}')
    .onDelete((event, context) => db.collection('dishes')
    .where('menuID', '==', context.params.menuID)
    .get()
    .then(snapshots => snapshots.forEach(snapshot => db.collection('dishes').doc(snapshot.id)
    .delete()
    .then(x => 'success')
    .catch(x => 'failure'))));
exports.deleteRestaurantMenus = functions.firestore.document('restaurants/{restaurantID}')
    .onDelete((event, context) => db.collection('menus')
    .where('restaurantId', '==', context.params.restaurantID)
    .get()
    .then(snapshots => snapshots.forEach(snapshot => db.collection('menus').doc(snapshot.id)
    .delete()
    .then(x => 'success')
    .catch(x => 'failure'))));
exports.deleteRestaurantComments = functions.firestore.document('restaurants/{restaurantID}')
    .onDelete((event, context) => db.collection('restaurantComments')
    .where('commenteeID', '==', context.params.restaurantID)
    .get()
    .then(snapshots => snapshots.forEach(snapshot => db.collection('restaurantComments').doc(snapshot.id)
    .delete()
    .then(x => 'success')
    .catch(x => 'failure'))));
exports.deleteRestaurantOrders = functions.firestore.document('restaurants/{restaurantID}')
    .onDelete((event, context) => db.collection('orders')
    .where('restaurantID', '==', context.params.restaurantID)
    .get()
    .then(snapshots => snapshots.forEach(snapshot => db.collection('orders').doc(snapshot.id)
    .delete()
    .then(x => 'success')
    .catch(x => 'failure'))));
exports.deleteUserRestaurants = functions.firestore.document('users/{userID}')
    .onDelete((event, context) => db.collection('restaurants')
    .where('owner', '==', context.params.userID)
    .get()
    .then(snapshots => snapshots.forEach(snapshot => db.collection('restaurants').doc(snapshot.id)
    .delete()
    .then(x => 'success')
    .catch(x => 'failure'))));
exports.deleteUserDishComments = functions.firestore.document('users/{userID}')
    .onDelete((event, context) => db.collection('dishComments')
    .where('userID', '==', context.params.userID)
    .get()
    .then(snapshots => snapshots.forEach(snapshot => db.collection('dishComments').doc(snapshot.id)
    .delete()
    .then(x => 'success')
    .catch(x => 'failure'))));
exports.deleteUserRestaurantComments = functions.firestore.document('users/{userID}')
    .onDelete((event, context) => db.collection('restaurantComments')
    .where('userID', '==', context.params.userID)
    .get()
    .then(snapshots => snapshots.forEach(snapshot => db.collection('restaurantComments').doc(snapshot.id)
    .delete()
    .then(x => 'success')
    .catch(x => 'failure'))));
exports.deleteUserOrders = functions.firestore.document('users/{userID}')
    .onDelete((event, context) => db.collection('orders')
    .where('orderedBy', '==', context.params.userID)
    .get()
    .then(snapshots => snapshots.forEach(snapshot => db.collection('orders').doc(snapshot.id)
    .delete()
    .then(x => 'success')
    .catch(x => 'failure'))));
exports.orderAdded = functions.firestore.document('/orders/{orderID}')
    .onCreate((event) => __awaiter(this, void 0, void 0, function* () {
    const order = event.data();
    console.log(order);
    const purchaseQS = yield getPurchase(order);
    if (!purchaseQS.empty) {
        console.log(purchaseQS.docs[0].data());
    }
    const dish = yield getDish(order.dishID);
    console.log(dish);
    if (purchaseQS.empty) {
        yield createInitialPurchase(order, dish);
    }
    else {
        yield updatePurchase(purchaseQS.docs[0].data(), dish, order);
    }
    return 'finished';
}));
function getPurchase(order) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.collection('purchases')
            .where('start', '>', Date.now() - (6 * 60 * 60 * 1000))
            .where('userID', '==', order.orderedBy)
            .where('restaurantID', '==', order.restaurantID)
            .get();
    });
}
function getDish(dishID) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.collection('dishes').doc(dishID).get()
            .then(x => x.data());
    });
}
function updatePurchase(purchase, dish, order) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.collection('purchases').doc(purchase.id)
            .update({
            finish: order.timestamp,
            price: purchase.price + dish.price,
            orders: [...purchase.orders, { dishName: dish.name, price: dish.price }]
        });
    });
}
function createInitialPurchase(order, dish) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = (yield db.collection('users').doc(order.orderedBy).get()).data();
        const restaurant = (yield db.collection('restaurants').doc(order.restaurantID).get()).data();
        return db.collection('purchases').doc(order.id)
            .set({
            id: order.id,
            username: user.name,
            restaurantName: restaurant.name,
            userID: order.orderedBy,
            restaurantID: order.restaurantID,
            start: order.timestamp,
            finish: order.timestamp,
            price: dish.price,
            orders: [{ dishName: dish.name, price: dish.price }]
        });
    });
}
//# sourceMappingURL=index.js.map