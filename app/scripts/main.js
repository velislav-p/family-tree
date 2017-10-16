/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }
    //************************************** CLASS DECLARATION ********************************************//
    class Person {
        constructor(top, left, img){
            this.top = top;
            this.left = left;
            this.id = guid();
            this.img = img;
        }
    }

    const Velislav = new Person(10,10);

    class Child extends Person {

        constructor(age, top, left){
            super(top, left);
            this.age = age;
        }
    }
    const Hakan = new Child(40, 30, 20);
    const familyRoot = new Person(800,500,"me.png");



    //************************************** GLOBAL DECLARATIONS ********************************************//

    var aFamily=[];

    var initiatorObject = "";
    var initiatorHtml = "";
  //************************************** DISPLAYING THE DATA ********************************************//
    function gridInit(){
        var canvasWrapper = $(".canvas-wrapper");
        var maxElements = canvasWrapper.width()*canvasWrapper.height()/200*100;
        for (var i=0; i<54; i++){
            $(".grid").append("<div class='grid-cell'></div>")
        }
    }
    gridInit();

    if(!localStorage.getItem("arrayFamily")){
        aFamily.push(familyRoot);
        localStorage.setItem("arrayFamily",JSON.stringify(aFamily));
    }else {
    var sFamily = localStorage.getItem("arrayFamily");

    aFamily = JSON.parse(sFamily);
    }

    aFamily.forEach(function(jPerson){
        console.log(jPerson);
        var person = $.parseHTML("<div id='"+jPerson.id+"' class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+jPerson.img+"'></div></div>");
        $(".canvas-overlay").prepend($(person));
        $(person).css({top:jPerson.top, left:jPerson.left});
    });

    console.log(aFamily);


    //************************************** GLOBAL OBJECTS AND ARRAYS ********************************************//

    //************************************** HANDLING THE ADD PERSON FORM ********************************************//

    $(".add").click(function(){
        var wrapperElement = $(this).closest("div .wrapper");
        var relation = wrapperElement.find($("select")).val();
        switch(relation){
            case "father":
                console.log("case father");
                addParent(initiatorHtml,"father");
                break;
            case "mother":
                console.log("case mother");
                addParent(initiatorHtml,"mother");
                break;
            case "brother":
                console.log("case brother");
                break;
            case "sister":
                console.log("case sister");
                break;
            case "son":
                console.log("case son");
                break;
            case "daughter":
                console.log("case daughter");
                break;
            default:
                console.log("default");
        }
    });

    //************************************** FUNCTIONS ********************************************//
    function findObjectInMemory(id){
        var object;
        aFamily.forEach(function(jPerson){
            if(jPerson.id == id){
                return object = jPerson;
            }
        });
        return object;
    }

    $(document).on("click",".top",function(){
        console.log("parent");
        $(".hide").hide();
        $(".selectParent").show();
        initiatorHtml = $(this).closest(".element-wrapper");
        console.log(initiatorHtml[0]);
        var id = $(initiatorHtml).attr("id");
        initiatorObject = findObjectInMemory(id);
        console.log(initiatorObject);

    });


    $(".left").on("click",function(){
      console.log("spouse");


    });

    $(".right").on("click",function(){
        console.log("spouse");

    });
    $(document).on("click",".bottom",function(){
        console.log("child");
        $(".hide").hide();
        $(".selectChild").show();
        addChild($(this).closest("div .element-wrapper"));

    });

    function draw() {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
        }
    }

    function checkCoords(top, left){
        var result= true;
        aFamily.forEach(function(jPerson){
            if(jPerson.top == top && jPerson.left == left){
                result = false;
                return result;
            }
        });
        return result;
    }
    function offsetRow(top,left){
        aFamily.forEach(function(jPerson){
            if(jPerson.top == top){
                jPerson.left+=200;
                location.reload();
            }
        })
    }
   function addParent(origin, relation){
      //console.log(origin.offset());
      var originPosition = origin.position();
      console.log(originPosition.left);
      console.log(originPosition.top);
      var parent;
      var offsetPosition = {"top":0,"left":0};
      offsetPosition.top =  originPosition.top-100;
      var img;
      if(relation=="father"){
          if(initiatorObject.img == "father.png"){
              $.each(aFamily,function(){
                  if(this.id == initiatorObject.id){
                      this.left = this.left+100;
                  }
              })
          }
          img = "father.png";
          parent = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+img+"'></div></div>");
          var coords = checkCoords(originPosition.top-100, originPosition.left+100);
          if(coords){
              offsetPosition.left = originPosition.left+100;
          }else {

              offsetPosition.left = originPosition.left+100;
              offsetRow(originPosition.top-100,originPosition.left+100);
          }
      }else {
          if(initiatorObject.img == "mother.png"){
              $.each(aFamily,function(){
                  if(this.id == initiatorObject.id){
                      this.left = this.left-100;
                  }
              })
          }
          img = "mother.png";
          parent = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+img+"'></div></div>");
          offsetPosition.left = originPosition.left-100;
      }
      $(".canvas-overlay").prepend($(parent));

      const oParent = new Person(offsetPosition.top,offsetPosition.left,img);
      $(parent).css({top:offsetPosition.top, left:offsetPosition.left}).attr("id",oParent.id);
      aFamily.push(oParent);
      localStorage.setItem("arrayFamily", JSON.stringify(aFamily));
      console.log(aFamily);

   }
    function addChild(origin){
        console.log(origin.offset());
        var originPosition = origin.position();
        console.log(originPosition.left);
        console.log(originPosition.top);
        var child = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/me.png'></div></div>");
        $(".canvas-overlay").prepend($(child));
        $(child).css({top:originPosition.top+100, left:originPosition.left+100});
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
})();
