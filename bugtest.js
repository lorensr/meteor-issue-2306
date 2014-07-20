if (Meteor.isClient) {
  Meteor.startup(function(){
    Meteor.call('testUncaught', 'not-an-int', function(e,r){
      console.log(e.stack());
    });
    Meteor.call('testCaught', 'not-an-int', function(e,r){
      console.log(e,r);
    });
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    testUncaught: function(arg){
      check(arg, Match.Integer);
      return "Done";
    },
    testCaught: function(arg){
      try {
      check(arg, Match.Integer);
      return "Done";
      } catch (e) {
	console.log(e.message, e.stack());
      }
    }
  });
}
