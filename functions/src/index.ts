//const GeoFire = require('geofire');
import * as GeoFire from 'geofire'
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'


admin.initializeApp(functions.config().firebase);
const geoFire = new GeoFire(admin.database().ref(`/restaurants`));
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const userSignup = functions.auth.user().onCreate(event => {
	return admin.firestore().doc(`/users/${event.uid}`).set({
	    id: event.uid,
		name: 'anonymous',
		pictureUrl: 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png'
	    //email: event.data.email
	  });
});

export const AddRestaurantToRTDB = functions.firestore.document('/restaurants/{restaurantID}')
	.onCreate(event => {
		const location = event.data().location;
		return geoFire.set(event.data().id, [location.latitude, location.longitude])
	})

export const updateRestaurantToRTDB = functions.firestore.document('/restaurants/{restaurantID}')
	.onUpdate(event => {
		const location = event.after.data().location;
		return geoFire.set(event.before.id, [location.latitude, location.longitude])
})

export const deleteRestaurantToRTDB = functions.firestore.document('/restaurants/{restaurantID}')
	.onDelete(event => {
		return geoFire.remove(event.id)
})

export const deleteDishChildren = functions.firestore.document('/dishes/{dishID}')
	.onDelete((event, context) => db.collection('dishComments')
		.where('commenteeID', '==', context.params.dishID)
		.get()
		.then(snapshots => snapshots.forEach(
			snapshot => db.collection('dishComments').doc(snapshot.id)
				.delete()
				.then(x => 'success')
				.catch(x => 'failure')
		))
	)

export const deleteMenuChildren = functions.firestore.document('menus/{menuID}')
	.onDelete((event, context) => db.collection('dishes')
		.where('menuID', '==', context.params.menuID)
		.get()
		.then(snapshots => snapshots.forEach(
			snapshot => db.collection('dishes').doc(snapshot.id)
				.delete()
				.then(x => 'success')
				.catch(x => 'failure')
		))
)

export const deleteRestaurantMenus = functions.firestore.document('restaurants/{restaurantID}')
	.onDelete((event, context) => db.collection('menus')
		.where('restaurantId', '==', context.params.restaurantID)
		.get()
		.then(snapshots => snapshots.forEach(
			snapshot => db.collection('menus').doc(snapshot.id)
				.delete()
				.then(x => 'success')
				.catch(x => 'failure')
		))
)

export const deleteRestaurantComments = functions.firestore.document('restaurants/{restaurantID}')
	.onDelete((event, context) => db.collection('restaurantComments')
		.where('commenteeID', '==', context.params.restaurantID)
		.get()
		.then(snapshots => snapshots.forEach(
			snapshot => db.collection('restaurantComments').doc(snapshot.id)
				.delete()
				.then(x => 'success')
				.catch(x => 'failure')
		))
)

export const deleteRestaurantOrders = functions.firestore.document('restaurants/{restaurantID}')
	.onDelete((event, context) => db.collection('orders')
		.where('restaurantID', '==', context.params.restaurantID)
		.get()
		.then(snapshots => snapshots.forEach(
			snapshot => db.collection('orders').doc(snapshot.id)
				.delete()
				.then(x => 'success')
				.catch(x => 'failure')
		))
)

export const deleteUserRestaurants = functions.firestore.document('users/{userID}')
	.onDelete((event, context) => db.collection('restaurants')
		.where('owner', '==', context.params.userID)
		.get()
		.then(snapshots => snapshots.forEach(
			snapshot => db.collection('restaurants').doc(snapshot.id)
				.delete()
				.then(x => 'success')
				.catch(x => 'failure')
		))
)

export const deleteUserDishComments = functions.firestore.document('users/{userID}')
	.onDelete((event, context) => db.collection('dishComments')
		.where('userID', '==', context.params.userID)
		.get()
		.then(snapshots => snapshots.forEach(
			snapshot => db.collection('dishComments').doc(snapshot.id)
				.delete()
				.then(x => 'success')
				.catch(x => 'failure')
		))
)

export const deleteUserRestaurantComments = functions.firestore.document('users/{userID}')
	.onDelete((event, context) => db.collection('restaurantComments')
		.where('userID', '==', context.params.userID)
		.get()
		.then(snapshots => snapshots.forEach(
			snapshot => db.collection('restaurantComments').doc(snapshot.id)
				.delete()
				.then(x => 'success')
				.catch(x => 'failure')
		))
)

export const deleteUserOrders = functions.firestore.document('users/{userID}')
	.onDelete((event, context) => db.collection('orders')
		.where('orderedBy', '==', context.params.userID)
		.get()
		.then(snapshots => snapshots.forEach(
			snapshot => db.collection('orders').doc(snapshot.id)
				.delete()
				.then(x => 'success')
				.catch(x => 'failure')
		))
)

export const orderAdded = functions.firestore.document('/orders/{orderID}')
	.onCreate(async(event) => {
		
        const order: any = event.data();
        console.log(order)
        const purchaseQS = await getPurchase(order)
        if (!purchaseQS.empty){
            console.log(purchaseQS.docs[0].data())
        }
        const dish = await getDish(order.dishID)
        console.log(dish)
        if (purchaseQS.empty){
            await createInitialPurchase(order, dish)
        } else {
            await updatePurchase(purchaseQS.docs[0].data(), dish, order)
        }
        return 'finished'
		

	})

async function getPurchase(order: any): Promise<any> {

	return db.collection('purchases')
		.where('start', '>', Date.now() - (6 * 60 * 60 * 1000))
		.where('userID', '==', order.orderedBy)
		.where('restaurantID', '==', order.restaurantID)
		.get()
}

async function getDish(dishID: string): Promise<any> {
	return db.collection('dishes').doc(dishID).get()
		.then(x => x.data())
}

async function updatePurchase(purchase: any, dish: any, order: any) {
	return db.collection('purchases').doc(purchase.id)
		.update({
			finish: order.timestamp,
			price: purchase.price + dish.price,
			orders: [...purchase.orders, {dishName: dish.name, price: dish.price}]
		})
}

async function createInitialPurchase(order: any, dish: any) {
    const user = (await db.collection('users').doc(order.orderedBy).get()).data()
    const restaurant = (await db.collection('restaurants').doc(order.restaurantID).get()).data()
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
        orders: [{dishName: dish.name, price: dish.price}]
    })
}