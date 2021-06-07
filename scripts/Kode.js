/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * Initializes the Kode app.
 */
function Kode() {
  this.filters = {
    city: '',
    price: '',
    category: '',
    sort: 'Rating'
  };

  this.dialogs = {};

  var that = this;
  firebase.auth().signInAnonymously().then(function() {
    that.initTemplates();
    that.initRouter();
    that.initReviewDialog();
    that.initFilterDialog();
  }).catch(function(err) {
    console.log(err);
  });
}

/**
 * Initializes the router for the Kode app.
 */
Kode.prototype.initRouter = function() {
  this.router = new Navigo();

  var that = this;
  this.router
    .on({
      '/': function() {
        that.updateQuery(that.filters);
      }
    })
    .on({
      '/setup': function() {
        that.viewSetup();
      }
    })
    .on({
      '/restaurants/*': function() {
        var path = that.getCleanPath(document.location.pathname);
        var id = path.split('/')[2];
        that.viewRestaurant(id);
      }
    })
    .resolve();

  firebase
    .firestore()
    .collection('restaurants')
    .limit(1)
    .onSnapshot(function(snapshot) {
      if (snapshot.empty) {
        that.router.navigate('/setup');
      }
    });
};

Kode.prototype.getCleanPath = function(dirtyPath) {
  if (dirtyPath.startsWith('/index.html')) {
    return dirtyPath.split('/').slice(1).join('/');
  } else {
    return dirtyPath;
  }
};

Kode.prototype.getFirebaseConfig = function() {
  return firebase.app().options;
};

Kode.prototype.getRandomItem = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

Kode.prototype.data = {
  words: [
    'Bar',
    'Fire',
    'Grill',
    'Drive Thru',
    'Place',
    'Best',
    'Spot',
    'Prime',
    'Eatin\''
  ],
  cities: [
    "NXB GD",
    "NXB Chính trị Quốc gia",
    "NXB Kim Đồng",
    "NXB Trẻ",
    "NXB Đại học Quốc Gia Hà Nội"
  ],
  categories: [
    "SGK",
"Sách Truyện, tiểu thuyết",
"Sách tổng hợp",
"Sách Toán học",
"Sách Vật lí",
"Sách Hóa học"
  
  ]
};

window.onload = function() {
  window.app = new Kode();
};

function signIn() {
  window.location.href = '/';
  
  

}


// function signIn() {
//   // Sign into Firebase using popup auth & Google as the identity provider.
//   var provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider);
//   if(isUserSignedIn){
//     document.getElementById("btnlog").setAttribute( "onClick", "javascript: signOut();" );
    
//     document.getElementById("btnlog").textContent="Sign Out";
//   }
// }

function signInWithEmailPassword() {
  // var email = emailz;
  // var password = passwordz;
  // [START auth_signin_password]
  
}
// Signs-out of Friendly Chat.
function signOut() {
  // Sign out of Firebase.
  firebase.auth().signOut();
  if(!!isUserSignedIn()){
    document.getElementById( "btnlog" ).setAttribute( "onClick", "javascript: signIn();" );
    document.getElementById("btnlog").textContent="Sign In";
    var elem = document.getElementById('addmin');
    elem.parentNode.removeChild(elem);

  }
  
}

// Initiate firebase auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}
// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}


function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}
Kode.prototype.getFilteredRestaurants = function(filters, renderer) {
  var query = firebase.firestore().collection('restaurants');

  if (filters.category !== 'Any') {
    query = query.where('category', '==', filters.category);
  }

  if (filters.city !== 'Any') {
    query = query.where('city', '==', filters.city);
  }

  if (filters.price !== 'Any') {
    query = query.where('price', '==', filters.price.length);
  }

  if (filters.sort === 'Rating') {
    query = query.orderBy('avgRating', 'desc');
  } else if (filters.sort === 'Reviews') {
    query = query.orderBy('numRatings', 'desc');
  }

  this.getDocumentsInQuery(query, renderer);
};
