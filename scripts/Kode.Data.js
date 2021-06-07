
 'use strict';

 Kode.prototype.addRestaurant = function(data) {
   /*
     TODO: Implement adding a document
   */
 };
 Kode.prototype.getAllRestaurants = function(renderer) {
    var query = firebase.firestore()
        .collection('restaurants')
        .orderBy('avgRating', 'desc')
        .limit(50);
  
    this.getDocumentsInQuery(query, renderer);
  };
 
  Kode.prototype.getDocumentsInQuery = function(query, renderer) {
    query.onSnapshot(function(snapshot) {
      if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".
  
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'removed') {
          renderer.remove(change.doc);
        } else {
          renderer.display(change.doc);
        }
      });
    });
  };
  Kode.prototype.getRestaurant = function(id) {
    return firebase.firestore().collection('restaurants').doc(id).get();
  };
  Kode.prototype.getFilteredRestaurants = function(filters, renderer) {
    var query = firebase.firestore().collection('restaurants');
  
    if (filters.category !== 'Any') {
      query = query.where('category', '==', filters.category);
    }
  
    if (filters.city !== 'Any') {
      query = query.where('city', '==', filters.city);
    }
  

    if (filters.sort === 'Rating') {
      query = query.orderBy('avgRating', 'desc');
    } else if (filters.sort === 'Reviews') {
      query = query.orderBy('numRatings', 'desc');
    }
  
    this.getDocumentsInQuery(query, renderer);
  };
 
  Kode.prototype.addRating = function(restaurantID, rating) {
    var collection = firebase.firestore().collection('restaurants');
    var document = collection.doc(restaurantID);
    var newRatingDocument = document.collection('ratings').doc();
  
    return firebase.firestore().runTransaction(function(transaction) {
      return transaction.get(document).then(function(doc) {
        var data = doc.data();
  
        var newAverage =
            (data.numRatings * data.avgRating + rating.rating) /
            (data.numRatings + 1);
  
        transaction.update(document, {
          numRatings: data.numRatings + 1,
          avgRating: newAverage
        });
        return transaction.set(newRatingDocument, rating);
      });
    });
  };
 