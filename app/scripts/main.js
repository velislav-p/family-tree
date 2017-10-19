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
        constructor(top, left, img, oId, gen){
            this.top = top;
            this.left = left;
            this.id = guid();
            this.img = img;
            this.gen = gen;
            if (!oId){
                this.originid = this.id;
            }else {
                this.originid = oId;
            }
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
    const familyRoot = new Person(800,500,"me.png",null,1);



    //************************************** GLOBAL DECLARATIONS ********************************************//

    var aFamily=[];

    var initiatorObject = "";
    var initiatorHtml = "";
    //************************************** DISPLAYING THE DATA ********************************************//

    if(!localStorage.getItem("arrayFamily")){
        aFamily.push(familyRoot);
        localStorage.setItem("arrayFamily",JSON.stringify(aFamily));
    }else {
        var sFamily = localStorage.getItem("arrayFamily");

        aFamily = JSON.parse(sFamily);
    }

    aFamily.forEach(function(jPerson){

        var person = $.parseHTML("<div id='"+jPerson.id+"' class='element-wrapper' data-originid='"+jPerson.originid+"'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+jPerson.img+"'></div></div>");
        $(".canvas-overlay").prepend($(person));
        $(person).css({top:jPerson.top, left:jPerson.left});
    });




    //************************************** GLOBAL OBJECTS AND ARRAYS ********************************************//

    //************************************** HANDLING THE ADD PERSON FORM ********************************************//

    $(".add").click(function(){
        var wrapperElement = $(this).closest("div .wrapper");
        var relation = wrapperElement.find($("select")).val();
        switch(relation){
            case "father":
                addParent(initiatorHtml,"father",initiatorObject);
                break;
            case "mother":
                console.log("case mother");
                addParent(initiatorHtml,"mother",initiatorObject);
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
        var object="";
        aFamily.forEach(function(jPerson){
            if(jPerson.id == id){
                return object = jPerson;
            }
        });
        return object;
    }

    $(document).on("click",".top",function(){

        $(".hide").hide();
        $(".selectParent").show();
        initiatorHtml = $(this).closest(".element-wrapper");

        var id = $(initiatorHtml).attr("id");
        initiatorObject = findObjectInMemory(id);


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

    function getCoords(top, left){
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
    function addParent(originHtml, relation, originObj){
        var originPosition = originHtml.position();
        var parent;
        var offsetPosition = {"top":0,"left":0};
        offsetPosition.top =  originPosition.top-100;
        var img;
        var outerElement = getOuterElement(originPosition.top-100,originObj.id);
        console.log(outerElement);
        if(relation=="father"){
            img = "father.png";
            parent = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+img+"'></div></div>");

            switch(originObj.gen) {
                case 1:
                    if(outerElement.last===false){
                        offsetPosition.left = originPosition.left+200;
                    }else {
                        offsetPosition.left = outerElement.last+400;
                    }
                    break;
                case 2:
                    if(outerElement.last===false){
                        offsetPosition.left = originPosition.left+100;
                    }else {
                        offsetPosition.left = outerElement.last+200;
                    }
                    break;
                default:
                    if(outerElement.last===false){
                        offsetPosition.left = originPosition.left+100;
                    }else {
                        offsetPosition.left = outerElement.last+200;
                    }
                    break;
            }
        }else {
            img = "mother.png";
            parent = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+img+"'></div></div>");
            switch(originObj.gen) {
                case 1:
                    if(outerElement.first===false){
                        offsetPosition.left = originPosition.left-200;
                    }else {
                        offsetPosition.left = outerElement.first-400;
                    }
                    break;
                case 2:
                    if(outerElement.first===false){
                        offsetPosition.left = originPosition.left-100;
                    }else {
                        offsetPosition.left = outerElement.first-200;
                    }
                    break;
                default:
                    if(outerElement.first===false){
                        offsetPosition.left = originPosition.left-100;
                    }else {
                        offsetPosition.left = outerElement.first-200;
                    }
                    break;
            }

        }
        $(".canvas-overlay").prepend($(parent));

        const oParent = new Person(offsetPosition.top,offsetPosition.left,img,initiatorObject.id,initiatorObject.gen+1);
        $(parent).css({top:offsetPosition.top, left:offsetPosition.left}).attr("id",oParent.id);
        $(parent).attr("data-originid",initiatorObject.id);
        aFamily.push(oParent);
        localStorage.setItem("arrayFamily", JSON.stringify(aFamily));



    }
    function addChild(origin){

        var originPosition = origin.position();

        var child = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/me.png'></div></div>");
        $(".canvas-overlay").prepend($(child));
        $(child).css({top:originPosition.top+100, left:originPosition.left+100});
    }
    //functionality for finding the right-most and left-most elements in the canvas. Needs to be modified to search by row.
    function getOuterElement(top,originId){
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var tmp;
        var row = top;
        for (var i=aFamily.length-1; i>=0; i--) {
            if(aFamily[i].top == top && aFamily[i].originid==originId){
                tmp = aFamily[i].left;
                if (tmp < lowest) lowest = tmp;
                if (tmp > highest) highest = tmp;
            }
        }
        if(lowest == Number.POSITIVE_INFINITY){
            lowest = false;
        }
        if(highest == Number.NEGATIVE_INFINITY){
            highest = false;
        }
        return {"first":lowest,"last":highest,"row":row};

    }

    function getMiddle(){
        var middle = ($(".canvas-overlay").width())/2;
        return middle;
    }

    function shiftFromMiddle(top){
        var middle = getMiddle();
        aFamily.forEach(function(jPerson){
            if(jPerson.left>middle && jPerson.top<=top){
                jPerson.left = jPerson.left+100;
            }else if (jPerson.left<middle && jPerson.top<=top){
                jPerson.left = jPerson.left-100;
            }
        });
        location.reload();
    }

    function getTotalElementsInRow(top){
        var iObjectsInRow = aFamily.reduce(function(n,jPerson){
            return n+(jPerson.top == top);
        },0);
        return iObjectsInRow;
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
    $(".clear-local-storage").on("click",function(){
        localStorage.clear();
        location.reload();
    });
    $('.element-wrapper').fadeTo(1,0.5);
    $(document).on("mouseenter",".element-wrapper",function(){
        var elementId = this.id;
        var originId = this.dataset.originid;
        $(this).fadeTo(150,1);
        $('[data-originid='+elementId+']').fadeTo(1,1);
        $('#'+originId+'').fadeTo(1,1);


    }).on("mouseleave",".element-wrapper",function(){
        var elementId = this.id;
        var originId = this.dataset.originid;
        $(this).fadeTo(150,0.5);
        $('[data-originid='+elementId+']').fadeTo(1,0.5);
        $('#'+originId+'').fadeTo(1,0.5);
    });


})();
