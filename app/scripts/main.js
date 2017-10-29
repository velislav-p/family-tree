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
        constructor(top, left, img, oId, gen, oRelation){
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
            this.oRelation = oRelation;
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
    var middleOfCanvas = getMiddle();
    console.log(middleOfCanvas);
    const familyRoot = new Person(800,middleOfCanvas-125,"me.png",null,1,"origin");



    //************************************** GLOBAL DECLARATIONS ********************************************//

    var aFamily=[];
    var initiatorObject = "";
    var initiatorHtml = "";
    var canvas = document.getElementById('canvas');
    console.log(canvas);
    var canvasSecondary = document.getElementById('canvas-secondary');


    //************************************** DISPLAYING THE DATA ********************************************//

    if(!localStorage.getItem("arrayFamily")){
        aFamily.push(familyRoot);
        localStorage.setItem("arrayFamily",JSON.stringify(aFamily));
    }else {
        var sFamily = localStorage.getItem("arrayFamily");

        aFamily = JSON.parse(sFamily);
    }
    var dropdownParent = $("#selectExistingParent");
    var dropdownPartner = $("#selectExistingSiblingOrPartner");
    var dropdownChild = $("#selectExistingChild");
    aFamily.forEach(function(jPerson){

        var person = $.parseHTML("<div id='"+jPerson.id+"' class='element-wrapper' data-originid='"+jPerson.originid+"'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+jPerson.img+"'></div></div>");
        $(".canvas-overlay").prepend($(person));
        $(person).css({top:jPerson.top, left:jPerson.left});
        switch(jPerson.oRelation){
            case "father":
                dropdownParent.append("<option id ='"+jPerson.id+"'>"+jPerson.id+"</option>");
                aFamily.forEach(function(object){
                    if (object.id == jPerson.originid){
                        drawLineDownwards({"top":jPerson.top,"left":jPerson.left},{"top":object.top,"left":object.left},0.1,canvas);
                    }
                });
                break;
            case "mother":
                dropdownParent.append("<option id ='"+jPerson.id+"'>"+jPerson.id+"</option>");
                aFamily.forEach(function(object){
                    if (object.id == jPerson.originid){
                        drawLineDownwards({"top":jPerson.top,"left":jPerson.left},{"top":object.top,"left":object.left},0.1,canvas);
                    }
                });
                break;
            case "husband":
                dropdownPartner.append("<option id ='"+jPerson.id+"'>"+jPerson.id+"</option>");
                dropdownParent.append("<option id ='"+jPerson.id+"'>"+jPerson.id+"</option>");
                aFamily.forEach(function(object){
                    if (object.id == jPerson.originid){
                        drawLineAcross({"top":jPerson.top,"left":jPerson.left},{"top":object.top,"left":object.left},0.1,canvas);
                    }
                });
                break;
            case "wife":
                dropdownPartner.append("<option id ='"+jPerson.id+"'>"+jPerson.id+"</option>");
                dropdownParent.append("<option id ='"+jPerson.id+"'>"+jPerson.id+"</option>");
                aFamily.forEach(function(object){
                    if (object.id == jPerson.originid){
                        drawLineAcross({"top":jPerson.top,"left":jPerson.left},{"top":object.top,"left":object.left},0.1,canvas);
                    }
                });
                break;
            case "son":
                dropdownChild.append("<option id ='"+jPerson.id+"'>"+jPerson.id+"</option>");
                aFamily.forEach(function(object){
                    if (object.id == jPerson.originid){
                        drawLineUpwards({"top":jPerson.top,"left":jPerson.left},{"top":object.top,"left":object.left},0.1,canvas);
                    }
                });
                break;
            case "daughter":
                dropdownChild.append("<option id ='"+jPerson.id+"'>"+jPerson.id+"</option>");
                aFamily.forEach(function(object){
                    if (object.id == jPerson.originid){
                        drawLineUpwards({"top":jPerson.top,"left":jPerson.left},{"top":object.top,"left":object.left},0.1,canvas);
                    }
                });
                break;
        }
    });
    console.log(aFamily);


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
            case "husband":
                addPartner(initiatorHtml,"husband",initiatorObject);
                break;
            case "wife":
                addPartner(initiatorHtml,"wife",initiatorObject);
                break;
            case "son":
                addChild(initiatorHtml,"son",initiatorObject);
                break;
            case "daughter":
                addChild(initiatorHtml,"daughter",initiatorObject);
                break;
            default:
                console.log("default");
        }
    });

    // $(".addExistingParent").click(function(){
    //     var wrapperElement =  $(this).closest("div .wrapper");
    //     var sExistingPersonId = wrapperElement.find($("#selectExistingParent")).val();
    //     var oExistingPerson = findObjectInMemory(sExistingPersonId);
    //     console.log(oExistingPerson,initiatorObject);
    //     drawLineUpwards(initiatorObject,oExistingPerson,1,canvas);
    //
    // });
    // $(".addExistingSiblingOrPartner").click(function(){
    //     var wrapperElement = $(this).closest("div .wrapper");
    //     var sExistingPersonId = wrapperElement.find($("#selectExistingSiblingOrPartner")).val();
    //     var oExistingPerson = findObjectInMemory(sExistingPersonId);
    //     drawLineAcross(initiatorObject,oExistingPerson,1,canvas);
    //
    //
    // });
    // $(".addExistingChild").click(function(){
    //     var wrapperElement = $(this).closest("div .wrapper");
    //     var sExistingPersonId = wrapperElement.find($("#selectExistingChild")).val();
    //     var oExistingPerson = findObjectInMemory(sExistingPersonId);
    //     drawLineDownwards(initiatorObject,oExistingPerson,1,canvas);
    //
    // });

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
        parentRight = true;
        var id = $(initiatorHtml).attr("id");
        initiatorObject = findObjectInMemory(id);

    });

    $(document).on("click",".left",function(){
        $(".hide").hide();
        $(".selectSiblingOrPartner").show();
        initiatorHtml = $(this).closest(".element-wrapper");

        var id = $(initiatorHtml).attr("id");
        initiatorObject = findObjectInMemory(id);

    });

    $(document).on("click",".right",function(){
        $(".hide").hide();
        $(".selectSiblingOrPartner").show();
        initiatorHtml = $(this).closest(".element-wrapper");

        var id = $(initiatorHtml).attr("id");
        initiatorObject = findObjectInMemory(id);


    });
    $(document).on("click",".bottom",function(){
        $(".hide").hide();
        $(".selectChild").show();
        initiatorHtml = $(this).closest(".element-wrapper");

        var id = $(initiatorHtml).attr("id");
        initiatorObject = findObjectInMemory(id);


    });

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
    function createDomElement(img){
        var element = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+img+"'></div></div>");
        return element;
    }
    var parentRight = true;
    function addParent(originHtml, relation, originObj){
        var originPosition = originHtml.position();
        var parent;
        var offsetPosition = {"top":0,"left":0};
        offsetPosition.top =  originPosition.top-150;
        var img;
        var outerElement = getOuterElement(originPosition.top-150,originObj.id);
        console.log(outerElement);
            img = "father.png";
            parent = createDomElement(img);

            switch(originObj.gen) {
                case 1:
                    if(parentRight === true){
                        if(outerElement.last===false){
                            offsetPosition.left = originPosition.left+250;

                        }else {
                            offsetPosition.left = outerElement.last+500;
                        }
                        parentRight = false;
                    }else {
                        if(outerElement.first===false){
                            offsetPosition.left = originPosition.left-250;

                        }else {
                            offsetPosition.left = outerElement.first-500;
                        }
                        parentRight = true;
                    }

                    break;
                default :
                    if(parentRight === true){
                        if(outerElement.last===false){
                            offsetPosition.left = originPosition.left+125;

                        }else {
                            offsetPosition.left = outerElement.last+250;
                        }
                        parentRight = false;
                    }else {
                        if(outerElement.first===false){
                            offsetPosition.left = originPosition.left-125;

                        }else {
                            offsetPosition.left = outerElement.first-250;
                        }
                        parentRight = true;
                    }
                    break;
            }

        $(".canvas-overlay").prepend($(parent));

        const oParent = new Person(offsetPosition.top,offsetPosition.left,img,initiatorObject.id,initiatorObject.gen+1,relation);
        $(parent).css({top:offsetPosition.top, left:offsetPosition.left}).attr("id",oParent.id);
        $(parent).attr("data-originid",initiatorObject.id);
        drawLineUpwards(originPosition,offsetPosition,1,canvas);

        aFamily.push(oParent);
        localStorage.setItem("arrayFamily", JSON.stringify(aFamily));

    }
    function addPartner(originHtml, relation, originObj){
        var originPosition = originHtml.position();
        var partner;
        var offsetPosition = {"top":0,"left":0};
        offsetPosition.top =  originPosition.top;
        var originRelativePosition = getMiddle(originPosition);
        var img;
        if(relation === "husband"){
            img = "father.png";
        }else {
            img = "mother.png";
        }
        if(originRelativePosition === "right"){

            partner = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+img+"'></div></div>");
            offsetPosition.left = originPosition.left+250;

        }else {

            partner = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+img+"'></div></div>");
            offsetPosition.left = originPosition.left-250;

        }
        $(".canvas-overlay").prepend($(partner));

        const oPartner = new Person(offsetPosition.top,offsetPosition.left,img,initiatorObject.id,initiatorObject.gen,relation);
        $(partner).css({top:offsetPosition.top, left:offsetPosition.left}).attr("id",oPartner.id);
        $(partner).attr("data-originid",initiatorObject.id);
        drawLineAcross(originPosition,offsetPosition,1,canvas);
        aFamily.push(oPartner);
        localStorage.setItem("arrayFamily", JSON.stringify(aFamily));
    }

    function addChild(originHtml, relation,originObj){
        var originPosition = originHtml.position();
        var img = "me.png";
        var offsetPosition = {"top":0,"left":0};
        offsetPosition.top =  originPosition.top+150;
        var outerElement = getOuterElement(originPosition.top+150,originObj.id, originObj.originid);
        var originRelativePosition = getMiddle(originPosition);
        console.log(originRelativePosition);
        var child;
        child = $.parseHTML("<div class='element-wrapper'><button class='plus top'>+</button><button class='plus bottom'>+</button><button class='plus left'>+</button><button class='plus right'>+</button><div><img src='images/"+img+"'></div></div>");

        if(originRelativePosition === "left"){
            if(outerElement.first===false){
                if(originObj.gen>2){
                    if(getCoords(offsetPosition.top, originPosition.left+125)){
                        offsetPosition.left = originPosition.left+125;
                    }else {
                        offsetPosition.left = originPosition.left-125;
                    }
                }else {
                    offsetPosition.left = originPosition.left;
                }
            }else {
                offsetPosition.left = outerElement.first-250;
            }
        }else {
            if(outerElement.last===false){
                if(originObj.gen>2){
                    if(getCoords(offsetPosition.top, originPosition.left-125)){
                        offsetPosition.left = originPosition.left-125;
                    }else {
                        offsetPosition.left = originPosition.left+125;
                    }
                }else {
                    offsetPosition.left = originPosition.left;
                }
            }else {
                offsetPosition.left = outerElement.last+250;
            }
        }
        const oChild = new Person(offsetPosition.top,offsetPosition.left,img,initiatorObject.id,initiatorObject.gen-1,relation);
        $(".canvas-overlay").prepend($(child));
        $(child).css({top:offsetPosition.top, left:offsetPosition.left}).attr("id",oChild.id);
        $(child).attr("data-originid",initiatorObject.id);
        drawLineDownwards(originPosition,offsetPosition,1,canvas);
        aFamily.push(oChild);
        localStorage.setItem("arrayFamily", JSON.stringify(aFamily));
    }
    //functionality for finding the right-most and left-most elements in the canvas. Needs to be modified to search by row.
    function getOuterElement(top,initiatorId, originId){
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var tmp;
        var row = top;
        for (var i=aFamily.length-1; i>=0; i--) {
            if(aFamily[i].top == top && (aFamily[i].originid==initiatorId || aFamily[i].id==originId)){
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

    function getMiddle(originPosition = false){
        var position;
        var middle = ($(".canvas-overlay").width())/2;
        if(originPosition.left - middle >= 0){
            position = "right";
        }else {
            position = "left";
        }
        if(originPosition){
            return position;
        }else {
            return middle;
        }
    }
    function getBottom(){
        var bottom = ($(".canvas-overlay").height());
        return bottom;
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

    $('.element-wrapper').fadeTo(1,0.3);
    $(document).on("mouseenter",".element-wrapper",function(){
        $('.element-wrapper').fadeTo(1,0.3).css("z-index","1");
        var elementId = this.id;
        var originId = this.dataset.originid;
        $(this).fadeTo(150,1).css("z-index","2");
        $('[data-originid='+elementId+']').fadeTo(1,1).css("z-index","2");
        $('#'+originId+'').fadeTo(1,1).css("z-index","2");
        var thisElement = aFamily.filter(function(object){
           return object.id === elementId;
        });
        // console.log(thisElement[0]);

        aFamily.forEach(function(jPerson){
            if(jPerson.originid === elementId){
                if(jPerson.oRelation === "mother" || jPerson.oRelation === "father"){
                    drawLineDownwards(jPerson, thisElement[0],1, canvasSecondary);
                }else if(jPerson.oRelation === "son" || jPerson.oRelation === "daughter"){
                    drawLineDownwards(thisElement[0],jPerson, 1, canvasSecondary);
                }else if(jPerson.oRelation === "husband" || jPerson.oRelation === "wife"){
                    drawLineAcross(jPerson,thisElement[0], 1, canvasSecondary)
                }
            }
            if(originId === jPerson.id){
                if(thisElement[0].oRelation === "son" || thisElement[0].oRelation === "daughter") {
                    drawLineUpwards(thisElement[0], jPerson, 1, canvasSecondary);
                }else if(thisElement[0].oRelation === "mother" || thisElement[0].oRelation === "father") {
                    drawLineDownwards(thisElement[0], jPerson, 1, canvasSecondary);
                }else if(thisElement[0].oRelation === "husband" || thisElement[0].oRelation === "wife") {
                    drawLineAcross(thisElement[0],jPerson, 1, canvasSecondary)

                }
            }
        })
    }).on("mouseleave",".element-wrapper",function(){
        var elementId = this.id;
        var originId = this.dataset.originid;
        var ctx = canvasSecondary.getContext('2d');
        $(this).fadeTo(1,0.3);
        $('[data-originid='+elementId+']').fadeTo(1,0.3);
        $('#'+originId+'').fadeTo(1,0.3);
        var thisElement = aFamily.filter(function(object){
            return object.id === elementId;
        });
        // console.log(thisElement[0]);
        var aOuterDescendants = [];
        aFamily.forEach(function(jPerson){
            if(jPerson.originid === elementId){
                aOuterDescendants.push(jPerson);
            }
        });
        ctx.clearRect(0,0, canvasSecondary.width, canvasSecondary.height);
    });

    /************************************************************* DRAWING FUNCTIONS *******************************************/
    function drawLineUpwards(origin,destination,opacity = 1, targetCanvas) {

        if (targetCanvas.getContext) {
            var ctx = targetCanvas.getContext('2d');
            var originObjectCenter = {"left":origin.left+125,"top":origin.top+50};
            var destinationObjectCenter = {"left":destination.left+125,"top":destination.top+50};

            ctx.beginPath();
            ctx.moveTo(originObjectCenter.left, originObjectCenter.top);
            ctx.lineTo(originObjectCenter.left, originObjectCenter.top-75);
            ctx.lineTo(destinationObjectCenter.left, destinationObjectCenter.top+75);
            ctx.lineTo(destinationObjectCenter.left, destinationObjectCenter.top);
            ctx.strokeStyle = "rgba(0,0,0,"+opacity+")";
            ctx.stroke();

        }
    }
    function drawLineDownwards(origin,destination,opacity = 1, targetCanvas) {

        if (targetCanvas.getContext) {
            var ctx = targetCanvas.getContext('2d');
            var originObjectCenter = {"left":origin.left+125,"top":origin.top+50};
            var destinationObjectCenter = {"left":destination.left+125,"top":destination.top+50};

            ctx.beginPath();
            ctx.moveTo(originObjectCenter.left, originObjectCenter.top);
            ctx.lineTo(originObjectCenter.left, originObjectCenter.top+75);
            ctx.lineTo(destinationObjectCenter.left, destinationObjectCenter.top-75);
            ctx.lineTo(destinationObjectCenter.left, destinationObjectCenter.top);
            ctx.strokeStyle = "rgba(0,0,0,"+opacity+")";
            ctx.stroke();
        }
    }

    function drawLineAcross(origin,destination,opacity = 1, targetCanvas) {

        if (targetCanvas.getContext) {
            var ctx = targetCanvas.getContext('2d');
            var originObjectCenter = {"left":origin.left+125,"top":origin.top+50};
            var destinationObjectCenter = {"left":destination.left+125,"top":destination.top+50};

            ctx.beginPath();
            ctx.moveTo(originObjectCenter.left, originObjectCenter.top);
            ctx.lineTo(originObjectCenter.left, originObjectCenter.top+75);
            ctx.lineTo(destinationObjectCenter.left, destinationObjectCenter.top+75);
            ctx.lineTo(destinationObjectCenter.left, destinationObjectCenter.top);
            ctx.strokeStyle = "rgba(0,0,0,"+opacity+")";
            ctx.stroke();
        }
    }
})();
