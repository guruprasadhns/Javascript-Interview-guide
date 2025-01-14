/**
 * # Heading 1
 * 
 *Promise.any() takes an iterable of Promise objects. It returns a single 
  promise that fulfills as soon as any of the promises in the iterable 
  fulfills, with the value of the fulfilled promise. If no promises in the 
  iterable fulfill (if all of the given promises are rejected), then the 
  returned promise is rejected with an AggregateError, a new subclass of 
  Error that groups together individual errors. 
 * 
 
 * 
 * In simple terms  Promise.any()  is just opposite of  Promise.all() . 
    Reading the definition we can break the problem statement into 
    multiple sub-problems and then tackle them individually to 
    implement the polyfill. 
    ●  Function takes an array of promises as input and returns a new 
    promise. 
    ●  The returned promise is resolved as soon as any of the input 
    promises resolves. 
    ●  Else if all of the input promises are rejected then the returned 
    promise is rejected with the array of all the input promises 
    reasons.
 */


function _promiseAny(taskList) {
    let errors = [];
    let promiseCompleted = 0;

    return new Promise((resolve, reject) => {
        taskList.forEach((task, index) => {
            task.then((res) => {
                resolve(res);
            }).catch((err) => {
                errors[index] = err;
                promiseCompleted += 1;

                if (promiseCompleted === taskList.length) {
                    reject(errors);
                }
            });
        });
    });
}

function task(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (delay < 500) {
                reject(delay);
            } else {
                resolve(delay);
            }
        }, delay * 1);
    });
}

const taskList = [task(40), task(300), task(100)];

_promiseAny(taskList)
    .then((res) => {
        console.log("Success", res);
    })
    .catch((err) => {
        console.log("Rejected", err);
    });
