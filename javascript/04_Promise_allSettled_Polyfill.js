/**
 * # Heading 1
 * 
 *The Promise.allSettled() method returns a promise that fulfills after all 
  of the given promises have either fulfilled or rejected, with an array of 
  objects that each describes the outcome of each promise.
 * 
 
 * Promise.allSettled()  takes an array of promises as  input and 
    returns an array with the result of all the promises whether they 
    are rejected or resolved. 
    Reading the problem statement we can break it down into 
    sub-problems and tackle them individually. 
    ●  Map the array of promises to return an object with status 
    and value/error depending upon the promised settlement. 
    ●  Pass this map to the  Promise.all  to run them at once  and 
    return the result. 
 * 
 */

function _promiseAllSettled(taskList) {

    let result = [];
    let promiseCompleted = 0;

    return new Promise((resolve, reject) => {
        taskList.forEach((task, index) => {
            task.then(res => {
                result[index] = { status: 'resolved', value: res };
            }).catch(err => {
                result[index] = { status: 'rejected', message: err };
            }).finally(() => {
                promiseCompleted += 1;
                if (promiseCompleted === taskList.length) {
                    resolve(result);
                }
            });
        })
    })
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
    })
}

const taskList = [task(100), task(500), task(1000)];

_promiseAllSettled(taskList).then(res => {
    console.log('Success', res)
}).catch(err => {
    console.log('Rejected', err);
})