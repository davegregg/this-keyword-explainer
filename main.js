"use strict";

const parentCounter = {
    name: "parentCounter",
    count: 0,
    increment: function (step = 1) {
        console.count("The increment function has now run this many times")
        if (typeof this.count === "number") {
            this.count += step
            console.log(this)
        } else {
            console.error("Hmm... I think this.count must have been undefined. I wonder how that could happen? Maybe `this` isn't what we expected it would be when we wrote the function? I smell shenanigans!")
        }
        
        return this.count
    },
}

const counterAnna = {
    name: "counterAnna",
    count: 0,
    increment: parentCounter.increment,
}

const counterBrian = {
    name: "counterBrian",
    count: 0,
    incrementParentCounter: parentCounter.increment.bind(parentCounter),
    decrementParentCounter: parentCounter.increment.bind(parentCounter, -1),
}

const counterClara = {
    name: "counterClara",
    count: 0,
    increment: parentCounter.increment.bind(this),
}

const counterDaniel = {
    name: "counterDaniel",
    count: 0,
    increment: parentCounter.increment,
    decrement: function (step = 1) {
        return parentCounter.increment.call(this, -step)
    },
}

parentCounter.increment()
/* 👆 As expected, `this` is what is to the left of the
   dot accessor on line 47: the execution context of
   this function. parentCounter is the object which is
   "running" the increment() function this time. */

counterAnna.increment()
/* 👆 This time, `this` is... AGAIN, what is to the left
   of the dot accessor on this line – the CONTEXT in which
   the function was CALLED – not necessarily where the
   function was DEFINED. This is the default behavior of 
   `this`.
   
   The idea here is that Functions are portable (💡),
   which is a very Functional Programming instinct, but
   also that they retain that portability by default even
   when used as methods within an object. JavaScript was
   an experimental hybrid of FP and OOP.
   
   You might think of `this` as a way to give functions
   configurable scope. */

counterBrian.incrementParentCounter()
/* 👆 bind() allows us to CLONE a function and bind it FOREVER
   to the specified execution context. In this case, we've
   bound the function to parentCounter, which will now be that
   function's execution context, regardless of how we accessed
   the function in order to call it in the first place. */

counterBrian.decrementParentCounter()
/* 👆 bind() also allows us to bind values to parameters ahead
   of time. In Functional Programming, this is called "Partial
   Application." */

counterClara.increment()
/* 👆 Now we are using a bound copy of the original, but...
   something is wrong! There is no function block surrounding
   the particular use of `this` on line 24, so the execution  
   context will default to `undefined` (in strict mode) or the
   global window object (in sloppy mode). */

counterDaniel.decrement()
/* 👆 In this example, we WOULD like to bind() the increment
   function to the counterDaniel object, BUT we can't use the
   "counterDaniel" variable to access this object before the
   end of the object literal, because that is when the assign-
   ment will happen.
   
   But we can do it with `this`.
   
   Think about it: `this` is a function's execution context.
   So we need to execute a function in order to access `this`.
   This is why I wrote a function to wrap the execution of
   increment(). I used the call() function, which is identical
   to bind() except call() takes the extra step to call the
   newly-bound function clone. */